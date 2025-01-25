## 2025-01-25
来自文章：[用Robyn从0到1搭建一个Web API](https://juejin.cn/post/7452648140767805452)

#### 安装：注意用 uv instll robyn 失败，用 pip install robyn 成功，但运行python3 hello_world.py 失败，说找不到 robyn
卸载 robyn 前要看看它的依赖库，一并删除： pip show robyn  
pip uninstall inquirerpy multiprocess orjson rustimport uvloop watchdog robyn  


## 这样安装成功，还是要在虚拟环境中玩，避免麻烦
```bash
我以前安装了 virtualenv 
virtualenv --version
virtualenv 20.24.7 from /Users/wdfc/Library/Python/3.9/lib/python/site-packages/virtualenv/__init__.py
wdfc@WDFCs-MacBook-Pro robyn % where virtualenv
/Users/wdfc/Library/Python/3.9/bin/virtualenv
/Users/wdfc/Library/Python/3.9/bin/virtualenv
wdfc@WDFCs-MacBook-Pro robyn % virtualenv .venv
created virtual environment CPython3.9.6.final.0-64 in 904ms
  creator CPython3macOsFramework(dest=/Users/wdfc/Documents/Product/AiCrawler/robyn/.venv, clear=False, no_vcs_ignore=False, global=False)
  seeder FromAppData(download=False, pip=bundle, setuptools=bundle, wheel=bundle, via=copy, app_data_dir=/Users/wdfc/Library/Application Support/virtualenv)
    added seed packages: pip==23.3.1, setuptools==69.0.2, wheel==0.41.3
  activators XonshActivator,BashActivator,CShellActivator,FishActivator,NushellActivator,PowerShellActivator,PythonActivator
wdfc@WDFCs-MacBook-Pro robyn % source .venv/bin/activate

(.venv) wdfc@WDFCs-MacBook-Pro robyn % pip install robyn
...
Successfully installed dill-0.3.9 inquirerpy-0.3.4 multiprocess-0.70.14 orjson-3.9.15 pfzy-0.3.4 prompt-toolkit-3.0.50 robyn-0.65.0 rustimport-1.3.4 toml-0.10.2 uvloop-0.19.0 watchdog-4.0.1 wcwidth-0.2.13

成功后要用 sudo python3 hello_world.py ，否则会说没有权限
```

## 初步使用：
* 看看 robyn 能干啥 robyn --help  
* 用 robyn 创建项目脚手架： robyn --create buzzing_copy  
我选用了 sqlite ，其它太复杂  

生成了脚手架，后面加了解决乱码和查看 cpu 核心和自己启动的进程数量，：  
```python
import sqlite3

from robyn import Robyn

app = Robyn(__file__)


@app.get("/")
def index():
    # your db name
    conn = sqlite3.connect("example.db")
    cur = conn.cursor()
    cur.execute("DROP TABLE IF EXISTS test")
    cur.execute("CREATE TABLE test(column_1, column_2)")
    res = cur.execute("SELECT name FROM sqlite_master")
    th = res.fetchone()
    table_name = th[0]
    return f"Hello World! {table_name}"


if __name__ == "__main__":
    app.start(host="0.0.0.0", port=8080)
```


* 运行，我发布时用 --fast 自动设置快跑的参数，开发时用 --dev 修改了文件自动重启服务器， 但 --fast --dev 不能共存，只能用一个，试过了，--faset 也就设置了两个 worker。但我的内核有 12个，所以可以设置12个核心。另外 --open-browser 启动后自动打开浏览器  
python3 -m robyn buzzing_cc_copy/app.py --dev --open-browser  

### 怎么用chrome浏览器测试 post 接口 /echo
在 http://localhost:80 的网页上按 F12 打开 devTools  
在控制台输入并回车：  
```js
fetch("/echo", {  method: "POST",  headers: {    "Content-Type": "application/json",   },  body: JSON.stringify({      key1: "字符串的值",    key2: 32123,  }),       })  .then((response) => response.json())  .then((data) => console.log("Response:", data))  .catch((error) => console.error("Error:", error)); 
```
很快就返回了response：    {echo: '{"key1":"字符串的值","key2":32123}'}

### 用命令行 curl -X POST -d "Hello, 花小姐的春天" http://localhost:80/echo
返回：  {"echo":"Hello, 花小姐的春天"}%     

### 因为是 api ，所以支持跨域
```python
from robyn import Robyn, ALLOW_CORS

app = Robyn(__file__)
ALLOW_CORS(app, origins=["http://localhost:80/"])  # 因为是 api，所以跨域支持（CORS）
```

### 部署：
用 Gunicorn + Uvicorn 部署：
```bash
pip install Gunicorn Uvicorn  
Gunicorn -w 4 -k unicorn.workers.UvicornWorker app:app  
```

因为单个 Robyn 应用： 就像一个单人小作坊，只能处理少量订单，效率较低。
Gunicorn + Uvicorn： 就像一个大型工厂，拥有多条生产线，可以同时处理大量订单，效率高，并且有备份机制，不容易崩溃。
因此，Gunicorn + Uvicorn 的组合能够显著提升 Robyn 应用的性能、可靠性和可扩展性，使其更适合在生产环境中使用。这是单个 Robyn 应用无法单独实现的。


## 最终代码：
```python
```app.py
import sqlite3
import os
import multiprocessing
import json

from robyn import Robyn, ALLOW_CORS
from robyn.responses import Response

app = Robyn(__file__)
ALLOW_CORS(app, origins=["http://localhost:80/"])  # 因为是 api，所以跨域支持（CORS）


@app.get("/")
def index():
    # your db name
    conn = sqlite3.connect("example.db")
    cur = conn.cursor()
    cur.execute("DROP TABLE IF EXISTS test")
    cur.execute("CREATE TABLE test(column_1, column_2)")
    res = cur.execute("SELECT name FROM sqlite_master")
    th = res.fetchone()
    table_name = th[0]

    worker_id = os.getpid()  # 获取当前 worker 的进程 ID
    num_workers = app.config.workers  # 获取配置的 worker 数量
    num_processes = multiprocessing.cpu_count()  # 获取CPU核心数，即进程数

    html_content = f"<h1>Hello! sqlite 数据库表的名字是 {table_name}</h1>\
        <h2>Worker ID: {worker_id}, Number of Workers: {num_workers}, Number of Processes: {num_processes}</h2>"
    return Response(
        description=html_content.encode("utf-8"),  # 解决中文乱码
        headers={"Content-Type": "text/html; charset=utf-8"},
        status_code=200
    )


@app.post("/json")
def handle_json(request):
    data = json.loads(request.body)
    name = data.get("name", "Python")
    return {"message": f"Hello,{name}!"}


@app.get("/greet")
def greet(request):
    name = request.query_params.get("name", "Stranger")
    data = {"greeting": f"Hi, {name}!"}
    return Response(
        description=json.dumps(data),
        headers={"Content-Type": "text/json; charset=utf-8"},  # 解决中文乱码
        status_code=200
    )


@app.post("/echo")
def echo(request):
    data = request.body
    return {"echo": data}

# js 在 devTools 的控制台测试：fetch("/json", {  method: "POST",  headers: {    "Content-Type": "application/json",   },  body: JSON.stringify({   "name":"花小姐的春天",   key1: "字符串的值",    key2: 32123,  }),       })  .then((response) => response.json())  .then((data) => console.log("Response:", data))  .catch((error) => console.error("Error:", error));
# js 在 devTools 的控制台测试：fetch("/greet?name=花小姐的春天").then((response) => response.json()).then((data) => console.log("Response:", data)).catch((error) => console.error("Error:", error));
# js 在 devTools 的控制台测试：fetch("/echo", {  method: "POST",  headers: {    "Content-Type": "application/json",   },  body: JSON.stringify({      key1: "字符串的值",    key2: 32123,  }),       })  .then((response) => response.json())  .then((data) => console.log("Response:", data))  .catch((error) => console.error("Error:", error));


if __name__ == "__main__":
    app.start(host="0.0.0.0", port=80)
```
启动命令：  
python3 -m robyn buzzing_cc_copy/app.py --dev --open-browser