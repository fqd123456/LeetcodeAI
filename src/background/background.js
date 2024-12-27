// background.js
let globalData = null;

// 消息通信
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async()=>{
  // 处理数据存储
  if (message.type === 'object') {
    globalData = message.data;
    
    // 广播到所有页面
    chrome.runtime.sendMessage({
      type: 'object',
      data: globalData
    }, (response) => {
      // 可选的响应处理
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError)
      }
    });
  }
  // 点击
  if (message.type === 'open_side_panel') {
    // This will open a tab-specific side panel only on the current tab.
    await chrome.sidePanel.open({ tabId: sender.tab.id });
    await chrome.sidePanel.setOptions({
      tabId: sender.tab.id,
      path: 'index.html',
      enabled: true
    });
  }

  // 处理数据请求
  if (message.type === 'REQUEST_DATA') {
    sendResponse({
      type: 'object',
      data: globalData
    });
  }

  // 必须返回 true 支持异步响应
  return true;
})()
});

//设置特定地址打开
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  // console.log(tabId);
  
  const url = new URL(tab.url);
  try{
    if (url.origin ==='https://leetcode.com' && url.pathname.startsWith('/problems/')) {
      await chrome.sidePanel.setOptions({
        tabId,
        path: '../index.html',
        enabled: true
      });
    } else {
      // Disables the side panel on all other sites
      await chrome.sidePanel.setOptions({
        tabId,
        enabled: false
      });
    }
  }catch(error){
    console.log(error);
    
  }
});

// chrome.runtime.onInstalled.addListener(() => {
//   setupContextMenu();
// });

// chrome.contextMenus.onClicked.addListener((data, tab) => {
//   // Store the last word in chrome.storage.session.
//   chrome.storage.session.set({ lastWord: data.selectionText });

//   // Make sure the side panel is open.
//   chrome.sidePanel.open({ tabId: tab.id });
// });

// function setupContextMenu() {
//   chrome.contextMenus.create({
//     id: 'define-word',
//     title: 'Define',
//     contexts: ['selection']
//   });
// }



chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openSidePanel',
    title: 'Open side panel',
    contexts: ['all']
  });
  chrome.tabs.create({ url: 'index.html' });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSidePanel') {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

// 点击图标，打开侧边栏
chrome.action.onClicked.addListener(async(tab) => { 
  const url = new URL(tab.url) 
  if (url.origin ==='https://leetcode.com' && url.pathname.startsWith('/problems/')){
    await chrome.sidePanel.open({ tabId: tab.id });
  }
});
