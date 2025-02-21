// app.js
'use strict';

// 检查浏览器是否支持 Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js') // 替换为你的 service-worker.js 路径
      .then((registration) => {
        console.log('Service Worker 注册成功:', registration);

        // 可选: 监听 Service Worker 的状态变化
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;

          installingWorker.addEventListener('statechange', () => {
            switch (installingWorker.state) {
              case 'installing':
                console.log('Service Worker 正在安装...');
                break;
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  // 新的 Service Worker 已安装，但尚未激活。
                  // 提示用户更新 PWA
                  console.log('内容已更新！请刷新以获取最新版本。');
                  // 你可以使用一个自定义的 UI 提示用户刷新页面
                  showUpdatePrompt();
                } else {
                  // 首次安装
                  console.log('PWA 已安装！');
                }
                break;
              case 'activated':
                console.log('Service Worker 已激活！');
                break;
              case 'redundant':
                console.error('Service Worker 变得多余...');
                break;
            }
          });
        });
      })
      .catch((error) => {
        console.error('Service Worker 注册失败:', error);
      });
  });
} else {
  console.log('Service Worker 不被支持。');
}

// 可选: 显示更新提示的函数 (你需要自己实现)
function showUpdatePrompt() {
  // 创建一个提示元素 (例如，一个带有刷新按钮的 div)
  const updatePrompt = document.createElement('div');
  updatePrompt.id = 'update-prompt';
  updatePrompt.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #f0f0f0;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      z-index: 1000;
    `;

  const message = document.createElement('p');
  message.textContent = '有新版本可用！请刷新页面。';
  updatePrompt.appendChild(message);

  const refreshButton = document.createElement('button');
  refreshButton.textContent = '刷新';
  refreshButton.addEventListener('click', () => {
    window.location.reload();
  });
  updatePrompt.appendChild(refreshButton);

  document.body.appendChild(updatePrompt);
}

// 可选: 添加 'beforeinstallprompt' 事件监听器，用于自定义安装提示
window.addEventListener('beforeinstallprompt', (event) => {
  // 阻止浏览器默认的安装提示
  event.preventDefault();

  // 保存事件，以便稍后使用
  window.deferredPrompt = event;

  // 显示自定义的安装按钮或提示
  showInstallPrompt();
});

// 可选: 显示自定义安装提示的函数 (你需要自己实现)
function showInstallPrompt() {
  const installButton = document.createElement('button');
  installButton.textContent = '安装 PWA';
  installButton.addEventListener('click', async () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();

      const choiceResult = await window.deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('用户接受了安装提示');
      } else {
        console.log('用户拒绝了安装提示');
      }

      window.deferredPrompt = null;
    }
  });

  document.body.appendChild(installButton);
}
