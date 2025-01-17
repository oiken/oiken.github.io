# 请由浅入深地教我学习 CMake

## https://chat.DeepSeek.com 联网搜索模式：

好的！CMake 是一个跨平台的构建工具，用于管理项目的编译过程。它可以帮助你生成适用于不同编译器和操作系统的构建文件（如 Makefile、Visual Studio 项目等）。下面我将由浅入深地教你学习 CMake。

### 1. CMake 的基本概念

#### 1.1 什么是 CMake？
CMake 是一个开源的跨平台构建系统，它使用配置文件（`CMakeLists.txt`）来定义项目的构建过程。CMake 本身并不直接编译代码，而是生成适用于不同平台的构建文件（如 Makefile、Ninja 文件、Visual Studio 项目等），然后你可以使用这些文件来编译代码。

#### 1.2 为什么使用 CMake？
- **跨平台**：CMake 可以在 Windows、Linux、macOS 等不同操作系统上使用。
- **灵活性**：CMake 支持多种编译器和构建工具。
- **可扩展性**：CMake 支持模块化配置，适合大型项目。

### 2. 安装 CMake

#### 2.1 在 Linux 上安装 CMake
```bash
sudo apt-get update
sudo apt-get install cmake
```

#### 2.2 在 macOS 上安装 CMake
```bash
brew install cmake
```

