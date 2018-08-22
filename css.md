### HTML 元素

按默认样式分类

* 块级 block：独占一行 div p 
* 行内 inline：不一定有规则形状 span em
* inline-block：对外表现成 inline，对内表现成 block，有 select，input

#### 1.1 元素嵌套关系

* 块级元素可以包含行内元素
* 块级元素不一定能包含块级元素 比如 p 不能包含 div
* 行内元素**一般**不能包含块级元素，例外：a 可以包含 div。比如悬浮广告

#### 1.2 元素默认样式

* css Reset
* *{marin:0;padding:0}

#### 1.3 面试真题

* doctype 的意义是什么
  * 让浏览器以标准模式渲染
  * 让浏览器知道元素的合法性
* HTML 5 

### 2 CSS 基础

非布局样式

* 字体、字重、颜色、大小、行高
* 背景、边框
* 滚动、换行
* 粗体、斜体、下划线
* 其他

#### 2.1 字体 

##### 2.1.1 字体族（font-family）

serif（衬线字体）sans-serif（非衬线字体）monospace（等宽字体）cursive（手写体）fantasy（花体）

字体族不能加引号，具体的字体可以加引号

##### 2.1.2 多字体 fallback

指定多个字体前面的找不到一直往后找，每个字符都会找，只要前面能生效就用前面的字体

##### 2.1.3 iconfont

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

####2.2 行高

##### 2.2.1 行高的构成（line-height）

行高不一样，渲染高度一样。line-height 是垂直居中的，可以通过设置这个属性来实现垂直居中

行高会撑起外面的高度

##### 2.2.2 行高相关的现象和方案

如果图片下面有空隙怎么办

img 相当于 inline 元素，默认按照 base-line 对齐，base-line 和底线有偏差。可以用 vertical-align：bottom

或者 display：block

#### 2.3 背景

* 背景颜色
* 渐变色背景
* 多背景叠加
* 背景图片和属性，雪碧图
* base64 和性能优化
* 多分辨率适配

#####2.3.1 渐变色背景

```css
background: linear-gradient(to right,red,green);
```

##### 2.3.2 多背景叠加

利用 background 做渐变

#####2.3.3 背景属性和雪碧图

```css
background-repeat:no-repeat|repeat-x;
background-position:center center;
background-size:100px 50px;
background:url(./a.jpg)
/* 雪碧图使用 background-position:-34px -17px */
```

##### 2.3.4 base64

base64 转换工具。

节省 http 请求数，但会增大图片体积 1/3，还有 css 文件也会增大，增大了解码的开销

用在小图标，比如 loading 图

#### 2.4 边框

* 边框的属性：线型，大小，颜色
* 边框背景图
* 边框衔接（三角形）

##### 2.4.1 边框衔接

怎么做一个三角形

可以用边框衔接来做，原理边框的连接部分采用的是斜切，所以可以另 div 的 width 为 0;

#### 2.5 滚动

* 滚动行为和滚动条

  overflow

  * visible：内容会撑出去
  * hidden：滚动条隐藏
  * scroll：滚动条始终显示
  * auto：不用滚动条就不显示

##### 2.6 文字折行

* overflow-wrap 通用换行控制
* word-break 针对多字节文字，尽量让单词字母
* white-space 空白处是否断行

```css
overflow-wrap:normal
word-break:normal | break-word(折行)|break-all(不把单词当做一个单位)
white-space:normal | no-wrap(文本不换行)
```

#### 2.4 装饰属性

* 字重 font-weight
* 斜体 font-style：itatic
* 下划线：text-decoration：none（让链接的下划线消失）
* 指针 cursor：point（手型）

#### 2.5 CSS 面试真题

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













