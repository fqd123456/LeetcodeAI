import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/content/screenshot/index.vue.js");/* unplugin-vue-components disabled */import { nextTick, ref } from "/vendor/.vite-deps-vue.js__v--f9b51510.js";


const _sfc_main = {
  __name: 'index',
  setup(__props, { expose: __expose }) {
  __expose();

let maxWidth = ref(0);
let maxHeight = ref(0);

let showCapture = ref(false);
let awesome_screenshot_wrapper = ref(null);
let awesome_screenshot_top = ref(null);
let awesome_screenshot_bottom = ref(null);
let awesome_screenshot_left = ref(null);
let awesome_screenshot_right = ref(null);
let awesome_screenshot_center = ref(null);

let centerWidthData = ref(0);
let centerHeightData = ref(0);

// 获取base64数组
let base64Array = [];
// base64拼接后的
let base64Result = '';

const new_tab=ref(false)
document.addEventListener('keydown', function (event) {
  // 检查是否按下了 Ctrl 键（按键码 17）和 Shift 键（按键码 16），以及按下的键是否是 S 键（按键码 83）
  if (event.ctrlKey && event.shiftKey && event.keyCode === 83) {
    // 阻止默认事件，以防止浏览器保存页面
    event.preventDefault();
    // 在这里执行你想要执行的操作，例如触发保存功能
    start();
  }

  // ctrl+shift+m 测试
  if (event.ctrlKey && event.shiftKey && event.keyCode === 77) {
    // 阻止默认事件，以防止浏览器保存页面
    event.preventDefault();
    start();
  }
});

nextTick(() => {
  console.log('开始安装接受端口');
  console.log(chrome);
  if (chrome?.runtime) {
    chrome.runtime.onMessage.addListener(async (message) => {
      console.log('message', message);
      if (message.type == 'screenshot') {
        new_tab.value=message.new_tab
        console.log('执行截图');
        start();
      } else if (message.type == 'base64') {
        base64Array.push(message.data);
      }
    });
  }
  console.log('信息接收端准备完毕');
});

// 最外部 warp 的事件
// 节流的 一次只能创建一个这样的 选择框
let flag = false;
// 是否点击后拖拽了
let wrapIsDrag = false;
// 初始化 创建center框事件
let wrapDownClientY = 0;
let wrapDownClientX = 0;
// 是否点击了后移动
let isDonwMove;

let originalCenterWidth;
let originalCenterHeight;
let originalCenterTop;
let originalCenterLeft;

let sidesDownX;
let sidesDownY;
let dir;

let previousScrollY = window.scrollY; // 上一个滚动位置

const wrapMousedonw = (event) => {
  console.log('执行了');
  wrapIsDrag = false;
  isDonwMove = true;
  // 最开始点击的坐标

  wrapDownClientX = event.clientX;
  wrapDownClientY = event.clientY;
};
const wrapMousemove = (event) => {
  // 已经创过 截图框了
  if (flag) {
    if (isDonwMove) {
      console.log('走到这里了');
      if (dir == 'tl' || dir == 'tm' || dir == 'tr') {
        if (!dirScroll) {
          // 改变top
          let topY = event.clientY - sidesDownY;
          // zheng ==false   top减少 height 增加
          // zheng==true  top增加 height 减少
          if (topY > 0) {
            awesome_screenshot_center.value.style.height = originalCenterHeight - Math.abs(topY) + 'px';
            awesome_screenshot_center.value.style.top = originalCenterTop + Math.abs(topY) + 'px';
          } else {
            awesome_screenshot_center.value.style.height = originalCenterHeight + Math.abs(topY) + 'px';
            awesome_screenshot_center.value.style.top = originalCenterTop - Math.abs(topY) + 'px';
          }
        }
      }
      if (dir == 'tl' || dir == 'ml' || dir == 'bl') {
        // 改变left  改变width
        let LeftX = event.clientX - sidesDownX;
        // left -- 负数  width增大 left减小
        // left == 正数  width减小 left加大
        if (LeftX > 0) {
          awesome_screenshot_center.value.style.width = originalCenterWidth - Math.abs(LeftX) + 'px';
          awesome_screenshot_center.value.style.left = originalCenterLeft + Math.abs(LeftX) + 'px';
        } else {
          awesome_screenshot_center.value.style.width = originalCenterWidth + Math.abs(LeftX) + 'px';
          awesome_screenshot_center.value.style.left = originalCenterLeft - Math.abs(LeftX) + 'px';
        }
      }
      if (dir == 'bl' || dir == 'bm' || dir == 'br') {
        if (!dirScroll) {
          // 锚点 要加上滚动历史
          let topY = event.clientY - sidesDownY;
          // 正数 +大height
          if (topY > 0) {
            awesome_screenshot_center.value.style.height = originalCenterHeight + Math.abs(topY) + 'px';
          } else {
            awesome_screenshot_center.value.style.height = originalCenterHeight - Math.abs(topY) + 'px';
          }
        }
      }
      if (dir == 'tr' || dir == 'br' || dir == 'mr') {
        let LeftX = event.clientX - sidesDownX;
        if (LeftX > 0) {
          awesome_screenshot_center.value.style.width = originalCenterWidth + Math.abs(LeftX) + 'px';
        } else {
          awesome_screenshot_center.value.style.width = originalCenterWidth - Math.abs(LeftX) + 'px';
        }
      }
    }
    updateMaskWH();
    return;
  }
  // 第一次执行
  if (isDonwMove) {
    var scrollTop = window.scrollY || window.pageYOffset;
    awesome_screenshot_wrapper.value.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    wrapIsDrag = true;
    nextTick(() => {
      // dirScroll=true
      // 实现了左右双向
      if (event.clientX - wrapDownClientX < 0) {
        awesome_screenshot_center.value.style.width = Math.abs(event.clientX - wrapDownClientX) + 'px';
        awesome_screenshot_center.value.style.left = Math.abs(event.clientX) + 'px';
      } else {
        awesome_screenshot_center.value.style.width = event.clientX - wrapDownClientX + 'px';
        let w = awesome_screenshot_center.value.style.width;
        awesome_screenshot_center.value.style.left = event.clientX - parseFloat(w) + 'px';
      }
      if (event.clientY - wrapDownClientY < 0) {
        awesome_screenshot_center.value.style.height = Math.abs(event.clientY - wrapDownClientY) + 'px';
        awesome_screenshot_center.value.style.top = Math.abs(event.clientY) + scrollTop + 'px';
      } else {
        awesome_screenshot_center.value.style.height = event.clientY - wrapDownClientY + 'px';
        let h = awesome_screenshot_center.value.style.height;
        awesome_screenshot_center.value.style.top = event.clientY - parseFloat(h) + scrollTop + 'px';
      }
      updateMaskWH();
    });
  }
};
const mouseupInit = (event) => {
  isDonwMove = false;
  dir = '';
  if (flag) {
    return;
  } else {
    if (wrapIsDrag) {
      flag = true;
    } else {
      flag = true;
      console.log('执行了');
      awesome_screenshot_center.value.style.width = '200px';
      awesome_screenshot_center.value.style.height = '200px';
      let w = awesome_screenshot_center.value.style.width;
      let h = awesome_screenshot_center.value.style.height;
      awesome_screenshot_center.value.style.left = Math.max(event.clientX - parseFloat(w) / 2, 0) + 'px';
      awesome_screenshot_center.value.style.top = Math.max(event.clientY - parseFloat(h) / 2, 0) + 'px';
      updateMaskWH();
      awesome_screenshot_wrapper.value.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
  }
};

let centerIsDrag = false;
let downX;
let downY;

// 点击dir的时候 拖动滚轮 同时 禁止掉dir鼠标拖拽移动事件
let dirScroll = null;



// const watchWinwodWidth = () => {
//   const dom=document.querySelector("#awesome_screenshot_wrapper")
//   console.log(dom, "dom")
//   if(dom){
//     dom.style.width = window.innerWidth + 'px';
//     dom.style.height = window.innerHeight + 'px';
//   }
// }


const start = () => {
  showCapture.value = true;
  base64Array = [];
  base64Result = '';
  nextTick(() => {
    if (awesome_screenshot_wrapper) {
      console.log('执行了')
      console.log(awesome_screenshot_wrapper.value)
      awesome_screenshot_wrapper.value.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    }
    const totalHeight = document.documentElement.scrollHeight;
    const totalWidth = document.documentElement.scrollWidth;
    maxWidth.value = totalWidth;
    maxHeight.value = totalHeight;
    awesome_screenshot_wrapper.value.style.height = totalHeight + 'px';
    awesome_screenshot_wrapper.value.style.width = totalWidth + 'px';
  });

  window.keydownFun = function (event) {
    // 检查按下的键是否是ESC键，ESC键的键码是27
    if (event.keyCode === 27) {
      // 在这里执行你的操作，例如关闭模态框或执行其他任务
      console.log('ESC键被按下');
      cancel();
    }
  };

  document.addEventListener('keydown', window.keydownFun);

  window.windowmoverFun = function (event) {
    // 鼠标 距离顶部px
    window.mouseY = event.clientY;
    // 鼠标距离左边px
    window.mouseX = event.clientX;
  };

  document.addEventListener('mousemove', window.windowmoverFun);

  window.windowScrollFun = function () {
    const currentScrollY = window.scrollY;
    // 拖动时滚动
    if (centerIsDrag && !dir) {
      if (currentScrollY > previousScrollY) {
        const scrollDistance = currentScrollY - previousScrollY;
        console.log(`向下滚动了 ${scrollDistance}px`);
        // 向下滚动 增大 center的height
        awesome_screenshot_center.value.style.top = parseFloat(awesome_screenshot_center.value.style.top) + scrollDistance + 'px';
      } else if (currentScrollY < previousScrollY) {
        const scrollDistance = previousScrollY - currentScrollY;
        console.log(`向上滚动了 ${scrollDistance}px`);
        awesome_screenshot_center.value.style.top = parseFloat(awesome_screenshot_center.value.style.top) - scrollDistance + 'px';
      }
    }
    // 按住方滚动
    if (dir) {
      dirScroll = 1;

      if (currentScrollY > previousScrollY) {
        const scrollDistance = currentScrollY - previousScrollY;
        console.log(`dir向下滚动了 ${scrollDistance}px`);
        // awesome_screenshot_center.value.style.height = parseFloat(awesome_screenshot_center.value.style.height) + scrollDistance + "px"
        awesome_screenshot_center.value.style.height = window.mouseY + window.scrollY - parseFloat(awesome_screenshot_center.value.style.top) + 'px';
      } else if (currentScrollY < previousScrollY) {
        const scrollDistance = previousScrollY - currentScrollY;
        // awesome_screenshot_center.value.style.height = parseFloat(awesome_screenshot_center.value.style.height) - scrollDistance + "px"
        awesome_screenshot_center.value.style.height = window.mouseY + window.scrollY - parseFloat(awesome_screenshot_center.value.style.top) + 'px';
        console.log(`dir向上滚动了 ${scrollDistance}px`);
      }
    }
    if (dir || centerIsDrag) {
      previousScrollY = currentScrollY;
      updateMaskWH();
    }
  };

  window.addEventListener('scroll', window.windowScrollFun);

  window.mouseupFun = function () {
    dirScroll = null;
  };

  window.addEventListener('mouseup', window.mouseupFun);
};

const centerMousedown = (event) => {
  if (dir) return;
  // console.log(event)
  downX = event.layerX;
  downY = event.layerY;

  centerIsDrag = true;
};
const centerMouseup = (event) => {
  centerIsDrag = false;
};
// 拖动center事件
const centertMousemove = (event) => {
  if (dirScroll) return;
  if (dir) return;
  if (!centerIsDrag) return;
  let clientX = event.clientX;
  let clientY = event.clientY;

  var scrollTop = window.scrollY || window.pageYOffset;
  console.log(scrollTop, 'scrotop');
  if (window.innerWidth <= clientX - downX + parseFloat(awesome_screenshot_center.value.style.width)) {
    awesome_screenshot_center.value.style.left = window.innerWidth - parseFloat(awesome_screenshot_center.value.style.width) + 'px';
  } else {
    console.log(Math.max(clientX - downX, 0) + parseFloat(awesome_screenshot_center.value.style.width), maxWidth.value);
    if (Math.max(clientX - downX, 0) + parseFloat(awesome_screenshot_center.value.style.width) >= maxWidth.value) {
      return;
    }
    awesome_screenshot_center.value.style.left = Math.max(clientX - downX, 0) + 'px';
  }

  if (clientY - downY + scrollTop + parseFloat(awesome_screenshot_center.value.style.height) + 3 >= document.documentElement.scrollHeight) {
    console.log('触底还往下');
    return;
  } else {
    console.log('上下拖拽');
    if (clientY - downY + scrollTop < 0) {
      return;
    }

    awesome_screenshot_center.value.style.top = clientY - downY + scrollTop + 'px';
  }
  console.log('拖动center事件');
  updateMaskWH();
};

const updateMaskWH = (screenX, screenY, w, h) => {
  let centerTop = awesome_screenshot_center.value.offsetTop;
  let centerLeft = awesome_screenshot_center.value.offsetLeft;
  let centerHeight = parseFloat(awesome_screenshot_center.value.style.height);
  let centerWidth = parseFloat(awesome_screenshot_center.value.style.width);

  centerHeightData.value = centerHeight;
  centerWidthData.value = centerWidth;
  // // 需要根据center位置动态调整
  awesome_screenshot_top.value.style.height = centerTop + 'px';
  awesome_screenshot_top.value.style.top = 0 + 'px';
  awesome_screenshot_top.value.style.width = centerLeft + centerWidth + 'px';
  //   // 后面这个需要换成整个html -去 现在 center 点击的 clientY+ height
  awesome_screenshot_bottom.value.style.height = document.documentElement.scrollHeight - centerTop - centerHeight + 'px';
  awesome_screenshot_bottom.value.style.top = centerTop + centerHeight + 'px';
  awesome_screenshot_bottom.value.style.width = document.documentElement.clientWidth - centerLeft + 'px';
  awesome_screenshot_bottom.value.style.left = centerLeft + 'px';

  awesome_screenshot_left.value.style.height = document.documentElement.scrollHeight - centerTop + 'px';
  awesome_screenshot_left.value.style.width = centerLeft + 'px';
  awesome_screenshot_left.value.style.top = centerTop + 'px';
  awesome_screenshot_right.value.style.height = centerTop + centerHeight + 'px';
  awesome_screenshot_right.value.style.width = Math.max(0, document.documentElement.clientWidth - centerLeft - centerWidth) + 'px';

  awesome_screenshot_right.value.style.left = centerLeft + centerWidth + 'px';

  // 更新工具栏 小跟班的位置
  let munu = document.querySelector('#screenshot_annotate');
  munu.style.display = 'block';
  if (window.innerWidth - 160 < centerLeft + centerWidth) {
    if (centerLeft < 140) {
      munu.style.left = centerLeft + centerWidth - 140 + 'px';
    } else {
      munu.style.left = centerLeft - 140 + 'px';
    }
  } else {
    munu.style.left = centerLeft + centerWidth + 10 + 'px';
  }
  munu.style.top = centerTop + centerHeight - 100 + 'px';

  let PXshow = document.querySelector('#awesome_screenshot_size');
  if (parseFloat(awesome_screenshot_center.value.style.top) > 50) {
    PXshow.style.top = -30 + 'px';
  } else {
    PXshow.style.top = 0 + 'px';
  }
};
// 各路方向 放大点击事件 ，点击时候确认方向，和点击的坐标
const handleSidesDonw = (dirValue, event) => {
  dir = dirValue;

  originalCenterWidth = parseFloat(awesome_screenshot_center.value.style.width);
  originalCenterHeight = parseFloat(awesome_screenshot_center.value.style.height);
  originalCenterTop = parseFloat(awesome_screenshot_center.value.style.top);
  originalCenterLeft = parseFloat(awesome_screenshot_center.value.style.left);
  sidesDownX = event.clientX;
  sidesDownY = event.clientY;
  console.log(sidesDownX);
  console.log(sidesDownX);
};

function toggleFixedPositionElements (action) {
  // 获取所有的元素
  var allElements = document.getElementsByTagName('*');

  // 遍历所有元素
  for (var i = 0; i < allElements.length; i++) {
    var element = allElements[i];

    // 获取元素的计算样式
    var style = window.getComputedStyle(element);

    // 检查position属性是否为fixed
    if (style.position === 'fixed') {
      if (action === 'hide') {
        // 将元素的透明度设置为0
        element.style.opacity = '0';
      } else if (action === 'show') {
        // 将元素的透明度设置为1
        element.style.opacity = '1';
      }
    }
  }
}
const copy = async () => {
  let left = parseFloat(awesome_screenshot_center.value.style.left);
  let top = parseFloat(awesome_screenshot_center.value.style.top);
  let width = parseFloat(awesome_screenshot_center.value.style.width);
  let height = parseFloat(awesome_screenshot_center.value.style.height);
  await getBaase64();
  // 这个是为了 从第几屏幕开始截取的 裁剪的时候top从第几屏幕开始   top-去上面的没截取的屏幕
  if (window.isTopStartScreen !== 1) {
    top = top - (window.isTopStartScreen - 1) * window.innerHeight;
  }
  console.log("left:" + left, "top:", +top, "width:" + width + "height:" + height)

  let base64Data = await getResultImage(left, top, width, height);

  // 创建一个Blob对象
  const blob = await fetch(base64Data).then((response) => response.blob());
  // 创建剪贴板数据
  const clipboardData = new ClipboardItem({ 'image/png': blob });
  // 将数据添加到剪贴板
  await navigator.clipboard.write([clipboardData]);
  cancel();
  alert('copy success');
  console.log('copy完成');
};

const handleSearch = async () => {
  let left = parseFloat(awesome_screenshot_center.value.style.left);
  let top = parseFloat(awesome_screenshot_center.value.style.top);
  let width = parseFloat(awesome_screenshot_center.value.style.width);
  let height = parseFloat(awesome_screenshot_center.value.style.height);
  await getBaase64();
  // 这个是为了 从第几屏幕开始截取的 裁剪的时候top从第几屏幕开始   top-去上面的没截取的屏幕
  if (window.isTopStartScreen !== 1) {
    top = top - (window.isTopStartScreen - 1) * window.innerHeight;
  }
  console.log("left:" + left, "top:", +top, "width:" + width + "height:" + height)

  
  let base64Data = await getResultImage(left, top, width, height);

  try{
    console.log(new_tab.value,"new_tab.value???")
  if(new_tab.value){
    chrome.runtime.sendMessage({msg: 'new_tab_search_img', base64: base64Data  });
  }else{
    chrome.runtime.sendMessage({ type: 'screenshot_base64', base64: base64Data });
  }

  }catch(e){
    console.log(e,"e")
  }

  cancel();
}


const cancel = () => {
  awesome_screenshot_wrapper.value.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  showCapture.value = false;
  flag = false;
  wrapIsDrag = false;
  // 是否点击后拖拽了
  // 初始化 创建center框事件
  wrapDownClientY = 0;
  wrapDownClientX = 0;
  // 是否点击了后移动
  isDonwMove = false;
  originalCenterWidth = 0;
  originalCenterHeight = 0;
  originalCenterTop = 0;
  originalCenterLeft = 0;
  sidesDownX = 0;
  sidesDownY = 0;
  dir = null;
  centerWidthData.value = 0;
  centerHeightData.value = 0;
  dirScroll = null;
  previousScrollY = window.scrollY; // 上一个滚动位置
  window.removeEventListener('scroll', window.windowScrollFun);
  window.removeEventListener('mousemove', window.windowmoverFun);
  window.removeEventListener('keydown', window.keydownFun);
  window.removeEventListener('mouseup', window.mouseupFun);
  base64Result = '';
  base64Array = [];
};



const getResultImage = async (left, top, width, height) => {
  return new Promise((resolve, reject) => {
    // 创建Canvas元素
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1; // 获取设备像素比
    // 创建一个Image对象，加载Base64图片
    var image = new Image();
    image.src = base64Result; // 替换成您的Base64图片数据
    window.base64Result = base64Result
    // 当图片加载完成时执行裁剪操作
    image.onload = function () {
      // 设置Canvas的大小，确保足够容纳裁剪后的图像
      canvas.width = width;
      canvas.height = height;
      // 在Canvas上绘制裁剪后的图像
      console.log(`image宽度:${image.width},image高度:${image.height},截取的left起点${left * dpr},截取的top起点${top * dpr}截取的宽度${width * dpr},截取的高度${height * dpr}`)
      ctx.drawImage(image, left * dpr, top * dpr, width * dpr, height * dpr, 0, 0, width, height);
      // 获取裁剪后的图像数据（可以将其转换为新的Base64图片）
      var croppedImageData = canvas.toDataURL('image/png');
      // 可以将croppedImageData用于需要的操作，比如显示或保存
      return resolve(croppedImageData);
    };
  });
};



const createMergedBase64Image = async (base64Array) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    let maxWidth = 0;
    let totalHeight = 0;

    const images = [];

    // 创建图像对象，并在加载完成后添加到数组
    const loadImage = (base64Image, index) => {
      const img = new Image();
      console.log(base64Image);
      img.src = base64Image;

      img.onload = () => {
        images[index] = img;

        // 获取最大宽度
        if (img.width > maxWidth) {
          maxWidth = img.width;
        }

        totalHeight += img.height;

        // 检查是否已加载完所有图像
        if (images.length === base64Array.length) {
          // 设置Canvas的宽度和高度
          canvas.width = maxWidth;
          canvas.height = totalHeight;

          let yOffset = 0;

          // 绘制所有图像
          images.forEach((image) => {
            ctx.drawImage(image, 0, yOffset);
            yOffset += image.height;
          });

          // 将Canvas内容转换为Base64编码
          const mergedBase64 = canvas.toDataURL('image/png');
          resolve(mergedBase64);
        }
      };

      img.onerror = () => {
        reject(new Error('Image loading failed.'));
      };
    };

    // 遍历图像数组并加载图像
    base64Array.forEach((base64Image, index) => {
      loadImage(base64Image, index);
    });
  });
};

