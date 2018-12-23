# 深入浅出 Nodejs

Node 的诞生条件：V8 的高性能和异步 I/O 模型

结构如下

第二章是从代码组织结构看待 Node，第三章是从运行结构看 Node，第四章则是从编程结构看 Node，第五章则是 Node 中内存结构的揭示，第六章谈及的是 Node 中的数据在 I/O 流中的结构或状态，第七章是 Node 在网络服务角度的介绍，第八章 是 Node 在 HTTP 上面的展现，第九章讨论了 Node 的单机集群结构，第十章是从单元测试和性能测试的角度去关注 Node，第 11 章虽然已经脱离了 Node 编码的范畴，但是站在产品化的角度看待 Node。

第一章：简要介绍了 Node 的发展历程及其影响和价值

第二章：介绍了 Node 的模块机制，从中可以了解到 Node 是如何是实现 CommonJS 模块化和包规范的。详细解释了模块在引用过程中的编译、加载规则。另外还能读到更深度的关于 Node 自身源代码的组织架构。

第三章：这一章展示了 Node 中我们将异步 I/O 最为主要涉及理念的原因，还会介绍异步 I/O 的详细实现过程

第四章：这一章主要介绍异步编程，其中有常见的异步编程问题介绍，也有详细的解决方案。在这一章可以接触到 Promise、事件、高阶函数是如何进行流程控制的。

第五章：主要介绍了 Node 中的内存控制，主要有垃圾回收、内存限制、查看内存、内存泄露、大内存应用等细节。

第六章：这一章介绍了前端中遇不到的 Buffer。由于 Node 中会设计频繁的网络和磁盘 I/O，处理字节流数据会是很常见的行为

第七章：介绍了 Node 支持的 TCP、UDP、HTTP 编程。

第八章：介绍了构建 web 应用的过程中用到的大多数技术细节，如数据处理、路由、MVC、模板、RESTful 等

第九章：介绍了 Node 的多进程技术，以及如何借助多进程的方式提升应用的可用性和性能。

第十章：介绍了 Node 的单元测试和性能测试技巧。

第十一章：介绍了将 Node 铲平华所需要注意到的谢姐，如项目工程化、代码部署、日志、性能、监控报警、稳定性、异构共存等。

[TOC]

## 第 1 章 Node 简介

### 1.1 Node 的命名和起源

* 为什么是 JavaScript

  V8 的高性能，符合事件驱动，没有历史包袱

* 为什么叫 Node

  它为构建大型分布式应用程序提供基础设施，其目标也是成为一个构建快速，可伸缩的网络应用平台。它自身非常简单，通过通信协议来组织许多 Node，非常容易通过扩展来达成构建大型网络应用的目的。每一个 Node 进程都构成这个网络应用中的一个节点，这是它名字的真实含义。

### 1.2 Node 的特点

* 异步 I/O

* 事件与回调函数

* 单线程

  * 优点：没有死锁的存在，不用像多线程编程那样在意状态的同步问题，也没有线程上下文交换带来的性能上的开销

  * 缺点

    * 无法利用多核 CPU
    * 错误会引起整个应用退出，应用的健壮性值的考验
    * 大量计算占用 CPU 导致无法继续调用异步 I/O

  * 解决方法

    child_process 子进程（与 Web Workers 相同的思路	）

* 跨平台

  在操作系统与 Node 上层模块系统之间构建了一层平台层架构，即 libuv，现已成为许多系统实现跨平台的基础组件

### 1.3 Node 的应用场景

* I/O 密集型

  Node 面向网络并且擅长并行 I/O，能有效地组织起更多的硬件资源

  主要优势在于 Node 利用事件循环的处理能力，而不是启动每一个线程为每一个请求服务，资源占用极少

* 是否不擅长 CPU 密集型业务

  是，但是有两种方式来充分利用 CPU

  * 可以通过编写 C/C++ 扩展的方式更高效的利用 CPU
  * 通过子进程的方式
  * 分布式应用 



## 第 2 章 模块机制

### 2.1 CommonJS 规范

#### 2.1.1 CommonJS 的模块规范

CommonJS 对模块的定义十分简单，主要分为模块引用、模块定义和模块标识 3 个部分。

##### 1. 模块引用

```JavaScript
var math = require('./math') // 可以不加后缀，默认以 .js .json .json 的顺序解析
```

##### 2. 模块定义

module.exports 用于导出当前模块的方法或变量，是唯一的导出口。在模块中，还存在一个 exports 对象，它是 module.exports 的一个引用。

```JavaScript
// math.js
exports.add = function(){
    var sum = 0, i = 0, args = arguments, l = args.length;
    while(i < l){
        sum += args[i++]
    }
    return sum
}

// program.js
var math = require('./math');
exports.increment = function(val){
    return math.add(val,1);
}
```

##### 3. 模块标识

CommonJS 构建的这套模块导出导入机制使得用户完全不用考虑变量污染。命名空间等方案与之相比相形见绌。



### 2.2 Node 的模块实现

Node 在实现中并非完全按照规范实现，而是进行了取舍，并新增了少许自身需要的特性。

在 Node 中引入模块要经历如下步骤

* 路径分析
* 文件定位
* 编译执行

在 Node 中，模块分为 Node 提供的核心模块及用户编写的文件模块

* 核心模块在 Node 源码编译过程中，编译进了二进制执行文件。在 Node 进程启动时，**部分**核心模块直接加载进内存中，所以**这部分**核心模块引入时省略后两个步骤，并且在路径分析中优先判断，所以加载速度最快
* 文件模块是在运行时加载，需要经历完整步骤，所以速度相对较慢

接下来展开详细的模块加载过程

#### 2.2.1 优先从缓存加载

