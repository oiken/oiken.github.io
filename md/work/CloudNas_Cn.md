## 目的：
将 115 网络云盘挂载为本地文件夹，使用代理进行登录，并通过网页进行管理

## 最新版本：v1.0.0

## 功能：
- [x] 终端命令，在 Public 文件夹的同级目录下执行：`./CloudNas`
- [x] 使用代理获取登录 Cookie
- [x] 提供网页形式的设置和管理界面
- [x] 登录成功后，将云盘挂载为本地文件夹
- [x] 重启服务
- [x] 在本地文件夹中：浏览、下载、更名、删除、查找、创建新文件夹
- [x] 在浏览器中：浏览、下载
- [x] 可在玩客云机顶盒上运行，并通过 Samba 服务将此文件夹共享给同一局域网的其他设备。由于设备性能限制，下载速度略慢于本机运行
- [ ] **未完成**：创建文件、上传文件
- [ ] **未修正**：首次使用代理登录后，会新建 data/setting.json 文件。用户 ID 本应为登录时的时间戳，但目前显示为 0

## 开发相关：
* 编程语言：Rust
* 运行平台：理论上可运行于 Windows 7 及以上版本、macOS 以及类 Linux 桌面系统
* 已测试平台：macOS 15.2；玩客云机顶盒
* 参考代码：Golang 的 Alist、RClone；Python 的 [web-mount-client](https://github.com/ChenyangGao/web-mount-packs/blob/main/python-115-client/p115/component/client.py)

## 下载：
#### 源代码：[v1.0.0](md/work/CloudNas/CloudNas_v1.0.0_src.zip)

#### 可执行程序：
* macOS 版本：Debug 版 13.2MB，[最小化 Release 版本 1.5MB](md/work/CloudNas/cloud_nas.zip)
* 为玩客云机顶盒编译的版本：Arm V7 gnueabihf 最小化 Release 版本
  * [没有用 upx 压缩：3.7MB](md/work/CloudNas/armv7-gnueabihf-minsize-cloud_nas)  

  * [用了 upx 压缩：2.1MB](md/work/CloudNas/armv7-gnueabihf-minsize-cloud_nas_upx)  
* **暂未提供** 编译到其他操作系统的可执行程序

## 界面：
#### 1. 终端命令：`./CloudNas`


<img src="md/work/CloudNas/CloudNas_00.jpg" class="markdown-img-container" alt="终端输出">

---

#### 2. 网页设置和管理界面

<img src="md/work/CloudNas/CloudNas_01.jpg" class="markdown-img-container" alt="网页设置和管理界面">

---

#### 3. 网页浏览界面

<img src="md/work/CloudNas/CloudNas_02.jpg" class="markdown-img-container" alt="网页浏览界面之一">
<img src="md/work/CloudNas/CloudNas_03.jpg" class="markdown-img-container" alt="网页浏览界面之二">

---