const sleep = (time = 200) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok');
    }, time);
  });
};
const getBaase64 = async () => {
  toggleFixedPositionElements("hide")
  function recordFunction () {
    chrome.runtime.sendMessage({ type: 'getBase64' });
  }
  // 计算插件需要滚动几次截取
  let top = parseFloat(awesome_screenshot_center.value.style.top);
  console.log('距离文档顶部top:', top);
  let height = parseFloat(awesome_screenshot_center.value.style.height);
  let winH = window.innerHeight;
  console.log('window的height:', winH);
  // 计算需要截取 第几屏幕
  let NumberScr = function () {
    let array = [];
    // 从第几屏幕开始截取
    // 它顶部出现在第几屏
    window.isTopStartScreen = Math.ceil(top / winH);
    // 计算第一次截屏在第几屏幕
    // top在第几屏幕 向上取整 比如 可视区域500  top 700 那么 700/500 =1.4 向上取整2  那么第一次截屏应该在第二屏幕
    array.push(Math.ceil(top / winH));
    // 计算截到第几屏幕
    // top+height 计算出bottom的位置 / 可视区域  比如 top在700位置 height 600 可视500  700+600=1300 / 500  2.6向上 需要截道第三屏幕
    array.push(Math.ceil((top + height) / winH));
    return array;
  };
  let capTruescr = NumberScr();

  const max_captrue = Math.ceil(document.documentElement.scrollHeight / window.innerHeight);
  console.log(max_captrue, 'max_captrue');
  console.log(capTruescr[1], '截取到第几屏幕');
  // 截图的位置出现在了最后一屏幕  计算最后一屏幕缺失的高度
  if (max_captrue !== 1 && capTruescr[1] === max_captrue) {
    let lastScreenMissingHeight = window.innerHeight - (document.documentElement.scrollHeight - window.innerHeight * (max_captrue - 1));
    console.log('最后一屏幕缺失了', lastScreenMissingHeight + 'px');
    function parsePixelValue (value) {
      return parseInt(value.replace('px', ''), 10) || 0;
    }
    var newPaddingBottom = parsePixelValue(document.body.style.paddingBottom) + lastScreenMissingHeight;
    document.body.style.paddingBottom = newPaddingBottom + 'px';
    window.lastScreenMissingHeight = newPaddingBottom
  }

  let capTreuNum = capTruescr[1] - capTruescr[0] + 1;
  // 只有1屏幕
  if (capTruescr[0] == capTruescr[1]) {
    var originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, capTruescr[0] * window.innerHeight - window.innerHeight);
    await sleep(200);
    document.documentElement.style.scrollBehavior = originalScrollBehavior;
    console.log(`截取第${capTruescr[0]}屏幕`);
    recordFunction();
    // 然后 截屏
  } else {
    let i = capTruescr[0];
    async function fun () {
      if (i <= capTruescr[1]) {
        var originalScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, i * window.innerHeight - window.innerHeight);
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
        let flalength = base64Array.length || 0;
        await sleep(800);
        recordFunction();
        const intervalId = setInterval(() => {
          if (flalength !== base64Array.length) {
            i++;
            clearInterval(intervalId);
            fun();
          }
        }, 100);
      }
    }
    await fun();
  }

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      if (capTreuNum == base64Array.length) {
        clearInterval(intervalId);
        console.log('凑齐了 开始拼接');
        toggleFixedPositionElements("show")

        console.log(base64Array);
        base64Result = await createMergedBase64Image(base64Array);
        if (window.lastScreenMissingHeight) {
          document.body.style.paddingBottom = 0 + 'px';
          window.lastScreenMissingHeight = undefined;
        }
        return resolve(base64Result);
      }
    }, 100);
  });
};

