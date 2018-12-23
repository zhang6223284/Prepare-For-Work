[TOC]

### CSS 权威指南



##### 第 1 章 CSS 和文档

约定：

```css
Value: [ <length> | thick | thin ]{1,4}
Value: [ <family-name>,]* <family-name>
Value: <url>?<color>[/<color>]?
Value: <url> || <color>
```

`<` 和 `>` 之间的词给出了某种值的类型，或者是对另一个属性的引用。例如，属性 font 将接受具体属于 font-family 属性的值，由文本 `<font-family>` 标示。斜线（/）和逗号（,）也必须原样使用

如果候选项由一个竖线分隔（X|Y），那么**必须出现**其中之一。双竖线（X||Y）标示出现 X 或 Y，或者两个都必须出现（但是必须以先 X 后 Y 的顺序出现）。中括号（[ ]）用于分组。两项并列优先级要高于双竖线。所以，

`V W | X || Y Z` 等价于 `[ V W ] | [ X || [ Y Z ]]`

每个单词或加中括号的分组后面可以跟有以下修饰符之一：

* 星号（*）表示前面的值或分组重复 0 次或多次
* 加号（+）表示前面的值或分组重复 1 次或多次
* 问号（？）表示前面的值或分组是可选的
* 大括号里的一对数（{ M,N }）表示前面的值或分组至少重复 M 次，最多 N 次

以下是一些例子

```css
give || me || liberty
/*
	至少使用这三个词中的一个，而且可以任何顺序使用
*/

[ I | am ]? the || walrus
/*
	可以使用单词 I 或 am,但不能两者都使用，而且是否使用其中之一也是可选的。此外，必须跟有 the 或 		walrus，或者两者都有，其顺序不限
*/

```



* 元素
  * 替换元素：指用来替换元素内容的部分并非文档内容直接表示，如 `img` 元素
  * 非替换元素：大多数元素都是非替换元素，如 `span` 等
  * 块级元素：块级元素生成一个元素框，会填充其父元素的内容区，旁边不能有其他元素。比如 p 和 div
  * 行内元素：行内元素在一个文本行内生成元素框，而不会打断这行文本。比如 a 元素



##### 第 2 章 选择器

* 规则结构

  ```css
  /* 选择器：{声明块} */
  /* 
  	声明块由一个或多个声明组成，每个声明是一个 css 属性和该属性值的组合。这个声明块包含两个声明，声	  明由属性和值组成 
  */
  h1 {color: red;background: yellow;}
  ```

* 元素选择器

  文档的元素是最基本的选择则其，如：p，h3，em，a，甚至可以是 html 本身

  ```css
  html{color: black;}
  h1{color: gray;}
  h2{color: silver;}
  ```

* 声明和关键字

  如果声明中使用了不正确的属性或者不正确的值，整个声明都会被忽略。如果一个声明可以接受多个关键字，在这种情况下，关键字通常由空格分隔。

  ```css
  p{font: medium Helvetica;}
  ```

* 选择器分组

  假设希望 h2 元素和段落都有灰色文本。可以使用以下声明

  ```css
  h2,p {color: gray;}
  ```

  逗号告诉浏览器规则中包含两个不同的选择器。

  可以将任意多个选择器分组在一起，对此没有任何限制。

  通配选择器：显示为一个星号（*），如要让一个文档中的每一个元素都为红色，可以写为以下规则

  ```css
  * {color: red;}
  ```

