<script setup>
import { ref } from 'vue'
import { ChatGroq } from '@langchain/groq'
import { ChatPromptTemplate } from '@langchain/core/prompts'

// Reference to the response
const response = ref('')

// Initialize LangChain
// const llm = new ChatGroq({
//  model: 'llama-3.2-3b-preview',
//  temperature: 0,
//  maxTokens: undefined,
//  maxRetries: 2,
//  apiKey: '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',
// })
//
// const promptTemplate = ChatPromptTemplate.fromMessages([
//  ['system', 'Translate the following into {language}:'],
//  ['user', '{text}'],
// ])

async function askLlama() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  if (!tab?.id)
    return
  // check if job description is extracted if not show warning
  // Inject content script
  chrome.tabs.sendMessage(tab.id, {
    type: 'triggerFormExtractor', // Custom message type
    payload: 'your-data-here', // Any data to pass
  }, (response) => {
    if (response?.status === 'success') {
      response.value = 'Form extraction was successful'
    }
    else {
      response.value = `Error: ${response?.message}`
    }
  })
  // Preprocess the HTML to extract form questions
  // const promptValue = await promptTemplate.invoke({
  //   language: 'turkish',
  //   text: 'hi',
  // })

  response.value = 'merhaba'

  // try {
  //  const res = await llm.invoke(promptValue.toChatMessages())
  //  response.value = res.content
  //  // fill the page according to responses
  // }
  // catch (error) {
  //  response.value = 'Error: Unable to fetch response.'
  //  console.error(error)
  // }
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