const __returned__ = { get maxWidth() { return maxWidth }, set maxWidth(v) { maxWidth = v }, get maxHeight() { return maxHeight }, set maxHeight(v) { maxHeight = v }, get showCapture() { return showCapture }, set showCapture(v) { showCapture = v }, get awesome_screenshot_wrapper() { return awesome_screenshot_wrapper }, set awesome_screenshot_wrapper(v) { awesome_screenshot_wrapper = v }, get awesome_screenshot_top() { return awesome_screenshot_top }, set awesome_screenshot_top(v) { awesome_screenshot_top = v }, get awesome_screenshot_bottom() { return awesome_screenshot_bottom }, set awesome_screenshot_bottom(v) { awesome_screenshot_bottom = v }, get awesome_screenshot_left() { return awesome_screenshot_left }, set awesome_screenshot_left(v) { awesome_screenshot_left = v }, get awesome_screenshot_right() { return awesome_screenshot_right }, set awesome_screenshot_right(v) { awesome_screenshot_right = v }, get awesome_screenshot_center() { return awesome_screenshot_center }, set awesome_screenshot_center(v) { awesome_screenshot_center = v }, get centerWidthData() { return centerWidthData }, set centerWidthData(v) { centerWidthData = v }, get centerHeightData() { return centerHeightData }, set centerHeightData(v) { centerHeightData = v }, get base64Array() { return base64Array }, set base64Array(v) { base64Array = v }, get base64Result() { return base64Result }, set base64Result(v) { base64Result = v }, new_tab, get flag() { return flag }, set flag(v) { flag = v }, get wrapIsDrag() { return wrapIsDrag }, set wrapIsDrag(v) { wrapIsDrag = v }, get wrapDownClientY() { return wrapDownClientY }, set wrapDownClientY(v) { wrapDownClientY = v }, get wrapDownClientX() { return wrapDownClientX }, set wrapDownClientX(v) { wrapDownClientX = v }, get isDonwMove() { return isDonwMove }, set isDonwMove(v) { isDonwMove = v }, get originalCenterWidth() { return originalCenterWidth }, set originalCenterWidth(v) { originalCenterWidth = v }, get originalCenterHeight() { return originalCenterHeight }, set originalCenterHeight(v) { originalCenterHeight = v }, get originalCenterTop() { return originalCenterTop }, set originalCenterTop(v) { originalCenterTop = v }, get originalCenterLeft() { return originalCenterLeft }, set originalCenterLeft(v) { originalCenterLeft = v }, get sidesDownX() { return sidesDownX }, set sidesDownX(v) { sidesDownX = v }, get sidesDownY() { return sidesDownY }, set sidesDownY(v) { sidesDownY = v }, get dir() { return dir }, set dir(v) { dir = v }, get previousScrollY() { return previousScrollY }, set previousScrollY(v) { previousScrollY = v }, wrapMousedonw, wrapMousemove, mouseupInit, get centerIsDrag() { return centerIsDrag }, set centerIsDrag(v) { centerIsDrag = v }, get downX() { return downX }, set downX(v) { downX = v }, get downY() { return downY }, set downY(v) { downY = v }, get dirScroll() { return dirScroll }, set dirScroll(v) { dirScroll = v }, start, centerMousedown, centerMouseup, centertMousemove, updateMaskWH, handleSidesDonw, toggleFixedPositionElements, copy, handleSearch, cancel, getResultImage, createMergedBase64Image, sleep, getBaase64, nextTick, ref }
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
return __returned__
}

}
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createStaticVNode as _createStaticVNode, Fragment as _Fragment, pushScopeId as _pushScopeId, popScopeId as _popScopeId } from "/vendor/.vite-deps-vue.js__v--f9b51510.js"

