//注入按钮
// function injectAIButton() {
//     // 找到代码编辑区
//     const codeEditor = document.querySelector('.flexlayout__tab_button[data-layout-path="/c1/ts0/tb0"]')
    
//     if (codeEditor) {
//         const aiButton = document.createElement('div')
//         aiButton.id = 'ai-inject-button' // 添加唯一标识
//         aiButton.innerHTML = `
//           <svg t="1735010800491" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4307" width="24" height="24"><path d="M511.994264 511.994264m-511.994264 0a511.994264 511.994264 0 1 0 1023.988529 0 511.994264 511.994264 0 1 0-1023.988529 0Z" fill="#28176D" p-id="4308" data-spm-anchor-id="a313x.search_index.0.i1.b8c43a81TxYQeA" class=""></path><path d="M769.87841 652.183853h-53.444341V522.260992h53.444341zM789.528583 522.260992h-19.650173v129.922861h84.898383V522.260992h-65.24821z" fill="#F8C642" p-id="4309"></path><path d="M772.012054 782.095242h-55.577985V652.172382H772.012054z" fill="#F8C642" p-id="4310"></path><path d="M842.777913 782.095242h-72.910974V652.183853h84.886912v117.923981a11.99888 11.99888 0 0 1-11.975938 11.987408z" fill="#7B49B6" p-id="4311"></path><path d="M836.571992 522.260992H716.434069V392.338132h120.137923z" fill="#FC3A64" p-id="4312"></path><path d="M854.776793 522.260992h-65.24821V392.338132h65.24821z" fill="#FFFFFF" p-id="4313"></path><path d="M348.518131 692.73456l-20.18932 88.95919H169.211736l126.951818-522.14628h224.124391l120.447646 522.157751H483.316253l-20.533455-88.959189z m28.047095-122.48952h58.170477l-28.735367-127.640091z" fill="#F8C642" p-id="4314"></path><path d="M296.163554 259.54747l-22.896524 94.190059H542.014406l-21.726461-94.190059H296.163554z" fill="#7B49B6" p-id="4315"></path><path d="M220.625674 570.24504h214.1215l28.047095 122.48952H190.846427l29.779247-122.48952z" fill="#FC3A64" p-id="4316"></path><path d="M406.000336 442.604949h156.513112l29.435111 127.640091H434.747174l-28.746838-127.640091z" fill="#FFFFFF" p-id="4317" data-spm-anchor-id="a313x.search_index.0.i2.b8c43a81TxYQeA" class=""></path><path d="M718.556241 241.893286h134.098379v47.61697H718.556241z" fill="#FC3A64" p-id="4318"></path><path d="M718.556241 288.087826h134.098379v47.61697H718.556241z" fill="#FC3A64" p-id="4319"></path></svg>          
//         `
//         aiButton.style.cssText = `
//           display: inline-flex;
//           align-items: center; 
//           justify-content: center;
//           margin-left: 10px;
//           cursor: pointer;
//           height: 100%; // 与父元素高度一致
//           vertical-align: middle;
//           fontsize:'10px'
//         `      
//         console.log(aiButton);
        
