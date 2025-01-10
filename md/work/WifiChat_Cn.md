## 项目：
基于 Android Wi-Fi Direct P2P 的视频聊天应用

### 版本：v1.0.0

### 功能特性：

-   [x] **兼容性：** 支持 Android API Level 16 (Android 4.1 Jelly Bean) 及以上版本，目标 API Level 为 34。由于兼容性考虑，部分 API 使用了已弃用的方法。
-   [x] **设备发现：** 提供设备搜索界面，支持下拉刷新，可发现附近开启 Wi-Fi Direct P2P 的设备。
-   [x] **连接管理：** 若对方设备为群组拥有者（Group Owner），则显示连接按钮。
-   [x] **群组创建：** 支持创建 Wi-Fi Direct P2P 群组，等待其他设备加入。
-   [x] **视频会话：** 成功创建或连接群组后，进入视频聊天界面。
-   [x] **数据传输：** 基于 Wi-Fi Direct P2P 连接，使用 Socket 进行双向数据传输。
-   [x] **摄像头预览：** 在未建立连接时，全屏预览本机摄像头画面。
-   [x] **视频显示：** 连接成功后，全屏显示对方摄像头画面，同时在右上角小窗口显示本机摄像头画面。
-   [x] **摄像头切换：** 在视频界面，支持随时切换前后摄像头。
-   [x] **音频通信：** 音频录制和播放采用非并发模式。通过点击“我说给你听”按钮进行录音，并以流媒体方式实时发送给对方，对方接收后即时播放。
-   [x] **连接断开：** 支持主动断开连接或因错误断开连接，断开后返回设备搜索界面。

### 技术栈：

*   **编程语言：** Kotlin
*   **运行平台：** Android 4.1 (Jelly Bean) 及更高版本
*   **参考资料：**
    *   [Android 实现无网络传输文件](https://juejin.cn/post/6844903565186596872)
    *   [WifiP2P](https://github.com/leavesCZY/WifiP2P)

### 下载：

#### 源代码：[v1.0.0](md/work/WifiChat/wifichat_v10._src.zip)

#### 可执行程序：

*   Debug 版本：6.2MB
*   Release 版本（最小化）：2.3MB，[wifi-chat-unsigned.apk](md/work/WifiChat/wifi-chat-unsigned.apk)

### 界面截图：

#### 1. 设备搜索界面

<img src="md/work/WifiChat/WifiChat_01.jpg" class="markdown-img-container" alt="设备搜索界面">
<img src="md/work/WifiChat/WifiChat_02.jpg" class="markdown-img-container" alt="有可连接设备界面">

---

#### 2. 视频聊天界面

<img src="md/work/WifiChat/WifiChat_03.jpg" class="markdown-img-container" alt="视频聊天界面">

---