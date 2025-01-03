// filtering approach :
// 1 - Get elements with body text
// 2 - Filter out text which is not natural language

export function extractFormQuestions(): { questions: Array<any> } {
  // Regex to detect non-natural language patterns
  const technicalTextRegex = /[{}[\];@=<>]|\b(?:function|var|const|let|window|document|__)\b|\d+\.\d+/
  const dateRegex = /^(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}$/ // Matches "Dec 4, 2024"
  // const sparseTextRegex = /^[a-z0-9\s]+$/i // Matches very sparse text patterns

  // Helper function to find the nearest text-containing element
  function findNearestLabel(
    input: HTMLElement,
    domFilter: (label: HTMLElement) => boolean,
    spatialFilter: (label: HTMLElement, input: HTMLElement) => boolean,
  ): {
      nearestParent: HTMLElement | null
      nearestLabel: HTMLElement | null
      input: HTMLElement
    } {
    let currentParent = input.parentElement

    while (currentParent) {
      const childNodes = Array.from(currentParent.children)

      for (const node of childNodes) {
        // Check if the node is a text-containing element
        if (node !== input && node.textContent?.trim()) {
          const label = node as HTMLElement

          const passesPositionFilter = spatialFilter(label, input)
          const passesDomFilter = domFilter(label)

          // Apply the filter function
          if (passesPositionFilter && passesDomFilter) {
            return {
              nearestParent: currentParent,
              nearestLabel: label,
              input,
            }
          }
        }
      }

      // Move up to the next parent
      currentParent = currentParent.parentElement
    }

    return { nearestParent: null, nearestLabel: null, input }
  }

  const spatialFilter = (label: HTMLElement, input: HTMLElement) => {
    const inputRect = input.getBoundingClientRect()
    const labelRect = label.getBoundingClientRect()
    const isVerticallyAbove = labelRect.bottom <= inputRect.top

    const passesPositionFilter = isVerticallyAbove // || (inputIsSmallWidth && isHorizontallyLeft)
    return passesPositionFilter
  }

  // Filter if text containing element is natural language
  const labelDomFilter = (e: HTMLElement) => {
    const text = e.textContent?.trim() || ''
    // Eliminate disabled elements
    if ((e as HTMLInputElement).disabled ?? false) {
      return false
    }
    // Eliminate `script` and `style` tags
    if (['script', 'style'].includes(e.tagName.toLowerCase())) {
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

  // Process input elements and find questions
  // Step 2: Extract text inputs and textareas
  const inputs = Array.from(document.querySelectorAll('input[type="text"], textarea')) as HTMLElement[]
  const questions = inputs.filter(
    input => !(input as HTMLInputElement).disabled,
  ).map((input) => {
    const { nearestParent, nearestLabel } = findNearestLabel(input, labelDomFilter, spatialFilter)

    return {
      input,
      nearestLabel,
      nearestParent,
      isValid: !!nearestLabel, // Mark if a valid label was found
      nearesLabelText: nearestLabel?.textContent?.trim(),
    }
  })

  // Filter out invalid matches
  const filteredQuestions = questions.filter(q => q.isValid)

  return { questions: filteredQuestions }
}
