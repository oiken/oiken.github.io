## 目标：
基于操作系统浏览器组件的爬虫，写 js 脚本在网站上爬取数据，速度慢，可视化，貌似不会被封掉。

## 最新版本：v0.0.8

## 功能特性：
- [x] 基于操作系统的浏览器组件 WebView 实现客户端，
- [x] 需服务器提供上传接口
- [x] 用 C/C++ ，javascript 实现，
- [x] 已经在 macOS 上运行良好
- [x] 理论上可以编译在 macOs, Windows, Linux 的桌面系统上，架构可在 Android, iOS 用原生语言上实现，共用 js 脚本
- [x] 写了 js 脚本爬取豆瓣电影指定类别和页面
- [ ] 在浏览器客户端爬取时，轮番采取本地渲染获取，CORS代理，图片代理，免费HTTP代理池，匿名WebAPI代理，临时代理服务器，开放代理列表，匿名浏览代理。遵守它们的使用限制
- [ ] 分为有注册的和无注册的，国内可用的，和国内不可用的
- [ ] 策略上分为http代理池的ip物尽其用，如果通过它可以使用国内不可用的其他类型代理，就可以间隔直接使用和借用其他类型代理
  
## 可扩展成：
- [ ] **未完成** 同时爬取不同网站的一个网页，避免被封 ip，理论上用多线程创建多个窗口，调用对应网站的 js 脚本即可
- [ ] **未完成** 用 LauJIT 写动态脚本扩展底层和系统功能，配合 js 搭通天地线
- [ ] **未完成** 用 GuiLite 做其它界面

## 开发详情：
* 编程语言： HTML/CSS/JavaScript，尽量遵循 MiSRA 和 C/C++ Core Guidline 和 AutoSAR 标准的 C/C++。
* 框架和库：
  * [PureCSS v3.0.0](https://pure-css.github.io/)
  * [webview v0.12.0](https://github.com/webview/webview)
  * [cJSON-1.7.18](https://github.com/DaveGamble/cJSON)
  * [lmdb_0.9.33](https://git.openldap.org/openldap/openldap/tree/mdb.master)
  * [LuaJit v2.1](https://repo.or.cz/w/luajit-2.0.git)
  * [sqlite-3.48.0](https://www.sqlite.org/2025/sqlite-amalgamation-3480000.zip)
  * 
* 目标平台：理论上支持 Windows 7 及以上版本、macOS 以及类 Linux 桌面系统；若升级至 Tauri v2 并修改 UI，亦可支持 Android 和 iOS 平台。
* 已测试平台：macOS 15.2，

## 下载：
#### 源代码：未开放源码

#### 可执行程序：
* macOS 版本：[v0.0.8 Release 版本 213kb](md/work/Browser-based_Crawler/基于浏览器的爬虫v0.0.8.zip)
* **暂未提供** 编译到其他操作系统的可执行程序。

## 界面预览：
解压到文件夹后，在终端上用命令 cd 进入，输入 ./browser_based_crawler 回车，就会弹出界面

#### 1. 初始界面
<!-- 仅针对特定图片，自适应父容器宽度 -->
<img src="md/work/Browser-based_Crawler/Browser-based_Crawler_01.jpg" class="markdown-img-container" alt="初始界面">

---
#### 2. 爬取图片的界面

<img src="md/work/Browser-based_Crawler/Browser-based_Crawler_02.jpg" class="markdown-img-container" alt="爬取图片的界面">


## 资料备忘
```
	列举一些免费、无需注册，且对爬虫有帮助的代理类型：

	免费CORS代理
	FREE_CORS_PROXIES = {
		'cors-anywhere': 'https://cors-anywhere.herokuapp.com/',
		'allorigins': 'https://api.allorigins.win/raw?url=',
		'corsproxy': 'https://corsproxy.io/?',
		'proxy-anywhere': 'https://proxy-anywhere.herokuapp.com/'
	}
	免费图片代理
	FREE_IMAGE_PROXIES = {
		'images.weserv.nl': 'https://images.weserv.nl/?url=',
		'imageproxy': 'https://imageproxy.org/image?url=',
		'wsrv.nl': 'https://wsrv.nl/?url='
	}
	公共HTTP代理池
	FREE_PROXY_LISTS = {
		'proxylist': 'http://www.proxylist.download/api/v1/get',
		'pubproxy': 'http://pubproxy.com/api/proxy',
		'proxy-list': 'https://www.proxy-list.download/api/v1/get'
	}
	其他有用的免费代理服务
	OTHER_FREE_PROXIES = {
		# 匿名WebAPI代理
		'hide.me': 'https://hide.me/en/proxy',
		
		# 临时代理服务器
		'croxyproxy': 'https://www.croxyproxy.com',
		
		# 开放代理列表
		'spys.one': 'https://spys.one/en/',
		
		# 匿名浏览代理
		'proxysite': 'https://www.proxysite.com'
	}
```

---