//         // 修改1：确保正确插入
//         codeEditor.parentNode.insertBefore(aiButton, codeEditor.nextSibling)
//     }    
// }
function injectAIButton(){
      // 找到代码编辑区
    const codeEditor = document.querySelector('.flexlayout__tab_button[data-layout-path="/c1/ts0/tb0"]')
    
    if (codeEditor) {
        const aiButton = new DOMParser().parseFromString(
          '<div><svg t="1735010800491" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4307" width="24" height="24"><path d="M511.994264 511.994264m-511.994264 0a511.994264 511.994264 0 1 0 1023.988529 0 511.994264 511.994264 0 1 0-1023.988529 0Z" fill="#28176D" p-id="4308" data-spm-anchor-id="a313x.search_index.0.i1.b8c43a81TxYQeA" class=""></path><path d="M769.87841 652.183853h-53.444341V522.260992h53.444341zM789.528583 522.260992h-19.650173v129.922861h84.898383V522.260992h-65.24821z" fill="#F8C642" p-id="4309"></path><path d="M772.012054 782.095242h-55.577985V652.172382H772.012054z" fill="#F8C642" p-id="4310"></path><path d="M842.777913 782.095242h-72.910974V652.183853h84.886912v117.923981a11.99888 11.99888 0 0 1-11.975938 11.987408z" fill="#7B49B6" p-id="4311"></path><path d="M836.571992 522.260992H716.434069V392.338132h120.137923z" fill="#FC3A64" p-id="4312"></path><path d="M854.776793 522.260992h-65.24821V392.338132h65.24821z" fill="#FFFFFF" p-id="4313"></path><path d="M348.518131 692.73456l-20.18932 88.95919H169.211736l126.951818-522.14628h224.124391l120.447646 522.157751H483.316253l-20.533455-88.959189z m28.047095-122.48952h58.170477l-28.735367-127.640091z" fill="#F8C642" p-id="4314"></path><path d="M296.163554 259.54747l-22.896524 94.190059H542.014406l-21.726461-94.190059H296.163554z" fill="#7B49B6" p-id="4315"></path><path d="M220.625674 570.24504h214.1215l28.047095 122.48952H190.846427l29.779247-122.48952z" fill="#FC3A64" p-id="4316"></path><path d="M406.000336 442.604949h156.513112l29.435111 127.640091H434.747174l-28.746838-127.640091z" fill="#FFFFFF" p-id="4317" data-spm-anchor-id="a313x.search_index.0.i2.b8c43a81TxYQeA" class=""></path><path d="M718.556241 241.893286h134.098379v47.61697H718.556241z" fill="#FC3A64" p-id="4318"></path><path d="M718.556241 288.087826h134.098379v47.61697H718.556241z" fill="#FC3A64" p-id="4319"></path></svg></div>',
          'text/html'
        ).body.firstElementChild

        aiButton.addEventListener('click', function () {
          chrome.runtime.sendMessage({ type: 'open_side_panel' });
        });
        
        codeEditor.parentNode.insertBefore(aiButton, codeEditor.nextSibling)
    }  
}

// 获取题目信息
function getProblemInfo() {
  const title = document.querySelector('a[href^="/problems/"]')?.textContent
  const para = document.querySelectorAll('p')
  const desc = []
  for (let p of para) {
    if (p.textContent.trim() === '\u00A0' || p.textContent.trim() === '') {
      break  // 遇到空白标签就停止
    }
    desc.push(p.textContent)
  }
  let description = desc.reduce((acc,cur)=>acc+cur,"")
  // 获取当前题目信息
  return {
    title:title,
    description: description
  };
}

// // 向页面注入JS脚本
// function injectCustomJs(jsPath) {
//   jsPath = jsPath || 'inject.js';
//    // 使用 chrome.runtime.getURL 获取完整路径
//    const scriptUrl = chrome.runtime.getURL(jsPath);
  
//   // 方法1：直接注入代码
//   const script = document.createElement('script');
//   script.setAttribute('type', 'text/javascript');
  
//   // 方法2：从文件加载
//   script.src = scriptUrl;;
  
//   script.onload = function() {
//       console.log('Script injected successfully');
//       // 可选：移除script标签
//       // this.remove();
//   };
  
//   script.onerror = function(error) {
//       console.error('Script injection failed:', error);
//   };

//   // 确保在head或body中插入
//   (document.head || document.documentElement).appendChild(script);
// }
  
// 页面加载后注入按钮，和srcipt
if (document.readyState === 'complete') {
  injectAIButton();
  // injectCustomJs()
  // 发送题目详情给pupup
  // chrome.runtime.sendMessage({
  //   type: 'object',
  //   data: getProblemInfo()
  // }, (response) => {
  //   // 错误处理
  //   if (chrome.runtime.lastError) {
  //     console.error('Message send error:', chrome.runtime.lastError)
  //   }
  // })
} else {
  window.addEventListener('load', ()=>{
    injectAIButton()
    // injectCustomJs()
});
}



// 监听来自页面脚本的消息
window.addEventListener('message', function(event) {
  // 确保消息来自本页面
  if (event.source !== window) return;

  if (event.data.type === 'AI_BUTTON_CLICKED' && event.data.source === 'inject-script') {
      // 收到消息后，发送给 background
      chrome.runtime.sendMessage(
          { action: "openSidePanel" }, 
          function(response) {
              console.log('Message response:', response);
          }
      );
  }
});

// const button = new DOMParser().parseFromString(
//   '<button>Click to open side panel</button>',
//   'text/html'
// ).body.firstElementChild;

// button.addEventListener('click', function () {
//   chrome.runtime.sendMessage({ type: 'open_side_panel' });
// });

// document.body.append(button);

