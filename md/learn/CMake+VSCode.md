# 2025-01-13
* 安装微软公司出品的 CMake 插件

* [按教程创建新项目：](https://code.visualstudio.com/docs/cpp/cmake-quickstart)
```shell
mkdir crawl_farm && cd crawl_farm
VSCode 打开文件夹 crawl_farm
顶部输入命令： >CMake: Quick Start 
输入项目名字 CrawlFarm
选择 C 或 C++ 项目
选择 Excutable 类型
选择 CTest 作为支持测试的附加选项

在左侧的三角形是 CMake 插件，点击，在《配置》中点击铅笔头，创建一个 CMakePreset.json ，会列出本机的编译器，我选择并作为名字 Clang 16
```
* 