## Purpose:
Mount 115 cloud storage as a local folder, use a proxy to log in, and manage it through a web interface

## Latest version: v1.0.0

## Features:
- [x] Execute command line at the same level as the Public folder: ```./CloudNas```
- [x] Obtain login cookie using a proxy server
- [x] Provide a web interface for settings and management
- [x] Mount 115 cloud storage as a local folder after successful login
- [x] In the local folder, you can: browse, download, rename, delete, search, create new folders
- [x] In a browser, you can: browse, download
- [x] Run on a OneCloud box; share this folder with other devices on the same LAN using a Samba server. Due to device performance limitations, the download speed is slightly slower than when running on a local machine.
- [ ] **Not Implemented**: create file, upload file
- [ ] **Not Fixed**: On the initial login via a proxy, a new data/setting.json file is created. The user ID should be the login timestamp, but it is currently displaying 0

## Development:
* Programming Language: Rust
* Platform: Theoretically compatible with Windows 7 and later, macOS, and Linux-like desktop systems
* Tested on: macOS 15.2; OneCloud box
* Reference code: Python: [web-mount-client](https://github.com/ChenyangGao/web-mount-packs/blob/main/python-115-client/p115/component/client.py), Golang: Alist, RClone

## Download:
#### Source Code: [v1.0.0](md/work/CloudNas/CloudNas_v1.0.0_src.zip)

## Application:
* macOS version: Debug version 13.2MB, [min size release version 1.5MB](md/work/CloudNas/cloud_nas.zip)
* Arm V7 gnueabihf min size release version, for OneCloud Box:
  * [no-upx 3.7MB](md/work/CloudNas/armv7-gnueabihf-minsize-cloud_nas)  

  * [upx 2.1MB](md/work/CloudNas/armv7-gnueabihf-minsize-cloud_nas_upx)  
* **Not yet available** for other operating systems

## UI:
#### 1. CLI: ```./CloudNas```

<img src="md/work/CloudNas/CloudNas_00.jpg" class="markdown-img-container" alt="Cli output">

---
#### 2. Webpage management:

<img src="md/work/CloudNas/CloudNas_01.jpg" class="markdown-img-container" alt="Webpage management">

---
#### 3. Webpage browsing:

<img src="md/work/CloudNas/CloudNas_02.jpg" class="markdown-img-container" alt="Webpage browsing one">
<img src="md/work/CloudNas/CloudNas_03.jpg" class="markdown-img-container" alt="Webpage browsing two">

---