* 类选择器和 ID 选择器

  * 类选择器

    ```css
    /* 其 class 属性包含词 warning 的所有段落 */
    p.warning {font-weight: bold;}
    ```

  * 多类选择器

    ```CSS
    /* 把两个类选择器链接在一起，仅可以选择同时包含这些类名的元素（类名的顺序不限）*/
    /* class 同时 包含 warning 和 urgent 的所有元素 */
    .warning.urgent {background: silver;}
    /* class 同时 包含 warning 和 urgent 的 p 元素 */
    p.warning.urgent {background: silver;}
    ```

  * ID 选择器

    ```css
    #first-para {font-weight: bold}
    ```

    区别：不同于类选择器，ID 选择器不能结合使用，因为 ID 属性不允许有以空格分隔的词列表

  * 属性选择器

    ```css
    /* 选取带有某个属性的元素，不管该元素的值 */
    h1[class] {color: silver;}
    /* 选取带有 alt 属性的 img 元素 */
    img[alt] {border: 3px solid red;}
    /* 选取带有 title 的所有元素 */
    *[title] {font-weight: bold;}
    /* 选取同时带有 href 和 title 的 a 元素 */
    a[href][title] {font-weight: bold;}
    
    /* 根据具体属性值选择元素 这种模式需要完全匹配 即如果类名有好几个，则都需要写上*/
    a[href="www.baidu.com"][title="my"] {font-size: 200%;}
    
    /* 部分匹配 关键字 ~ 选取带有这个值的属性 */
    p[class~="warning"] {font-weight: bold}
    ```

    | 类型         | 描述                                   |
    | ------------ | -------------------------------------- |
    | [foo^=“bar”] | 选择 foo 属性值以 bar 开头的所有元素   |
    | [foo$=“bar”] | 选择 foo 属性值以 bar 结尾的所有元素   |
    | [foo*=“bar”] | 选择 foo 属性值包含子串 bar 的所有元素 |

  * 后代选择器

    ```css
    /* 选择作为 h1 后代的 em 元素 以空格分隔父子元素 */
    /* 缺点就是只要是 h1 后代的 em 元素，不管嵌套多深都会变 */
    h1 em {color: grey;} 
    
    /* 选择子元素 */
    /* 只选择作为 h1 的子元素的 p 元素，不选择后代的元素 */
    h1 > p {color: red;}
    
    /* 相邻兄弟元素 */
    /* 选择紧跟着 h1 元素的 p 元素 */
    h1 + p {margin-top: 0;}
    ```

  * 伪类和伪元素

    ```css
    /* 已经访问过的 a 元素 */
    a:visited {color: red;}
    /* 未访问的地址 */
    a:link {color: black;}
    
    /* 使页面中所有未访问的锚都是紫色，已访问的都是银色，在 body 里面这么做 */
    <body link="purplr" v-link="silver">
    
    /* 当前拥有焦点的元素 */
    a:focus {}
    /* 鼠标停留的元素 */
    a:hover {}
    /* 处于被用户激活的元素 */
    a:active {}
    
    /* 伪类的顺序很重要，通常是 link—>visited->focus->hover->active */
    
    /* 第一个子元素 */
    p:first-child {}
    
    /* 伪元素选择器 */
    /* p 元素第一个字母 */
    p:first-letter {}
    /* p 第一行 */
    p:first-line　{}
    /* 限制：这两个伪元素只能用于标记或段落之类的块级元素，不能用于超链接等行内元素，而且属性也有所限制 */
    
    /* 设置之前和之后的样式 */
    /* 在 h2 元素之前插入文本 }} */
    h2::before {context: "}}"; color: silver;}
    /* 在 body 元素之后插入文本 */
    body::after {context:" The End. ";}
    ```


##### 第 3 章 结构和层叠

层叠：通过继承和声明的特殊性来确认一个元素应用哪些值的过程叫做层叠

###### 3.1 特殊性

* 内联样式，加 1，0，0，0
* 对于选择器中给定的各个 ID 属性值，加 0，1，0，0
* 类，属性或伪类，加 0，0，1，0
* 元素和伪元素，加 0，0，0，1
* 结合符和通配符没有任何贡献
* !important 总会胜出

例如

```css
h1 {} /* special = 0001  */
p em {} /* special = 0002 */
.grape {} /* special = 0010 */
*.bright {} /* special = 0010 */
p.bright em.dark{} /* special = 0022 */
#id216 {} /* special = 0100 */
div#sidebar *[href] {} /* special = 0111 */
```

###### 3.2 继承

有些属性不能继承，如 border，大多数框模型属性（包括内外边距，背景和边框）都不能继承。

继承的值没有特殊性。

###### 3.3 层叠

* 按显式权重对应用到该元素的所有声明排序
* 按特殊性对应到给定元素的所有声明排序。
* 越后出现，权重就越大。

##### 第 5 章 字体

###### 5.1 字体加粗

font-weight：初始值 normal，有继承性，计算值：数字值，或数字值加上某个相对数（bolder 或 lighter）

值：normal | bold（粗体） | bolder（比继承的字体更粗一级的字体） | lighter | inherit | 100 | 200 | 300 | 400（normal） | 500 | 600 | 700（bold） | 800 | 900

###### 5.2字体大小

font-size：初始值 medium，有继承性，百分数：根据父元素的字体大小来计算，计算值：绝对长度

值：xx-small | x-small | small | medium | large | x-large





