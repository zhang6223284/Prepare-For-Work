[TOC]

### 1. HTML

#### 1.1 常见元素

- `<meta charset="utf-8">`
- `<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalabe="no"">` 适配移动端。指定视口宽度等于屏幕宽度。
- `<base href="/">` 基础路径

#### 1.2 HTML 新增内容

- 表单增强，表单验证，required 必填项等
- nav 导航
- header / footer 头尾
- aside 不重要内容
- em / strong 强调
- section / article 区域
- i icon 图标

#### 1.3 HTML 元素分类

按默认样式分类

- 块级 block：独占一行 div p 
- 行内 inline：不一定有规则形状 span em
- inline-block：对外表现成 inline，对内表现成 block，有 select，input

#####1.3.1 元素嵌套关系

- 块级元素可以包含行内元素
- 块级元素不一定能包含块级元素 比如 p 不能包含 div
- 行内元素**一般**不能包含块级元素，例外：a 可以包含 div。比如悬浮广告

#### 1.4 HTML 元素默认样式

- CSS Reset 或者 `*{ margin:0;padding:0}`

#### 1.5 真题

* doctype 的意义是什么
  - 让浏览器以标准模式渲染
  - 让浏览器知道元素的合法性

- HTML5 有什么变化
  - 新的语义化元素
  - 表单增强
  - 新的 API （离线，音视频，websocket，本地存储，设备能力）
- 语义化的意义是什么
  - 开发者容易理解
  - 机器容易理解结构（搜索，读屏软件）
  - 有利于 SEO
- 哪些元素可以自闭合
  - 表单元素
  - img
  - br
- HTML 和 DOM 的关系
  - HTML 是死的，只是一段字符串
  - DOM 由 HTML 解析来的，是活的
  - JS 可以维护 DOM
- property 和 attribute 的区别
  - attribute 是死的
  - property 是活的
- form 的作用有哪些
  - 直接提交表单
  - 使用 submit
  - 便于浏览器保存表单
  - 使用第三方库可以整体提取值

### 2. CSS 基础

#### 2.1 选择器的分类和权重

- 元素选择器 `a{}`
- 伪元素选择器 `::before{}`
- 类选择器 `.link{}`
- 属性选择器 `[type=radio]{}`
- 伪类选择器 `:hover{}`
- ID 选择器 `#id{}`
- 组合选择器 `[type=checkbox] + label{}`
- 否定选择器 `:not(.link){}`
- 通用选择器 `*{}`

#### 2.2 浏览器 CSS 的解析方式

从右往左解析，因为性能，从右往左找的元素比从左往右的少，可以更快速的确定哪些元素不是

非布局样式

* 字体、字重、颜色、大小、行高
* 背景、边框
* 滚动、换行
* 粗体、斜体、下划线
* 其他

#### 2.3 字体 

##### 2.3.1 字体族（font-family）

serif（衬线字体）sans-serif（非衬线字体）monospace（等宽字体）cursive（手写体）fantasy（花体）

字体族不能加引号，具体的字体可以加引号

##### 2.3.2 多字体 fallback

指定多个字体前面的找不到一直往后找，每个字符都会找，只要前面能生效就用前面的字体

##### 2.3.3 iconfont

原理：自定义字体，阿里巴巴的 icon

```css
/* 自定义字体 */
@font-face{
    font-family:'IF';
    src:url("./IndieFlower.ttf")      
}

div {
    font-family:IF
}
```

####2.4 行高

##### 2.4.1 行高的构成（line-height）

行高不一样，渲染高度一样。line-height 是垂直居中的，可以通过设置这个属性来实现垂直居中

行高会撑起外面的高度

##### 2.4.2 行高相关的现象和方案

如果图片下面有空隙怎么办

img 相当于 inline 元素，默认按照 base-line 对齐，base-line 和底线有偏差。可以用 vertical-align：bottom

或者 display：block

#### 2.5 背景

* 背景颜色
* 渐变色背景
* 多背景叠加
* 背景图片和属性，雪碧图
* base64 和性能优化
* 多分辨率适配

#####2.5.1 渐变色背景

```css
background: linear-gradient(to right,red,green);
```

##### 2.5.2 多背景叠加

利用 background 做渐变

#####2.5.3 背景属性和雪碧图

```css
background-repeat:no-repeat|repeat-x;
background-position:center center;
background-size:100px 50px;
background:url(./a.jpg)
/* 雪碧图使用 background-position:-34px -17px */
```

##### 2.5.4 base64

base64 转换工具。

节省 http 请求数，但会增大图片体积 1/3，还有 css 文件也会增大，增大了解码的开销

用在小图标，比如 loading 图

#### 2.6 边框

* 边框的属性：线型，大小，颜色
* 边框背景图
* 边框衔接（三角形）

##### 2.6.1 边框衔接

怎么做一个三角形

可以用边框衔接来做，原理边框的连接部分采用的是斜切，所以可以另 div 的 width 为 0;

#####2.6.2 滚动

* 滚动行为和滚动条

  overflow

  * visible：内容会撑出去
  * hidden：滚动条隐藏
  * scroll：滚动条始终显示
  * auto：不用滚动条就不显示

##### 2.6.3 文字折行

* overflow-wrap 通用换行控制
* word-break 针对多字节文字，尽量让单词字母
* white-space 空白处是否断行