为了提高性能，Node 对引用过的模块都会进行缓存，以减少二次引入时的开销。它缓存的是编译和执行过后的对象。

不论核心模块还是文件模块，require 方法对相同模块的二次加载一律采用缓存优先方式，这是**第一优先级**的，不同之处在于核心模块缓存检查优先于文件模块缓存检查。

```JavaScript
// a.js
exports.a = 1;

// b.js
const a = require('./a') // 0.03 ms
const b = require('./a') // 0.001 ms
```

#### 2.2.2 路径分析和文件定位

##### 1. 模块标识符解析

require() 方法接受一个标识符作为参数。标识符主要分为以下几类

* 核心模块，如 http、fs、path 等
* . 或 .. 开始的相对路径文件模块
* 以 / 开始的绝对路径文件模块
* 非路径形式的文件模块，如自定义的 connect 模块

1. 核心模块

   加载速度仅次于缓存加载，它在源代码编译过程中已经编译成二进制代码（因为上面只是部分核心代码直接加载进内存）

   如果试图加载一个和核心模块标识符相同的自定义模块是不会成功的。除非选择不同的标识符或者更换路径

2. 路径形式的文件模块

   将相对路径转换为真实路径，将真实路径作为索引，并将编译执行结果放入缓存，以使二次加载更快，速度稍慢于核心模块加载

3. 自定义模块

   指非核心模块，也不是路径形式的标识符。是一种特殊的文件模块

   **模块路径**：Node 在定位文件模块的具体文件时指定的查找策略，具体表现为一个路径组成的数组，可以通过 module.paths 访问，结果如下

   ```javascript
   ['c:\\nodejs\\node_modules' , 'c:\\node_modules']
   ```

   规则如下：

   * 当前文件目录下的 node_modules 目录
   * 父目录下的 node_modules 目录
   * 父目录的父目录下的 node_modules 目录
   * 逐级递归

   因此，当前文件路径越深，模块查找耗时越多，这是自定义模块加载速度最慢的原因

##### 2. 文件定位

从缓存加载的优化策略使得二次引入不需要路径分析，文件定位及编译过程，提高了再次加载时效率

在分析标识符的过程中，require 通过分析文件扩展名之后可能没有查找到对应文件，但得到一个目录，这时 Node 会将这个目录当做一个包处理。

首先在目录下查找 package.json 文件，通过 JSON.parse() 解析出包描述对象，从中取出 main 属性指定的文件名进行定位。如果缺少扩展名，则进入扩展名分析步骤

而如果 main 属性指定文件名错误或者根本没有 package.json 文件，Node 会将 index 当做默认文件名，然后依次查找 index.js、index.json、index.node

如果没有定位成功任何文件，则自定义模块进入下一个模块路径进行查找。如果模块路径数组遍历完找不到，则抛出异常

#### 2.2.3 模块编译

在 Node 中，每个模块都是一个对象，定义如下

```JavaScript
function Module(id, parent){
    this.id = id;
    this.exports = {};
    this.parent = parent;
    if(parent && parent.children){
        parent.children.push(this)
    }
    this.filename = null;
    this.loaded = false;
    this.children = [];
}
```

编译和执行是引入文件模块的最后一个阶段。定位到具体文件后，Node 会新建一个模块对象，然后根据路径载入并编译，对不同的文件载入方法有所不同，具体如下

* .js 文件。通过 fs 模块同步读取文件后编译执行
* .node 文件。这是用 c/c++ 编写的扩展文件，通过 dlopen() 方法加载最后编译生成的文件
* .json 文件。通过 JSON.parse() 解析返回结果
* 其余文件。被当做 js 文件载入

每一次编译成功的模块都会将其文件路径作为索引缓存在 Module._cache 对象上，以提高二次载入的性能

根据不同扩展名，Node 会采用不同读取方式，例如 .json 文件的调用如下

```JavaScript
// Native extension for .json
Module._extension['.json'] = function(module filename) {
	var content = NativeModule.require('fs').readFileSync(filename, 'utf8');
	try{
		module.exports = JSON.parse(stripBOM(content));
	}catch(err){
		err.message = filename + ': ' + err.message;
		throw err
	}
}
```

其中，Module._extension 会被赋值给 require 的 extension 属性，所以可以通过它来知道系统中已有的扩展加载方式

```JavaScript
console.log(require.extension)
/* 
{ 
	'.js': [Function],
  	'.json': [Function],
    '.node': [Function]
}
*/
```

如果想对自定义的扩展名进行特殊的加载，可以通过 require.extension['.special'] 的方式实现，但是不鼓励。希望能将其他语言转换成 JavaScript 文件后在进行加载，这样将烦琐的编译加载等过程省略了

> 为什么有了 exports 还需要 module.exports 
>
> 假设我们需要暴露一个类
>
> ```JavaScript
> // a.js
> exoprts = function(val){
>     this.val = val
> }
> ```
>
> 这个时候 exports 的引用已经不是 module.exports 了
>
> 如果要达到 require 引入一个类的效果，请赋值给 module.exports 对象。
>
> ```JavaScript
> // a.js
> module.exports = function(val){
>     this.val = val
> }
> 
> // b.js
> const a = require('./a')
> var b = new a(10)
> 
> ```



##### 2. .JSON 文件的编译

.json 文件的编译是最简单的，它将 JSON.parse() 之后的内容赋值给 exports，以供外部调用

在用作项目的配置文件时比较有用，如果定义了一个 JSON 文件作为配置，那就不用调用 fs 模块去异步读取和解析，直接用 require() 引用即可。还可以享受模块缓存的便利。

这里提的模块编译都是用户自己写的，后面将展开介绍核心模块中的 JavaScript 模块和 c/c++ 模块