const _withScopeId = n => (_pushScopeId("data-v-e1bbd270"),n=n(),_popScopeId(),n)
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("div", { class: "wrap" }, null, -1 /* HOISTED */))
const _hoisted_2 = {
  key: 0,
  id: "start-wrap"
}
const _hoisted_3 = {
  id: "awesome_screenshot_top",
  ref: "awesome_screenshot_top"
}
const _hoisted_4 = {
  id: "awesome_screenshot_right",
  ref: "awesome_screenshot_right"
}
const _hoisted_5 = {
  id: "awesome_screenshot_bottom",
  ref: "awesome_screenshot_bottom"
}
const _hoisted_6 = {
  id: "awesome_screenshot_left",
  ref: "awesome_screenshot_left"
}
const _hoisted_7 = {
  id: "awesome_screenshot_size",
  style: {"min-width":"70px","display":"block"}
}
const _hoisted_8 = {
  id: "screenshot_annotate",
  class: "annotate_toolbar",
  style: {"display":"none"}
}
const _hoisted_9 = /*#__PURE__*/_createStaticVNode("<input id=\"file_input\" type=\"file\" class=\"file-input\" accept=\".jpg,.png,.jpeg\" data-v-e1bbd270><div id=\"shapes_area\" class=\"shapes_area\" style=\"display:none;\" data-v-e1bbd270><div id=\"awesome_rect_btn\" class=\"toolbar_item tooltip tooltip-right\" aria-label=\"矩形框\" data-v-e1bbd270><div class=\"toolbtn rect\" data-v-e1bbd270></div></div><div id=\"awesome_round_btn\" class=\"toolbar_item tooltip tooltip-right\" aria-label=\"椭圆\" data-v-e1bbd270><div class=\"toolbtn ellipse\" data-v-e1bbd270></div></div><div id=\"awesome_arrow_btn\" class=\"toolbar_item tooltip tooltip-right\" aria-label=\"箭头\" data-v-e1bbd270><div class=\"toolbtn line_arrow\" data-v-e1bbd270></div></div><div id=\"awesome_freeline_btn\" class=\"toolbar_item tooltip tooltip-right\" aria-label=\"笔\" data-v-e1bbd270><div class=\"toolbtn curve\" data-v-e1bbd270></div></div><div id=\"awesome_blur_btn\" class=\"toolbar_item tooltip tooltip-right\" aria-label=\"模糊\" data-v-e1bbd270><div class=\"toolbtn rect_blur\" data-v-e1bbd270></div></div><div id=\"awesome_undo_btn\" aria-label=\"撤销\" class=\"toolbar_item action_item tooltip tooltip-right disable\" data-v-e1bbd270><div class=\"toolbtn undobtn\" data-v-e1bbd270></div></div><div id=\"awesome_text_btn\" class=\"toolbar_item tooltip tooltip-right\" aria-label=\"文字\" data-v-e1bbd270><div class=\"toolbtn text\" data-v-e1bbd270></div></div><div id=\"awesome_callout_btn\" class=\"toolbar_item tooltip tooltip-right premium isfree\" aria-label=\"标注\" data-v-e1bbd270><div class=\"toolbtn callout\" data-v-e1bbd270></div></div><div id=\"awesome_step_btn\" class=\"toolbar_item tooltip tooltip-right premium isfree\" aria-label=\"步骤\" data-v-e1bbd270><div class=\"toolbtn list\" data-v-e1bbd270></div></div><div id=\"awesome_image_btn\" class=\"toolbar_item tooltip tooltip-right premium isfree\" aria-label=\"表情\" data-v-e1bbd270><div class=\"toolbtn image\" data-v-e1bbd270></div></div><div id=\"awesome_image_local_btn\" class=\"toolbar_item tooltip tooltip-right premium isfree\" aria-label=\"图片\" data-v-e1bbd270><div class=\"toolbtn insertImage\" data-v-e1bbd270></div></div><div class=\"sep_line\" data-v-e1bbd270></div><div id=\"awesome_clear_btn\" class=\"toolbar_item action_item tooltip tooltip-right disable\" aria-label=\"清除\" data-v-e1bbd270><div class=\"toolbtn clear-all icon-text\" data-v-e1bbd270></div></div></div>", 2)
const _hoisted_11 = { class: "action_area" }
const _hoisted_12 = {
  t: "1695195852681",
  class: "icon",
  style: {"width":"17px","height":"17px"},
  viewBox: "0 0 1025 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1469",
  width: "200",
  height: "200"
}
const _hoisted_13 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/_createElementVNode("path", {
  d: "M513.024 1024C230.254592 1024 1.024 794.769408 1.024 512S230.254592 0 513.024 0s512 229.230592 512 512-229.230592 512-512 512z m0-589.579264l-168.0896-168.0896-77.579264 77.579264L435.444736 512l-168.0896 168.0896 77.579264 77.579264L513.024 589.579264l168.0896 168.0896 77.579264-77.579264L590.603264 512l168.0896-168.0896-77.579264-77.579264L513.024 434.420736z",
  fill: "#cdcdcd",
  "p-id": "1470"
}, null, -1 /* HOISTED */))
const _hoisted_14 = [
  _hoisted_13
]
const _hoisted_15 = /*#__PURE__*/_createStaticVNode("<div id=\"awesome_color_panel\" class=\"color_panel left\" data-v-e1bbd270><div class=\"trangle\" data-v-e1bbd270></div><div class=\"colors\" data-v-e1bbd270><div id=\"awesome_width_small\" class=\"width_cell shape\" data-v-e1bbd270><div class=\"dot small\" data-v-e1bbd270></div><div class=\"font small\" data-v-e1bbd270>A</div></div><div id=\"awesome_width_middle\" class=\"width_cell shape\" data-v-e1bbd270><div class=\"dot middle\" data-v-e1bbd270></div><div class=\"font middle\" data-v-e1bbd270>A</div></div><div id=\"awesome_width_big\" class=\"width_cell shape\" data-v-e1bbd270><div class=\"dot big\" data-v-e1bbd270></div><div class=\"font big\" data-v-e1bbd270>A</div></div><div id=\"red_clr\" class=\"color_cell red\" data-v-e1bbd270></div><div id=\"blue_clr\" class=\"color_cell blue\" data-v-e1bbd270></div><div id=\"green_clr\" class=\"color_cell green\" data-v-e1bbd270></div><div id=\"yellow_clr\" class=\"color_cell yellow\" data-v-e1bbd270></div><div id=\"gray_clr\" class=\"color_cell gray\" data-v-e1bbd270></div><div id=\"white_clr\" class=\"color_cell white\" data-v-e1bbd270></div></div></div><div id=\"awesome_svgs_panel\" class=\"svg-panel right\" data-v-e1bbd270></div>", 2)