```css
overflow-wrap:normal
word-break:normal | break-word(折行)|break-all(不把单词当做一个单位)
white-space:normal | no-wrap(文本不换行)
```

#### 2.7 装饰属性

* 字重 font-weight
* 斜体 font-style：itatic
* 下划线：text-decoration：none（让链接的下划线消失）
* 指针 cursor：point（手型）

#### 2.8 CSS 面试真题

* CSS 样式的优先级
  * 计算权重
  * ！important 最高
  * 内联样式高
  * 后写的优先级高
* 雪碧图的作用
  * 减少 http 请求数，提高加载性能
* 自定义字体的使用场景
  * 字体图标
* base64 的使用
  * 减少 http 请求
  * 适用于小图片
  * 体积约为原图 4/3
* 伪类和伪元素的区别
  * 伪类表示一种状态
  * 伪元素是真的有元素
  * 前者单冒号，后者双冒号

### 4. CSS 布局

- CSS 知识体系中的重中之重
- 早期以 table 为主（简单）
- 后来以技巧性布局为主（难）
- 现在有 flex/grid（偏简单）
- 响应式布局是必备知识

常用的布局方法

- table 表格布局
- float 浮动 + margin
- inline-block 布局
- flexbox 布局

#### 4.1 盒模型

> 最中间显示内容的区域 content，设置宽度和高度就是设置的这部分
>
> 内容区外面是 padding 区，指内容区到边框的区域
>
> 接着是 border 区，本身也是占据空间的
>
> 边框外面的是 margin 区，离别的区域的地方 
>
> 宽度和高度是内容区的宽度和高度
>
> 计算一个盒子占用的空间是内容 + padding + border

> display / position
>
> - 确定元素的显示类型
>   - display：block（有固定宽高，独占一行）|inline（同一行，不能设置宽高）|inline-block
> - position 用来确定元素的位置
>   - static（默认情况，按照文档流）|relative（相对本身原来位置偏移，不会改变布局的计算）|absolute（绝对定位，脱离文档流，不会对别的元素造成影响，相对于父级最近的 relative 或者 absolute ）|fixed（脱离文档流，相对于屏幕（可视区域））
> - 默认情况按顺序层叠，可以通过设置 z-index 来改变层叠顺序，定义为 relative，absolute，fix 的可以设置 z-index。

#### 4.2 flexbox 布局

- 弹性盒子
- 盒子本来就是并列的
- 指定宽度即可 （父元素 dispaly：flex，子元素 flex：1，固定宽度：width：50px；flex：none） 
- 兼容性不是太好

#### 4.2 float 布局

- 元素 “浮动”
- 脱离文档流
- 但不脱离文本流（意思就是文本环绕）

float 的影响

- 对自身的影响

  - float 可以形成块，让行内元素拥有宽高，因为变成了一个块
  - 位置尽量靠上
  - 位置尽量靠左（右）如果那一行满足不了宽度要求会往下掉

- 对兄弟的影响：

  - 上面贴非 float 元素
  - 旁边贴 float 元素
  - 不影响其他块级元素位置
  - 影响其他元素文本

- 对父级元素影响

  - 从布局上 “消失”

  - 高度塌陷

    - 父元素加一个 overflow：hidden

    - 第二种（清除浮动）

      ```css
      /* 给父元素加一个类 */
      .container::after{
          content:'';
          clear:both;
          display:block;
          visibility:hidden;
          height:0; 
      }
      ```

- 两栏布局

  - 左边 float，右边的 margin - left 等于浮动的宽度

- 三栏布局

  - float：left，float：right。中间空出 margin-left，margin-right 分别等于左右两边的宽度，但是中间部分要写在后面

#### 4.3 inline-block 布局

- 像文本一样排 block 元素（display：inline-block）
- 没有清除浮动等问题
- 需要处理间隙（父元素的 font-size：0，子元素单独设置 font-size ）

#### 4.4 响应式设计和布局

- 在不同设备上正常使用

- 一般要处理屏幕大小问题

- 主要方法：

  - 隐藏 + 折行 + 自适应空间

  - rem | viewport | media query

    ```css
    /* 对于组大宽度小于 640 的屏幕 */
    @meida(max-width:640px){
        /* 写css */
    }
    /* 将范围大的放在上面，范围小的放在下面 */
    ```

  - 折行：原本一行可以在 media query 里面的设置成 block，每个占一行

  - viewport

    ```css
    <meta content = "width = device-width">
    ```

  - 使用 rem 单位：html font-size默认是 16px，代表一个 rem，即 rem 代表 1 个 html 的 font-size

####4.5 CSS 面试真题

- 实现两栏（三栏）布局的方法

  1. 表格布局
  2. float + margin
  3. inline-block
  4. flexbox 布局

- position：absolute / fixed 有什么区别

  - 前者相对 absolute 和 relative
  - 后者相对于屏幕（viewport）

- display ：inline-block 的间隙

  - 原因：字符间距
  - 解决：消灭字符 或者 消灭间距

- 如何清除浮动

  - 原因：浮动的元素不会占据父元素的布局空间
  - 方法：让盒子负责自己的布局
  - overflow：hidden（auto）
  - ：：after{clear：both}

- 如何适配移动端页面

  - viewport
  - rem/viewport/media query
  - 设计上：隐藏 折行 自适应












