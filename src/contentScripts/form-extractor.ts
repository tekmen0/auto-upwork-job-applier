import { ChatGroq } from '@langchain/groq'
import { ChatPromptTemplate } from '@langchain/core/prompts'

// Todo: this only consider text inputs, for more comprehensive approach,
// create input abstract class and provide necessary input actions & answer
// types in implementation classes
interface FormQuestion {
  question: string
  input: HTMLElement
  answer: string | null
}
/**
 * Decouple the filter utils from the base class as utils
 * are seperate concern, and better be stateless.
 *
 * Also, filters should be tested independently from the base
 * form extractor
 */
class FormExtractorFilters {
  static inputDisabledFilter(input: HTMLElement): boolean {
    return !(input as HTMLInputElement).disabled
  }

  static inputIsEmpty(input: HTMLElement): boolean {
    return !(input as HTMLInputElement).value
  }

  /**
   * Filter out labels whose inner text can't be a natural
   * language text.
   *
   * TODO: sepereate into a smaller chunks responsible from single
   * filtering
   */
  static labelDomFilter(label: HTMLElement): boolean {
    // Regex to detect non-natural language patterns
    const technicalTextRegex = /[{}[\];@=<>]|\b(?:function|var|const|let|window|document|__)\b|\d+\.\d+/
    const dateRegex = /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}$/ // Matches "Dec 4, 2024"

    const text = label.textContent?.trim() || ''
    // Eliminate `script` and `style` tags
    if (['script', 'style'].includes(label.tagName.toLowerCase())) {
      return false
    }
    // Filter out technical text
    if (technicalTextRegex.test(text)) {
      return false
    }
    // Filter out dates
    if (dateRegex.test(text.trim())) {
      return false
    }
    // Pass natural language text
    return true
  }

  /**
   * Accept if label element is above the input field vertically
   */
  static spatialFilter(input: HTMLElement, label: HTMLElement): boolean {
    const inputRect = input.getBoundingClientRect()
    const labelRect = label.getBoundingClientRect()
    const isVerticallyAbove = labelRect.bottom <= inputRect.top

    const passesPositionFilter = isVerticallyAbove // || (inputIsSmallWidth && isHorizontallyLeft)
    return passesPositionFilter
  }
}

abstract class FormExtractor {
  curInput: HTMLElement | null = null
  questionInputPairs: FormQuestion[] = []

  abstract findLabels(): Promise<HTMLElement[]>
  abstract processLabels(labels: Array<HTMLElement>): Promise<string>
  abstract parseQuestionInputPairs(): Promise<FormQuestion[]>

  protected ensureCurInput(): HTMLElement {
    if (!this.curInput) {
      throw new Error('Current input is not set.')
    }
    return this.curInput
  }
}

/**
 * For each form input :
 *  1 - Gather all parent text containing elements, which pass filters
 *  2 - Ask llm to determine form question, composing multiple parent texts
 */
class FormExtractorWithLLM extends FormExtractor {
  applyInputFilters(input: HTMLElement): boolean {
    return FormExtractorFilters.inputDisabledFilter(input)
      && FormExtractorFilters.inputIsEmpty(input)
  }

  applyLabelFilters(label: HTMLElement): boolean {
    return FormExtractorFilters.labelDomFilter(label)
      && FormExtractorFilters.spatialFilter(this.ensureCurInput(), label)
  }

  async findLabels(): Promise<HTMLElement[]> {
    const result = []
    const input = this.ensureCurInput()
    let currentParent = input.parentElement

    // Traverse all possible labels which are ancestor or sibling in dom tree
    while (currentParent && result.length < 3) {
      const childNodes = Array.from(currentParent.children)

      for (const node of childNodes) {
        // Check if the node is a text-containing element
        if (node !== input && node.textContent?.trim()) {
          const label = node as HTMLElement

          // Apply the filter function
          if (this.applyLabelFilters(label)) {
            result.push(
              label,
            )
          }
        }
      }

      // Move up to the next parent
      currentParent = currentParent.parentElement
    }

    return result
  }

  // Merge text using small llm, like llama3.2 3b
  async processLabels(labels: Array<HTMLElement>): Promise<string> {
    return await ComposerLLama32_3b.instance.processLabels(labels)
  }

  async parseQuestionInputPairs(): Promise<FormQuestion[]> {
    console.log('started label processing')
    const inputs = Array.from(document.querySelectorAll('input[type="text"], textarea')) as HTMLElement[]
    await Promise.all(
      inputs.filter(
        input => this.applyInputFilters(input),
      ).map(
        async (input) => {
          this.curInput = input
          console.log('processing input : ', this.ensureCurInput())
          const label: string = await this.processLabels((await this.findLabels()))
          this.questionInputPairs.push({ question: label, input, answer: null })
        },
      ),
    )
    console.log('label processing finish')
    return this.questionInputPairs
  }
}

/**
 * Compose multiple label canditates into a single form question text
 */
class ComposerLLama32_3b {
  static #instance: ComposerLLama32_3b
  #chain
  #llm
  #template

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.#llm = new ChatGroq({
      model: 'gemma2-9b-it',
      temperature: 1,
      maxTokens: 1024,
      maxRetries: 2,
      apiKey: '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',
    })

    this.#template = ChatPromptTemplate.fromMessages([
      ['system', `
We have gathered canditate html labels for an input field of a job application form.

Each label text is seperated with a hash "#" symbol. Leftmost label is the closest text 
to the input element. So prioritize content of labels from left to right. But beware,
at the same time the leftmost text can be a hint text which is not related directly to input label.

Your task is to decide what is asked for this input field. Answer is one single question or label.

Only reply with answer, do not include any comments.
        `],
      ['user', '{candidate_list}'],
    ])

    this.#chain = this.#template.pipe(this.#llm)
  }

  /**
   * The static getter that controls access to the singleton instance.
   *
   * This implementation allows you to extend the Singleton class while
   * keeping just one instance of each subclass around.
   */
  public static get instance(): ComposerLLama32_3b {
    if (!ComposerLLama32_3b.#instance) {
      ComposerLLama32_3b.#instance = new ComposerLLama32_3b()
    }

    return ComposerLLama32_3b.#instance
  }

  /**
   * Process label using llama_3b
   */
  public async processLabels(labels: Array<HTMLElement>): Promise<string> {
    const labelTexts = labels.map(label => label.textContent?.trim()).join(' # ')
    console.log('Payload:', await ComposerLLama32_3b.#instance.#template.invoke({ candidate_list: labelTexts }))
    const result = await ComposerLLama32_3b.#instance.#chain.invoke({
      candidate_list: labelTexts,
    })
    return result.content as string
  }
}

// Attach to the window object
export async function formExtractorWithLLMContentScript() {
  console.log('anan1')
  // Use the class
  const extractor = new FormExtractorWithLLM()
  const questionInputPairs = await extractor.parseQuestionInputPairs()

  console.log('questionInputPairs:', questionInputPairs)
}
