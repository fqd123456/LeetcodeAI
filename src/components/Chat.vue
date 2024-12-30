<template>
  <div class="  h-full bg-green-50 overflow-y-auto">
    <ul class="chat-list list-none p-0 h-full overflow-y-auto">
      <!--显示问题-->
      <div v-if="problem" class="border rounded-md bg-[#f8f5ef] p-2 m-2 min-h-5/1 ">
        <!-- <div> -->
          <h2 class="text-black text-sm font-bold">Your current question is:</h2>
          <span class="text-black text-sm  m-2">{{ problem }}</span>
        <!-- </div> -->
        <!-- <div>
          <button 
            @click="refreshPlugin" 
            class="refresh-btn p-1 rounded-md hover:bg-gray-100"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
          </button>
        </div> -->
      </div>
      <li v-for="chat in chatList" :key="chat.id" class="my-4 mx-2">        
        <!-- 系统消息 -->
        <div class="overflow-hidden " 
          v-if="chat.type === 'system' && chat.id !== 0&& chat.id !== 1&&(!problem || chat.id>1)"
        >
          <div v-if="!problem && chat.id<=1" class="bg-white text-wrap max-w-[70vw] rounded-lg p-2 px-6 rounded-tl-none float-left break-words">{{ chat.content }}</div>
          <div v-else class="bg-white text-wrap max-w-[70vw] rounded-lg p-2 px-6 rounded-tl-none float-left break-words">
            <div v-html="renderMarkdown(chat.content)" class="chat-content markdown-body text-black text-sm overflow-hidden"></div>
          </div>
        </div>
        <!-- 用户消息 -->
        <div class="overflow-hidden" v-if="chat.type === 'user'&&(!problem || chat.id>3)">
          <div
            class="  border  text-wrap   max-w-[70vw] rounded-lg p-2 px-6  rounded-tr-none float-right   break-words border-blue-500 text-blue-500">
            <div v-if="chat.content" class="block text-sm ">{{ chat.content }}</div>
            <img v-if="chat.image" :src="chat.image" alt="user image" class="w-full h-full object-cover">
          </div>
        </div>
      </li>
      <li class="my-4 mx-2">
        <!-- 系统消息回复中 -->
        <div class="overflow-hidden">
          <div class=" bg-white text-wrap  max-w-[70vw] rounded-lg p-2 px-6  rounded-tl-none float-left"
            v-if="replyLoaidng">
            <div class="flex space-x-1 items-center py-1">
              <div class="dot w-2 h-2 bg-gray-500 rounded-full"></div>
              <div class="dot w-2 h-2 bg-gray-500 rounded-full"></div>
              <div class="dot w-2 h-2 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>



<script setup>
import { onMounted, watch, ref, nextTick } from 'vue'
import MarkdownIt from 'markdown-it';
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js';

const md = new MarkdownIt({
  html: true,        // 启用 HTML 标签
  linkify: true,     // 将类似 URL 的文本转换为链接
  typographer: true, // 启用一些语言中性的替换 + 引号美化
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return ''; // 使用默认的转义
  }
});

// 渲染 markdown
const renderMarkdown = (content) => {
  if (!content) return '';
  return md.render(content);
};

const props = defineProps({
  problemInfo: {
    type: String,
    default: () => ''
  }
})

const chatList = ref([
  {
    id: 0,
    content: `强大的LeetCode AI答题助手，帮助你寻找解题思路并给出相应的Leetcode需要题解代码,用特定语言进行回答:${chrome.i18n.getUILanguage()}`,
    type: 'system',
  },
  {
    id:1,
    content:'',
    type:'system',
  },
  // {
  //   id: 2,
  //   content: 'hello',
  //   type: 'user',
  // },
  {
    id: 3,
    content: 'Hello, how can I help you?',
    type: 'system',
  }
])