#### 2.3 在 Windows 上安装 CMake
你可以从 [CMake 官网](https://cmake.org/download/) 下载安装程序并按照提示安装。

### 3. 第一个 CMake 项目

#### 3.1 创建一个简单的 C++ 项目
假设你有一个简单的 C++ 项目，目录结构如下：
```
my_project/
├── CMakeLists.txt
└── main.cpp
```

`main.cpp` 文件内容：
```cpp
#include <iostream>

int main() {
    std::cout << "您好，世界！" << std::endl;
    return 0;
}
```

#### 3.2 编写 `CMakeLists.txt`
在 `cmake_practice` 目录下创建一个 `CMakeLists.txt` 文件，内容如下：
```cmake
# 指定 CMake 的最低版本要求
cmake_minimum_required(VERSION 3.10)

# 设置项目名称
project(CMakePractice)

# 添加可执行文件
add_executable(CMakePractice main.cpp)
```

#### 3.3 生成构建文件并编译
在 `cmake_practice` 目录下执行以下命令：
```bash
mkdir build
cd build
cmake ..
会返回：
-- The C compiler identification is AppleClang 16.0.0.16000026
-- The CXX compiler identification is AppleClang 16.0.0.16000026
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
-- Configuring done (3.4s)
-- Generating done (0.0s)
-- Build files have been written to: /Users/xxxx/Documents/Product/DouBanSpider/cmake_practice/build

查看 build 目录里有这几个文件：
Makefile 
CMakeFiles/ 文件夹
CMakeCache.txt cmake_install.cmake

继续执行
make
[ 50%] Building CXX object CMakeFiles/CMakePractice.dir/main.cpp.o
[100%] Linking CXX executable CMakePractice
[100%] Built target CMakePractice

生成了 CMakePractice 可执行文件，执行它： ./CMakePractice
打印出：
您好，世界！
```

执行完这些命令后，你会在 `build` 目录下生成一个可执行文件 `CMakePractice`，运行它将会输出 `您好，世界！`。

### 4. CMake 的基本语法

#### 4.1 变量
CMake 使用 `set` 命令来定义变量：
```cmake
set(MY_VARIABLE "Hello, World!")
```

#### 4.2 条件语句
CMake 支持 `if` 语句：
```cmake
if(WIN32)
    message("This is Windows")
elseif(UNIX)
    message("This is Unix")
endif()
```

#### 4.3 循环
CMake 支持 `foreach` 和 `while` 循环：
```cmake
foreach(i RANGE 1 5)
    message("i = ${i}")
endforeach()
```

### 5. 进阶用法

#### 5.1 添加库
假设你有一个库文件 `mylib.cpp` 和 `mylib.h`，你可以将它们编译成一个静态库或动态库。

`CMakeLists.txt` 内容：
```cmake
cmake_minimum_required(VERSION 3.10)
project(MyProject)

# 添加库
add_library(MyLibrary STATIC mylib.cpp)

# 添加可执行文件并链接库
add_executable(MyProject main.cpp)
target_link_libraries(MyProject MyLibrary)
```

#### 5.2 添加子目录
如果你的项目有多个子目录，每个子目录都有自己的 `CMakeLists.txt`，你可以在主 `CMakeLists.txt` 中使用 `add_subdirectory` 命令来包含它们。

目录结构：
```
my_project/
├── CMakeLists.txt
├── main.cpp
└── mylib/
    ├── CMakeLists.txt
    ├── mylib.cpp
    └── mylib.h
```

主 `CMakeLists.txt` 内容：
```cmake
cmake_minimum_required(VERSION 3.10)
project(MyProject)

# 添加子目录
add_subdirectory(mylib)

# 添加可执行文件并链接库
add_executable(MyProject main.cpp)
target_link_libraries(MyProject MyLibrary)
```

`mylib/CMakeLists.txt` 内容：
```cmake
add_library(MyLibrary STATIC mylib.cpp)
```

#### 5.3 使用外部库
你可以使用 `find_package` 命令来查找和使用外部库。例如，使用 OpenCV 库：
```cmake
find_package(OpenCV REQUIRED)

if(OpenCV_FOUND)
    include_directories(${OpenCV_INCLUDE_DIRS})
    target_link_libraries(MyProject ${OpenCV_LIBS})
endif()
```

### 6. 高级主题

#### 6.1 自定义命令
你可以使用 `add_custom_command` 和 `add_custom_target` 来定义自定义命令和目标。

#### 6.2 生成器表达式
CMake 支持生成器表达式，用于在生成构建文件时进行条件判断和变量替换。

#### 6.3 交叉编译
CMake 支持交叉编译，你可以通过设置工具链文件来配置交叉编译环境。

### 7. 参考资料
- [CMake 官方文档](https://cmake.org/documentation/)
- 《Mastering CMake》 by Ken Martin and Bill Hoffman

### 8. 练习
1. 创建一个包含多个源文件和头文件的项目，并使用 CMake 构建它。
2. 尝试使用 `find_package` 命令引入一个外部库（如 Boost 或 OpenCV）。
3. 尝试在一个项目中包含多个子目录，每个子目录都有自己的 `CMakeLists.txt`。

通过以上步骤，你应该能够掌握 CMake 的基本用法，并能够使用它来管理你的项目构建过程。如果你有任何问题，欢迎随时提问！



## https://chat.DeepSeek.com 深度思考模式：
学习 CMake 是一个逐步深入的过程，特别是如果你之前没有接触过类似的构建工具。下面是一个由浅入深的学习路线，帮助你系统地掌握 CMake。

### 1. 了解 CMake 的基本概念

**什么是 CMake？**
- CMake 是一个跨平台的构建系统生成器，用于管理软件构建过程。
- 它通过读取 `CMakeLists.txt` 文件来生成特定平台的构建文件（如 Makefile、Visual Studio 项目文件等）。

**为什么使用 CMake？**
- 跨平台支持：可以在 Windows、Linux、macOS 等不同操作系统上使用。
- 灵活性：支持多种编译器和构建工具。
- 可维护性：通过模块化配置文件，简化项目管理。

### 2. 安装 CMake

根据你的操作系统，选择合适的安装方式：

- **Linux:**
  ```bash
  sudo apt-get update
  sudo apt-get install cmake
  ```

- **macOS:**
  ```bash
  brew install cmake
  ```

- **Windows:**
  从 [CMake 官网](https://cmake.org/download/) 下载安装程序并按照提示安装。

### 3. 创建第一个 CMake 项目

**项目结构:**
```
my_project/
├── CMakeLists.txt
└── main.cpp
```

**main.cpp 内容:**
```cpp
#include <iostream>

int main() {
    std::cout << "Hello, CMake!" << std::endl;
    return 0;
}
```

**CMakeLists.txt 内容:**
```cmake
cmake_minimum_required(VERSION 3.10)
project(MyProject)

add_executable(MyProject main.cpp)
```

**编译步骤:**
```bash
mkdir build
cd build
cmake ..
make
```

**运行程序:**
```bash
./MyProject
```

### 4. 学习 CMake 基础语法

**变量定义:**
```cmake
set(VAR "value")
```

**条件语句:**
```cmake
if(WIN32)
    message("Windows platform")
elseif(UNIX)
    message("Unix platform")
endif()
```

**循环语句:**
```cmake
foreach(item IN LISTS myList)
    message("Item: ${item}")
endforeach()
```

### 5. 管理库和头文件

**添加库:**
```cmake
add_library(MyLibrary STATIC mylib.cpp)
add_executable(MyExecutable main.cpp)
target_link_libraries(MyExecutable MyLibrary)
```

**包含头文件目录:**
```cmake
target_include_directories(MyExecutable PRIVATE ${CMAKE_SOURCE_DIR}/include)
```

### 6. 处理子目录

**项目结构:**
```
my_project/
├── CMakeLists.txt
├── main.cpp
└── mylib/
    ├── CMakeLists.txt
    ├── mylib.cpp
    └── mylib.h
```

**主 CMakeLists.txt:**
```cmake
cmake_minimum_required(VERSION 3.10)
project(MyProject)

add_subdirectory(mylib)
add_executable(MyProject main.cpp)
target_link_libraries(MyProject MyLibrary)
```

**mylib/CMakeLists.txt:**
```cmake
add_library(MyLibrary STATIC mylib.cpp)
```

### 7. 使用外部库

**查找和使用外部库:**
```cmake
find_package(OpenCV REQUIRED)
if(OpenCV_FOUND)
    include_directories(${OpenCV_INCLUDE_DIRS})
    target_link_libraries(MyProject ${OpenCV_LIBS})
endif()
```

### 8. 高级主题

**自定义命令和目标:**
```cmake
add_custom_command(
    OUTPUT ${CMAKE_BINARY_DIR}/generated_file.h
    COMMAND some_generator_command
    DEPENDS some_input_file
)
add_custom_target(generate ALL DEPENDS ${CMAKE_BINARY_DIR}/generated_file.h)
```

**生成器表达式:**
```cmake
target_compile_options(MyProject PRIVATE $<$<COMPILE_LANGUAGE:CXX>: -std=c++11>)
```

**交叉编译:**
- 设置工具链文件（toolchain file）来指定编译器和目标平台。

### 9. 参考资料

- [CMake 官方文档](https://cmake.org/documentation/)
- 《CMake Tutorial》（CMake 官方教程）
- 《Mastering CMake》 by Ken Martin and Bill Hoffman

### 10. 练习项目

1. **简单项目:** 创建一个包含多个源文件和头文件的项目，并使用 CMake 进行编译。
2. **使用外部库:** 尝试在项目中引入并使用一个外部库，如 Boost 或 OpenSSL。
3. **多子目录项目:** 创建一个包含多个子目录的项目，每个子目录都有自己的 `CMakeLists.txt`。

通过以上步骤，你将能够逐步掌握 CMake 的使用，并能够应用它来管理复杂的项目构建过程。祝你学习愉快！


# 示范 cmake 的 while 语法

## https://chat.DeepSeek.com 联网搜索模式：

在 CMake 中，`while` 循环用于重复执行一段代码，直到某个条件不再满足。`while` 循环的语法与其他编程语言类似，但 CMake 的语法更简洁。

### CMake 的 `while` 语法

```cmake
while(<condition>)
    # 循环体
endwhile()
```

- `<condition>` 是一个布尔表达式，如果为真，循环体将继续执行。
- 循环体中可以包含任意有效的 CMake 命令。
- `endwhile()` 用于标记循环的结束。

---

### 示例 1：简单的 `while` 循环

以下是一个简单的 `while` 循环示例，它会打印数字 1 到 5：

```cmake
cmake_minimum_required(VERSION 3.10)
project(WhileLoopExample)

set(i 1)  # 初始化变量 i

while(i LESS 6)  # 当 i 小于 6 时循环
    message("i = ${i}")  # 打印当前 i 的值
    math(EXPR i "${i} + 1")  # i 自增 1
endwhile()
```

**输出：**
```
i = 1
i = 2
i = 3
i = 4
i = 5
```

---

### 示例 2：遍历列表

CMake 的 `while` 循环可以结合 `list` 命令来遍历列表。以下示例展示了如何遍历一个列表并打印每个元素：

```cmake
cmake_minimum_required(VERSION 3.10)
project(WhileLoopListExample)

set(my_list "apple" "banana" "cherry")  # 定义一个列表
list(LENGTH my_list list_length)  # 获取列表长度
set(index 0)  # 初始化索引

while(index LESS list_length)  # 当索引小于列表长度时循环
    list(GET my_list ${index} item)  # 获取当前索引对应的元素
    message("Item ${index}: ${item}")  # 打印元素
    math(EXPR index "${index} + 1")  # 索引自增 1
endwhile()
```

**输出：**
```
Item 0: apple
Item 1: banana
Item 2: cherry
```

---

### 示例 3：条件控制

`while` 循环可以与条件语句结合使用，实现更复杂的逻辑。以下示例展示了如何在循环中使用条件判断：

```cmake
cmake_minimum_required(VERSION 3.10)
project(WhileLoopConditionExample)

set(i 1)

while(i LESS 10)
    if(i EQUAL 5)
        message("i is 5, breaking the loop")
        break()  # 退出循环
    elseif(i EQUAL 3)
        message("i is 3, skipping this iteration")
        math(EXPR i "${i} + 1")
        continue()  # 跳过当前迭代
    endif()
    message("i = ${i}")
    math(EXPR i "${i} + 1")
endwhile()
```

**输出：**
```
i = 1
i = 2
i is 3, skipping this iteration
i = 4
i is 5, breaking the loop
```

---

### 示例 4：无限循环

`while` 循环可以用于实现无限循环，但需要小心使用，避免死循环。以下是一个无限循环的示例，通过条件判断退出循环：

```cmake
cmake_minimum_required(VERSION 3.10)
project(WhileLoopInfiniteExample)

set(i 0)

while(TRUE)  # 无限循环
    message("i = ${i}")
    math(EXPR i "${i} + 1")
    if(i GREATER 5)
        message("Exiting loop")
        break()  # 退出循环
    endif()
endwhile()
```

**输出：**
```
i = 0
i = 1
i = 2
i = 3
i = 4
i = 5
Exiting loop
```

---

### 注意事项

1. **避免死循环：** 确保 `while` 循环的条件最终会变为假，否则会导致死循环。
2. **变量作用域：** 在 `while` 循环中定义的变量只在循环体内有效。
3. **性能问题：** 如果循环体中的操作非常耗时，可能会影响 CMake 的配置速度。

---

通过以上示例，你应该能够掌握 CMake 的 `while` 循环语法，并能够在实际项目中灵活运用。如果有任何问题，欢迎随时提问！