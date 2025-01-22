## Objective:
A browser component-based web scraper using JavaScript scripts to collect data from websites. Features visual feedback, slower but more reliable operation, and better resistance to blocking.

## Latest Version: v0.0.8

## Features:
- [x] Client built on OS-native WebView browser component
- [x] Server-side upload API support
- [x] Implemented in C/C++ and JavaScript
- [x] Stable operation on macOS
- [x] Cross-platform compatibility (macOS, Windows, Linux); architecture adaptable to Android/iOS with native implementations sharing JS scripts
- [x] JavaScript scraping scripts for Douban Movies by category and page
- [ ] Browser-based scraping with rotating proxy strategies:
 - Local rendering
 - CORS proxies
 - Image proxies  
 - Free HTTP proxy pools
 - Anonymous WebAPI proxies
 - Temporary proxy servers
 - Open proxy lists
 - Anonymous browsing proxies
 (All used within usage limits)
- [ ] Categorized by registration requirement and regional availability
- [ ] Strategic proxy usage combining HTTP proxy pools with other proxy types

## Planned Extensions:
- [ ] **TODO** Multi-threaded scraping of different sites simultaneously to avoid IP blocks
- [ ] **TODO** LuaJIT dynamic scripting for extended system functionality
- [ ] **TODO** Alternative UI using GuiLite

## Technical Details:
* Languages: HTML/CSS/JavaScript, C/C++ (following MiSRA, C++ Core Guidelines and AutoSAR standards)
* Frameworks & Libraries:
 * [PureCSS v3.0.0](https://pure-css.github.io/)
 * [webview v0.12.0](https://github.com/webview/webview)
 * [cJSON-1.7.18](https://github.com/DaveGamble/cJSON)
 * [lmdb_0.9.33](https://git.openldap.org/openldap/openldap/tree/mdb.master)
 * [LuaJit v2.1](https://repo.or.cz/w/luajit-2.0.git)
 * [sqlite-3.48.0](https://www.sqlite.org/2025/sqlite-amalgamation-3480000.zip)

* Target Platforms: Windows 7+, macOS, Linux desktop systems; potential for Android/iOS support with Tauri v2 upgrade
* Tested Platforms: macOS 15.2

## Downloads:
#### Source Code: Not publicly available

#### Executables:
* macOS: [v0.0.8 Release (213kb)](md/work/Browser-based_Crawler/基于浏览器的爬虫v0.0.8.zip)
* **Pending** Builds for other operating systems

## UI Preview:
After extracting, navigate to the folder in terminal and run `./browser_based_crawler`

#### 1. Initial Interface
<img src="md/work/Browser-based_Crawler/Browser-based_Crawler_01.jpg" class="markdown-img-container" alt="Initial Interface">

---
#### 2. Scraping Interface
<img src="md/work/Browser-based_Crawler/Browser-based_Crawler_02.jpg" class="markdown-img-container" alt="Scraping Interface">

## Reference Notes:
```python
# Free, no-registration proxy services for web scraping:

FREE_CORS_PROXIES = {
   'cors-anywhere': 'https://cors-anywhere.herokuapp.com/',
   'allorigins': 'https://api.allorigins.win/raw?url=',
   'corsproxy': 'https://corsproxy.io/?',
   'proxy-anywhere': 'https://proxy-anywhere.herokuapp.com/'
}

FREE_IMAGE_PROXIES = {
   'images.weserv.nl': 'https://images.weserv.nl/?url=',
   'imageproxy': 'https://imageproxy.org/image?url=',
   'wsrv.nl': 'https://wsrv.nl/?url='
}

FREE_PROXY_LISTS = {
   'proxylist': 'http://www.proxylist.download/api/v1/get',
   'pubproxy': 'http://pubproxy.com/api/proxy',
   'proxy-list': 'https://www.proxy-list.download/api/v1/get'
}

OTHER_FREE_PROXIES = {
   # Anonymous WebAPI Proxy
   'hide.me': 'https://hide.me/en/proxy',
   
   # Temporary Proxy Servers
   'croxyproxy': 'https://www.croxyproxy.com',
   
   # Open Proxy Lists
   'spys.one': 'https://spys.one/en/',
   
   # Anonymous Browsing Proxy
   'proxysite': 'https://www.proxysite.com'
}
