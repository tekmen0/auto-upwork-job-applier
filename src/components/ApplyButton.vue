<script setup>
import { ref } from 'vue'
import { ChatGroq } from '@langchain/groq'
import { ChatPromptTemplate } from '@langchain/core/prompts'

import { extractFormQuestions } from '../contentScripts/form-extractor'

// Reference to the response
const response = ref('')

// Initialize LangChain
const llm = new ChatGroq({
  model: 'llama3-70b-8192',
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
  apiKey: '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',
})

const promptTemplate = ChatPromptTemplate.fromMessages([
  ['system', 'Translate the following into {language}:'],
  ['user', '{text}'],
])

async function askLlama() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  if (!tab?.id)
    return
  // Inject content script
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: extractFormQuestions, // Directly use the function reference
  })

  // Preprocess the HTML to extract form questions
  const promptValue = await promptTemplate.invoke({
    language: 'turkish',
    text: 'hi',
  })

  try {
    const res = await llm.invoke(promptValue.toChatMessages())
    response.value = res.content
    // fill the page according to responses
  }
  catch (error) {
    response.value = 'Error: Unable to fetch response.'
    console.error(error)
  }
}
</script>

<template>
  <div class="btn mt-2">
    <button @click="askLlama">
      Ask Groq Llama
    </button>
    <p v-if="response">
      Response: {{ response }}
    </p>
  </div>
</template>
