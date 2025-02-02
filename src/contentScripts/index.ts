/* eslint-disable no-console */
import { onMessage } from 'webext-bridge/content-script'
import { createApp } from 'vue'
import App from './views/App.vue'
import { formExtractorWithLLMContentScript } from './form-extractor'
import { setupApp } from '~/logic/common-setup'

// Import the function you want to expose

// Expose the function to the global `window` object
window.formExtractorWithLLMContentScript = formExtractorWithLLMContentScript;

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  window.testFunction = () => { console.log('Test function works!') }
  console.info('[vitesse-webext] Hello world from content script')

  // Attach to the window object
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'triggerFormExtractor') {
      console.log('Received message:', message.payload) // Access the data passed
      try {
        formExtractorWithLLMContentScript() // Use the received data
        sendResponse({ status: 'success' })
      }
      catch (error) {
        sendResponse({ status: 'error', message: error })
      }
    }
  })

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
  })

  // mount component to context window
  const container = document.createElement('div')
  container.id = __NAME__
  const root = document.createElement('div')
  const styleEl = document.createElement('link')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)
  document.body.appendChild(container)
  const app = createApp(App)
  setupApp(app)
  app.mount(root)
})()
