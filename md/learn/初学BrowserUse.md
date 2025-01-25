# 2025-01-24
## 创建 python 虚拟环境
安装 uv 更先进更快，语法和 pip 一样，带上 pip 即可
pip install uv

在当前目录下创建虚拟环境：
uv venv
会产生一个隐藏的 .venv 文件夹，进入这个虚拟环境
source .venv/bin/activate
如果想创建一个不隐藏的 venv 文件夹名字，就用 
```bash
uv venv 文件夹名字
cd 文件夹名字
source bin/activate
"

安装库
uv pip install browser_use

## 按 browser use 的例子，调用 deepseek api
创建 .env 文件，写入： DEEPSEEK_API_KEY=sk-e1xxxxx
创建 deepseek.py ，写入：
```python
# from https://github.com/browser-use/browser-use/blob/main/examples/deepseek.py
# from https://github.com/browser-use/browser-use/blob/main/examples/deepseek.py

import asyncio
import os

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from pydantic import SecretStr

from browser_use import Agent

# dotenv
load_dotenv()

api_key = os.getenv('DEEPSEEK_API_KEY', '')
if not api_key:
    raise ValueError('DEEPSEEK_API_KEY is not set')


async def run_search():
    agent = Agent(
        task=(
            '1. 去网站：https://i.buzzing.cc/hnnew/archive/2024/52/ ，这是2024年第52周的归档'
            '2. 如果出现验证网页，显示：“i.buzzing.cc” 和 “正在验证您是否是真人。这可能需要几秒钟时间。”，每隔10秒检查网页上的元素，等待出现元素“确认您是真人”，在它前面打勾。每隔一分钟检查是否已经通过了验证且出现了文章列表。检查超过10次之后报告出错，任务中止'
            '3. 一直往下滚动网页直到不再加载'
            '4. 查看有关“供电”，“接头”，“光纤”的文章'
            '5. 如果有，则返回这篇文章的链接和当前网页的链接，结束任务'
            '6. 如果没有，则翻看下一周历史归档'
            '7. 直到看完2024年第50周的归档，都没有找到相关文章，就报告没有找到'
        ),
        llm=ChatOpenAI(
            base_url='https://api.deepseek.com',
            model='deepseek-chat',
            api_key=SecretStr(api_key),
        ),
        use_vision=False,
    )

    await agent.run()


if __name__ == '__main__':
    asyncio.run(run_search())
```

不用当前的安全证书： unset SSL_CERT_FILE
运行： python deepseek.py