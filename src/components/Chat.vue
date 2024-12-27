<template>
  <div class="chat-assistant w-64 h-[80vh]  border-gray-300 flex flex-col">
    <div class="chat-header bg-gray-200 p-4 flex justify-center items-center">
      <h2 class="text-xl font-semibold ">LeetCode 刷题助手</h2>
    </div>

    <div class="chat-messages flex-grow  p-4" ref="messagesContainer">
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        :class="[
          'message flex items-start mb-4',
          message.type === 'user' ? 'justify-end' : 'justify-start'
        ]"
      >
        <div class="message-content flex items-start " 
          :class="{
            'flex-row-reverse': message.type === 'user',
            'flex-row': message.type !== 'user' 
          }"
        >
          <div class="message-avatar mx-1">{{ message.type === 'user' ? '👤' : '🤖' }}</div>
          <div class="message-text max-w-[70%] border p-1 text-left rounded-md">
            <div v-if="message.type === 'code'" class="code-block bg-gray-100 p-4 rounded-lg relative">
              <pre><code>{{ message.content }}</code></pre>
              <button @click="copyCode(message.content)" class="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">复制</button>
            </div>
            <div v-else-if="message.type === 'solution'" class="space-y-2">
              <h4 class="font-semibold">解题思路：</h4>
              <p>{{ message.content }}</p>
            </div>
            <div v-else>{{ message.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="chat-input-area p-4 border-t border-gray-300 flex justify-center ">
      <el-input
        v-model="userInput"
        @keyup.enter="sendMessage"
    
        :autosize="{ minRows: 1, maxRows: 4 }"
        type="textarea"
        class="no-resize"
        placeholder="Please input"
      />
      <div class="input-actions flex justify-between items-center ml-2 border border-gray-300" @click="sendMessage" >

        <el-icon><Promotion /></el-icon>
        1111
        <!-- <el-button type="info" plain @click="sendMessage">Send</el-button> -->
      </div> 
    </div>
  </div>
</template>

<script setup>
import { ref,watch, reactive, nextTick } from 'vue'


const props = defineProps({
  problemInfo: {
    type: Object,
    default: () => ({})
  }
})
// console.log(props.problemInfo)

// 消息类型定义
const messages = ref([
  {
    type: 'assistant',
    content: 'Welcome to use the LeetCode AI Assistant'
  },
])

watch(() => props.problemInfo, (newVal) => {
  if (newVal && newVal.title) {
    messages.value.push(
      {
      type: 'assistant',
      content: `Your Problem:${newVal.title}`
      },
      {
        type: 'assistant',
        content:'I can give you some ideas or specific implementations'
      }
    )
    // console.log('Updated Messages:', messages.value)
  }
}, { immediate: true })


const userInput = ref('')
const showSettings = ref(false)
const showCodeSolutions = ref(true)
const showTimeComplexity = ref(true)
const messagesContainer = ref(null)

// 发送消息
const sendMessage = async () => {
  if (!userInput.value.trim()) return

  // 添加用户消息
  messages.value.push({
    type: 'user',
    content: userInput.value
  })

  // 模拟AI响应（实际应替换为真实API调用）
  const aiResponse = await generateAIResponse(userInput.value)
  messages.value.push(aiResponse)

  // 清空输入
  userInput.value = ''

  // 滚动到底部
  await nextTick()
  scrollToBottom()
}

// 模拟AI响应生成
const generateAIResponse = async (input) => {
  // 这里应该替换为真实的AI API调用
  const responses = {
    'two sum': {
      type: 'solution',
      content: '使用哈希表可以在O(n)时间复杂度内解决问题'
    },
    'code': {
      type: 'code',
      content: `function twoSum(nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    if (map.has(complement)) {
      return [map.get(complement), i]
    }
    map.set(nums[i], i)
  }
}`
    }
  }

  return responses[input.toLowerCase()] || {
    type: 'assistant',
    content: '我理解你的问题，但需要更多上下文信息'
  }
}

// 复制代码
const copyCode = (code) => {
  navigator.clipboard.writeText(code)
}

// 清空聊天
const clearChat = () => {
  messages.value = [{
    type: 'assistant',
    content: '欢迎使用LeetCode刷题助手！请描述你的算法问题。'
  }]
}

// 切换设置
const toggleSettings = () => {
  showSettings.value = !showSettings.value
}

// 滚动到底部
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style scoped>
.no-resize :deep(textarea) {
  resize: none;
  width: 200px;
}
</style>