function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _hoisted_1,
    ($setup.showCapture)
      ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
          _createElementVNode("div", {
            onMouseup: $setup.mouseupInit,
            onMousedown: $setup.wrapMousedonw,
            onMousemove: $setup.wrapMousemove,
            id: "awesome_screenshot_wrapper",
            ref: "awesome_screenshot_wrapper",
            style: {"display":"block"}
          }, [
            _createElementVNode("div", _hoisted_3, null, 512 /* NEED_PATCH */),
            _createElementVNode("div", _hoisted_4, null, 512 /* NEED_PATCH */),
            _createElementVNode("div", _hoisted_5, null, 512 /* NEED_PATCH */),
            _createElementVNode("div", _hoisted_6, null, 512 /* NEED_PATCH */),
            _createElementVNode("div", {
              id: "awesome_screenshot_center",
              onMouseup: $setup.centerMouseup,
              onMousedown: $setup.centerMousedown,
              onMousemove: $setup.centertMousemove,
              ref: "awesome_screenshot_center",
              class: "drsElement drsMoveHandle"
            }, [
              _createElementVNode("div", _hoisted_7, [
                _createElementVNode("span", null, _toDisplayString($setup.centerWidthData) + " X " + _toDisplayString($setup.centerHeightData), 1 /* TEXT */)
              ]),
              _createElementVNode("div", {
                class: "dragresize dragresize-tl",
                onMousedown: _cache[0] || (_cache[0] = $event => ($setup.handleSidesDonw('tl', $event)))
              }, null, 32 /* NEED_HYDRATION */),
              _createElementVNode("div", {
                class: "dragresize dragresize-tm",
                onMousedown: _cache[1] || (_cache[1] = $event => ($setup.handleSidesDonw('tm', $event)))
              }, null, 32 /* NEED_HYDRATION */),
              _createElementVNode("div", {
                class: "dragresize dragresize-tr",
                onMousedown: _cache[2] || (_cache[2] = $event => ($setup.handleSidesDonw('tr', $event)))
              }, null, 32 /* NEED_HYDRATION */),
              _createElementVNode("div", {
                class: "dragresize dragresize-ml",
                onMousedown: _cache[3] || (_cache[3] = $event => ($setup.handleSidesDonw('ml', $event)))
              }, null, 32 /* NEED_HYDRATION */),
              _createElementVNode("div", {
                class: "dragresize dragresize-mr",
                onMousedown: _cache[4] || (_cache[4] = $event => ($setup.handleSidesDonw('mr', $event)))
              }, null, 32 /* NEED_HYDRATION */),
              _createElementVNode("div", {
                class: "dragresize dragresize-bl",
                onMousedown: _cache[5] || (_cache[5] = $event => ($setup.handleSidesDonw('bl', $event)))
              }, null, 32 /* NEED_HYDRATION */),
              _createElementVNode("div", {
                class: "dragresize dragresize-bm",
                onMousedown: _cache[6] || (_cache[6] = $event => ($setup.handleSidesDonw('bm', $event)))
              }, null, 32 /* NEED_HYDRATION */),
              _createElementVNode("div", {
                class: "dragresize dragresize-br",
                onMousedown: _cache[7] || (_cache[7] = $event => ($setup.handleSidesDonw('br', $event)))
              }, null, 32 /* NEED_HYDRATION */)
            ], 544 /* NEED_HYDRATION, NEED_PATCH */)
          ], 544 /* NEED_HYDRATION, NEED_PATCH */),
          _createElementVNode("div", _hoisted_8, [
            _hoisted_9,
            _createElementVNode("div", _hoisted_11, [
              _createElementVNode("a", {
                onClick: $setup.cancel,
                id: "clear112"
              }, [
                (_openBlock(), _createElementBlock("svg", _hoisted_12, [..._hoisted_14]))
              ]),
              _createCommentVNode(" <a @click=\"copy\" id=\"awesome_screenshot_copy\" class=\"awesome_action_btn copy\">Copy</a> "),
              _createElementVNode("a", {
                onClick: $setup.handleSearch,
                class: "awesome_action_btn copy"
              }, "Search"),
              _createCommentVNode(" <a @click=\"cancel\" id=\"awesome_screenshot_cancel\" class=\"awesome_action_btn cancel\">Cancel</a> "),
              _createCommentVNode(" <a @click=\"toExcel\" id=\"awesome_screenshot_capture\" class=\"awesome_action_btn tooltip tooltip-bottom save\">To Spreadsheet</a> ")
            ]),
            _hoisted_15
          ])
        ]))
      : _createCommentVNode("v-if", true)
  ], 64 /* STABLE_FRAGMENT */))
}

import "/src/content/screenshot/index.vue__vue_type--style_index--0_scoped--e1bbd270_lang.css.js"

_sfc_main.__hmrId = "e1bbd270"
typeof __VUE_HMR_RUNTIME__ !== 'undefined' && __VUE_HMR_RUNTIME__.createRecord(_sfc_main.__hmrId, _sfc_main)
import.meta.hot.accept(mod => {
  if (!mod) return
  const { default: updated, _rerender_only } = mod
  if (_rerender_only) {
    __VUE_HMR_RUNTIME__.rerender(updated.__hmrId, updated.render)
  } else {
    __VUE_HMR_RUNTIME__.reload(updated.__hmrId, updated)
  }
})
import _export_sfc from "/vendor/id-__x00__plugin-vue:export-helper.js"
export default /*#__PURE__*/_export_sfc(_sfc_main, [['render',_sfc_render],['__scopeId',"data-v-e1bbd270"],['__file',"D:/yichong/leetcodeAI/src/content/screenshot/index.vue"]])