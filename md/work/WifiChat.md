## Project: Android Wi-Fi Direct P2P Video Chat Application

### Version: v1.0.0

### Features:

-   [x] **Compatibility:** Supports Android API Level 16 (Android 4.1 Jelly Bean) and above, targeting API Level 34. Due to compatibility considerations, some deprecated APIs are used.
-   [x] **Device Discovery:** Provides a device search interface with pull-to-refresh functionality to discover nearby devices with Wi-Fi Direct P2P enabled.
-   [x] **Connection Management:** If the other device is a Group Owner, a connection button is displayed.
-   [x] **Group Creation:** Supports creating a Wi-Fi Direct P2P group and waiting for other devices to join.
-   [x] **Video Session:** Enters the video chat interface after successfully creating or joining a group.
-   [x] **Data Transmission:** Uses Socket for bidirectional data transmission over the Wi-Fi Direct P2P connection.
-   [x] **Camera Preview:** Displays a full-screen preview of the local camera when no connection is established.
-   [x] **Video Display:** Upon successful connection, displays the remote camera feed in full screen, while the local camera feed is displayed in a small window in the upper right corner.
-   [x] **Camera Switching:** Supports switching between front and rear cameras at any time during the video session.
-   [x] **Audio Communication:** Audio recording and playback are non-concurrent. Audio is recorded by clicking the "I'll speak to you" button and sent to the other device in real-time as a stream for immediate playback.
-   [x] **Connection Disconnection:** Supports manually disconnecting or disconnecting due to an error, returning to the device search interface after disconnection.

### Technology Stack:

*   **Programming Language:** Kotlin
*   **Platform:** Android 4.1 (Jelly Bean) and above
*   **References:**
    *   [Android 实现无网络传输文件](https://juejin.cn/post/6844903565186596872) (Android Implementation of File Transfer Without Network)
    *   [WifiP2P](https://github.com/leavesCZY/WifiP2P?tab=readme-ov-file)

### Downloads:

#### Source Code: [v1.0.0](md/work/WifiChat/wifichat_v10._src.zip)

#### Executable Programs:

*   Debug Version: 6.2MB
*   Release Version (Minimized): 2.3MB, [wifi-chat-unsigned.apk](md/work/WifiChat/wifi-chat-unsigned.apk)

### Screenshots:

#### 1. Device Search Interface

<img src="md/work/WifiChat/WifiChat_01.jpg" class="markdown-img-container" alt="Device Search Interface">
<img src="md/work/WifiChat/WifiChat_02.jpg" class="markdown-img-container" alt="Device Search Interface with Available Devices">

---

#### 2. Video Chat Interface

<img src="md/work/WifiChat/WifiChat_03.jpg" class="markdown-img-container" alt="Video Chat Interface">

---