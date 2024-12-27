function ensureClickHandler() {
    const aiButton = document.getElementById('ai-inject-button');
    if (aiButton) {
        aiButton.removeEventListener('click', handleAIButtonClick);
        aiButton.addEventListener('click', handleAIButtonClick);
    }
}

function handleAIButtonClick(event) {
    // 在页面脚本中，无法直接使用 chrome.runtime.sendMessage
    // 需要使用 window.postMessage 与 content script 通信
    window.postMessage({
        type: 'AI_BUTTON_CLICKED',
        source: 'inject-script'
    }, '*');
}

// 确保页面加载后执行
if (document.readyState === 'complete') {
    ensureClickHandler();
} else {
    window.addEventListener('load', ensureClickHandler);
}

// "web_accessible_resources": [
//     {
//         "resources": ["src/content/inject.js"],
//         "matches": [
//             "http://*/*",           
//             "https://*/*",          
//             "<all_urls>",           
//             "https://leetcode.cn/*",
//             "https://www.leetcode.com/*"
//         ]
//       }
// ] manifest