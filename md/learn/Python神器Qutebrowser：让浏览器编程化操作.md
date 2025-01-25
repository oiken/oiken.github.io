# 2025-01-24
### 起源：
[文章介绍](https://mp.weixin.qq.com/s/poUoH2yKR7bFZEzsagC2WQ)  ，

### 设置 python 在中国的下载源
在项目目录下创建：uv.toml ，内容为：  
```toml
index-url = "https://pypi.tuna.tsinghua.edu.cn/simple" # 清华大学镜像源，每分钟 1 mb
# index-url = "https://mirrors.aliyun.com/pypi/simple"  # 阿里云镜像源
# index-url = "https://pypi.mirrors.ustc.edu.cn/simple"  # 中国科技大学镜像源

# uv 没有像 pip 那样显式地使用 trusted-host 字段。uv 默认会信任你通过 index-url 或 extra-index-url 指定的镜像源。
# 删掉 trusted-host = "pypi.tuna.tsinghua.edu.cn" # 清华大学镜像源

```

### 安装：
* 按照[官方的安装文章](https://www.qutebrowser.org/doc/install.html)  
* 经过测试，选用两种，[下载安装包，直接安装应用](https://github.com/qutebrowser/qutebrowser/releases/tag/v3.4.0)；和[下载源代码，用 python 虚拟环境安装](https://www.qutebrowser.org/doc/install.html#tox)，
* 不用当前的安全证书命令：unset SSL_CERT_FILE

```bash
解压下载下来的源代码包到要安装的目录里并进入该目录
用官方脚本安装
python3 scripts/mkvenv.py
安装完毕，进入虚拟环境
source .venv/bin/activate   
下载 asciidoc 库，帮助生成帮助文件
uv pip install asciidoc  
生成帮助文件，可以在 qutebrowser 里看帮助网页
python3 scripts/asciidoc2html.py
quteBrowser % qutebrowser  
```

### 运行外部 python 脚本，只能给 qutebrowser 发命令，无法用它内部的方法：
* 在你选定的目录创建 open_pages.py ，内容如下：
```
#!/usr/bin/env python3
import os

def main():
    urls = [
        'https://www.python.org',
        'https://github.com',
        'https://stackoverflow.com'
    ]
    
    fifo_path = os.environ.get("QUTE_FIFO")
    if fifo_path:
        with open(fifo_path, "w") as fifo:
            # 依次打开每个 URL（每个 URL 在新标签页中打开）
            for url in urls:
                fifo.write(f"open -t {url}\n")
    else:
        print("错误：请通过 ':spawn --userscript' 运行此脚本。")

if __name__ == '__main__':
    main()
```

* 命令行执行 chmod +x path/to/open_pages.py ，才能执行
* 命令行执行 qutebrowser 或打开 qutebrower 应用程序
* 键盘输入冒号 : spawn --userscripts 绝对路径/open_pages.py 回车即可执行，速度慢，要稍等。

#### 如果不想输入绝对路径，可以放在默认路径下：/Users/wdfc/Library/Application Support/qutebrowser/userscripts/open_pages.py ，命令可以改为简单的 键盘输入冒号 : spawn --userscripts open_pages.py 回车

### 更新去除广告的规则，键盘输入冒号  :adblock-update
2025-01-25 01:08:35,979 - INFO - Downloading adblock filter lists...
2025-01-25 01:08:38,701 - INFO - braveadblock: Filters successfully read from 2 sources.

### 运行内部 python 脚本
* qutebrowser 键盘输入 :config-write-py 回车，会生成当前的配置到 config.py 。位置为： ~/.qutebrowser/config.py
```bash
ls -al ~/.qutebrowser/
total 16
drwx------    6 wdfc  staff   192  1 24 16:56 .
drwxr-xr-x+ 130 wdfc  staff  4160  1 24 13:44 ..
drwxr-xr-x@   3 wdfc  staff    96  1 24 12:23 bookmarks
-rw-r--r--    1 wdfc  staff  6852  1 24 16:56 config.py
drwxr-xr-x@   2 wdfc  staff    64  1 24 12:23 greasemonkey
-rw-r--r--@   1 wdfc  staff     0  1 24 12:23 quickmarks
```

* 输入 :version 回车会打印很多信息：
```html
Version info
Yank pastebin URL for version info
         ______     ,,
    ,.-"`      | ,-` |
  .^           ||    |
 /    ,-*^|    ||    |
;    /    |    ||    ;-*```^*.
;   ;     |    |;,-*`         \
|   |     |  ,-*`    ,-"""\    \
|    \   ,-"`    ,-^`|     \    |
 \    `^^    ,-;|    |     ;    |
  *;     ,-*`  ||    |     /   ;;
    `^^`` |    ||    |   ,^    /
          |    ||    `^^`    ,^
          |  _,"|        _,-"
          -*`   ****"""``

qutebrowser v3.4.0
Backend: QtWebEngine 6.8.1
  based on Chromium 122.0.6261.171
  with security patches up to 131.0.6778.70 (plus any distribution patches)
  (source: api)
Qt: 6.8.1

CPython: 3.13.1
PyQt: 6.8.0

Qt wrapper info:
  PyQt6: success
  PyQt5: not imported
  -> selected: PyQt6 (via autoselect)

colorama: 0.4.6
jinja2: 3.1.5
pygments: 2.19.1
yaml: 6.0.2
adblock: 0.6.0
objc: 11.0
PyQt6.QtWebEngineCore: 6.8.0
PyQt6.sip: 6.9.1
pdf.js: no
sqlite: 3.47.0
QtNetwork SSL: OpenSSL 3.4.0 22 Oct 2024

Style: QMacStyle
Platform plugin: cocoa
OpenGL: ATI Technologies Inc., 2.1 ATI-6.1.13
Platform: macOS-15.2-x86_64-i386-64bit-Mach-O, 64bit
Frozen: False
Imported from /Users/wdfc/Documents/Product/AiCrawler/qutebrowser/qutebrowser
Using Python from /Users/wdfc/Documents/Product/AiCrawler/qutebrowser/.venv/bin/python
Qt library executable path: /Users/wdfc/Documents/Product/AiCrawler/qutebrowser/.venv/lib/python3.13/site-packages/PyQt6/Qt6/libexec, data path: /Users/wdfc/Documents/Product/AiCrawler/qutebrowser/.venv/lib/python3.13/site-packages/PyQt6/Qt6
OS Version: 15.2, x86_64

Paths:
auto config: /Users/wdfc/Library/Preferences/qutebrowser
cache: /Users/wdfc/Library/Caches/qutebrowser
config: /Users/wdfc/.qutebrowser
data: /Users/wdfc/Library/Application Support/qutebrowser
runtime: /private/var/folders/fw/61srzy3x5m5dg9nf_l76q6x00000gn/T/qutebrowser

Autoconfig loaded: yes
Config.py: no config.py was loaded
Uptime: 1:17:10
Copyright info
Copyright 2013-2025 Florian Bruhin (The Compiler)

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see https://www.gnu.org/licenses/ or open qute://gpl.
```
* 在 config.py 上增加或修改：c.url.start_pages = ['https://www.bing.com']，就能改变启动后的首页  
如果需要启动时打开多个首页：
```
# 设置多个首页
c.url.start_pages = [
    'https://www.bing.com',
    'https://www.baidu.com',
    'https://www.google.com'
]
```

如果需要根据条件打开首页，例如时间段，可以这样：
```
import datetime

# 根据时间动态设置首页
if datetime.datetime.now().hour < 12:
    c.url.start_pages = ['https://www.morning.com']
else:
    c.url.start_pages = ['https://www.afternoon.com']
```

* 新建一个页面是空白页:  c.url.default_page = 'about:blank'
* 新建一个页面是煎蛋网   c.url.default_page = 'www.jandan.net'

* qutebrowser --debug 可以看到反馈

* 内部脚本执行也是要有执行权限的，用命令： chmod +x /Users/xxx/Documents/Product/AiCrawler/qutebrowser/userscripts/open_pages_when_start.py 

* 如果脚本里有windows字符如换行，也会阻止执行，查看 file userscripts/open_pages_when_start.py 
userscripts/open_pages_when_start.py: Python script text executable, ASCII text  会告诉你能否运行：
file userscripts/open_pages_when_start.py   
userscripts/open_pages_when_start.py: Python script text executable, ASCII tex  

* # 加载并 立即 执行外部脚本，打印是输出到当前的终端
config.source('/Users/wdfc/Documents/Product/AiCrawler/qutebrowser/userscripts/print_hello.py')

* # 绑定快捷键 ",a" 直接调用 open_multiple_pages 函数
config.bind(
    ',a', 'spawn --userscript /Users/wdfc/Documents/Product/AiCrawler/qutebrowser/userscripts/print_hello.py')

注意这两者的区别：  
config.source() 会在 qutebrowser 启动时 直接 执行 Python 脚本，
而 spawn --userscript 则是在 qutebrowser 中 启动一个子进程 来执行脚本。所以看不到打印，要改调用，或改日志输出方式或输出到文件