// 监听 problemInfo 的变化
let problem = ref(null)
watch(() => props.problemInfo, (newValue) => {
  if (newValue) {
    // 更新 id 为 1 的消息内容
    chatList.value[1].content = `LeetCode - ${newValue}`
    problem.value = chatList.value[1].content
  }
}, { immediate: true })

function sleep (time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

// const refreshPlugin = () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.tabs.sendMessage(tabs[0].id, { type: 'GET_PROBLEM' });
//   });
// };

function flashDot (index) {
  if (replyLoaidng.value === false) {
    return
  }
  //动画  dot-1 dot-2 dot-3
  const dot1 = document.getElementById('dot-1')
  const dot2 = document.getElementById('dot-2')
  const dot3 = document.getElementById('dot-3')
  const dot4 = document.getElementById('dot-4')
  const dotList = [dot1, dot2, dot3, dot4]
  async function nextDot (index) {
    if (replyLoaidng.value === false) {
      return
    }
    dotList[index]?.classList.add('opacity-100')
    // 加一个变大 scale-150
    //闪烁完成后 删除动画
    // 循环到下一个dot
    await sleep(300)
    dotList[index]?.classList.remove('opacity-100')
    dotList[index]?.classList.remove('scale-150')

    nextDot((index + 1) % dotList.length)
  }
  nextDot(index);
}
const replyLoaidng = ref(false);


// 导出三个方法 1. 添加一个loading 2.用户发送一个消息，3将loading改为系统回复

function systemLoaidng () {
  replyLoaidng.value = true;
  flashDot(0);
}

function userSendMessage (message, base64) {
  chatList.value.push({
    id: chatList.value.length + 1,
    content: message,
    image: base64,
    type: 'user',
  })

  // 滚动到底部
  nextTick(() => {
    const chatListElement = document.querySelector('.chat-list');
    if (chatListElement) {
      chatListElement.scrollTop = chatListElement.scrollHeight;
    }
  });
}


function systemSendMessage (message) {
  // 删除loading
  replyLoaidng.value = false;
  chatList.value.push({
    id: chatList.value.length + 1,
    content: message,
    type: 'system',
  })

  // 滚动到底部
  nextTick(() => {
    const chatListElement = document.querySelector('.chat-list');
    if (chatListElement) {
      chatListElement.scrollTop = chatListElement.scrollHeight;
    }
  });
}


function getHistoryMessage () {
  return chatList.value.map(item => {
    return {
      role: item.type === 'system' ? 'system' : 'user',
      content: item.image ? {
        type: 'image_url',
        image_url: { url: item.image },
      } : [{ type: 'text', text: item.content }],
    }
  })

}

defineExpose({
  systemLoaidng,
  userSendMessage,
  systemSendMessage,
  getHistoryMessage,
})



</script>


<style scoped>
/* 无需额外样式，使用tailwindcss */

.chat-list {
  scroll-behavior: smooth;
}

@keyframes blink {

  0%,
  80%,
  100% {
    opacity: 0;
  }

  40% {
    opacity: 1;
  }
}

.dot {
  animation: blink 1.4s infinite both;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

.chat-content:hover{
  overflow-x: auto;
}

/* markdown 样式 */
.markdown-body {
  color: #24292e;
  line-height: 1.6;
  word-wrap: break-word;
  padding: 3px;
}


/* 标题样式 */
.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

/* 段落样式 */
/* .markdown-body p {
  margin-top: 0;
  margin-bottom: 16px;
} */

/* 代码块样式 */
/* .markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #0f82f5;
  border: 1px solid #000000c3 !important;
  border-radius: 6px;
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27,31,35,0.05);
  border-radius: 6px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.markdown-body pre > code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 1px solid #000 !important;
}  */
/* 整个滚动条 */
::-webkit-scrollbar {
  width: 4px;  /* 滚动条宽度 */
  height: 4px; /* 水平滚动条高度 */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: #d3d1d1;
  border-radius: 4px;
}
/* 鼠标悬停在滑块上时 */
::-webkit-scrollbar-thumb:hover {
  background: #a1a0a0;
}

</style>