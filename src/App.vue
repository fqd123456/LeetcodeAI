<template>
  <div>
    <Login />
  </div>
  <Chat :problemInfo="receivedData"/>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Chat from './components/Chat.vue'
import Login from './components/Login.vue'

const receivedData = ref(null)

onMounted(() => {
  const messageHandler = (message, sender, sendResponse) => {
    try {
      if (message.type === 'object') {
        receivedData.value = message.data
        console.log('Received data:', message.data)
        
        // 确保发送响应
        if (sendResponse) {
          sendResponse({ received: true })
        }
      }
    } catch (error) {
      console.error('Message handling error:', error)
    }
    
    // 必须返回 true 以支持异步响应
    return true
  }

  //添加监听器
  chrome.runtime.onMessage.addListener(messageHandler)

  // 尝试主动获取数据
  chrome.runtime.sendMessage(
    { type: 'REQUEST_DATA' }, 
    (response) => {
      if (response && response.type === 'object') {
        receivedData.value = response.data
        console.log(receivedData.value);        
      }
    }
  )

  // 在组件卸载时移除监听器
  onUnmounted(() => {
    chrome.runtime.onMessage.removeListener(messageHandler)
  })
})
</script>
