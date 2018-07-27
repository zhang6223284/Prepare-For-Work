[TOC]

### 你不知道的 Javascript



####第一部分 作用域和闭包



#####第一章 作用域是什么

* 引擎

  从头到尾负责整个 Javascript 程序的编译及执行过程。

* 编译器

  负责语法分析及代码生成等。

* 作用域

  负责收集并维护所有生命的标识符（变量）组成的一系列查询，并确定当前执行代码对他们的

  访问权限。

* 以  `var a = 2 ` 举列

  1. 首先，编译器会查找当前作用域是否已存在该名称的变量。如果是，编译器会忽略该声明。

     否则，它会在当前作用域的集合中声明一个新的变量，命名为 `a`。

  2. 接下来编译器为引擎生成运行时所需要的代码，用来处理 `a = 2` 这个赋值操作。引擎运行

     时会询问当前作用域集合是否存在 `a` 变量。如果是，引擎会使用这个变量，如果不是，引

     擎会继续向上查找，直到找到该变量或查找结束找不到该变量。

  如果引擎最终找到了 `a` 变量，就会将 2 赋值给它。否则引擎就会举手示意并抛出一个异常！

  

#####第二章 词法作用域

* 词法作用域即作用域链

  > 作用域查找会在找到第一个匹配的标识符时停止。


* 欺骗词法：会导致性能下降
  * `eval()`
  * `with`



##### 第三章 函数作用域和块作用域

* 函数作用域：函数作用域是指属于这个函数的全部变量都可以在整个函数的范围内使用及复用。



##### 第四章 提升

* 函数优先 函数声明和变量声明都会被提升，函数会首先被提升，然后才是变量。

  ```javascript
  foo(); // 1
  var foo;
  function foo(){
      console.log(1);
  }
  foo = function(){
      console.log(2);
  }
  
  // 上面这个代码片段会被理解成如下形式
  function foo(){
      console.log(1);
  }
  foo();
  foo = function(){
      console.log(2);
  }
  // 尽管 foo 出现在 function foo() 的声明之前，但它是重复的声明 ( 因此被忽略了 )。因为函数会被提升	    到普通变量之前
  ```

* 小结

  > `var a = 2` 被我们看作一个声明，实际上 javascript 引擎并不这么认为。它把 `var a` 和 `a = 2` 看作两个单独的声明。第一个是编译阶段的任务，而第二个则是执行阶段的任务。
  >
  > 这以为着无论作用域的声明出现在什么地方，都将在代码本身被执行前首先进行处理。可以理解为所有声明（变量和函数）都会被移动到各自作用域的最顶端，这个过程被称为提升。



##### 第五章 作用域闭包

* 闭包：无论通过何种手段将内部函数传递到所在的此法作用域以外，它都会持有对原始定义作用于的引用，无论在何处执行这个函数都会使用闭包。



#### 第二部分 this 和对象原型



##### 第一章 关于 this

* 当一个函数被调用时，会创建一个活动记录（有时候也成为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息。this 就是这个记录的一个属性。



##### 第二章 this 全面解析

* > 调用位置：调用位置就是函数在代码中被调用的位置（而不是声明位置）。
  >
  > 某些编程模式会隐藏真正的调用位置。最重要的是要分析**调用栈**（就是为了达到当前执行位置所调用的所有函数）。
  >
  > ```javascript
  > function baz(){
  >     // 当前调用栈是：baz
  >     // 因此当前调用位置是全局作用域
  >     console.log( "baz" );
  >     bar(); // <-- bar 的调用位置
  > }
  > 
  > function bar(){
  >     // 当前调用栈是：baz -> bar
  >     // 因此当前调用位置在 baz 中
  >     console.log( "bar" );
  >     foo(); // <-- foo 的调用位置
  > }
  > 
  > function foo(){
  >     // 当前调用栈是 baz -> bar -> foo
  >     // 因此当前调用位置在 bar 中
  >     console.log( "foo" )
  > }
  > 
  > baz(); // <-- baz 的调用位置
  > ```

* 绑定规则

  * 默认绑定：独立函数调用。当其他规则无法应用时的默认规则

  * 隐式绑定：调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含

    ```javascript
    function foo(){
        console.log( this.a );
    }
    var obj = {
        a: 2,
        foo: foo
    };
    obj.foo(); // 2
    ```

    > 当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文的对象。因为调用 `foo()` 时 this 被绑定到 obj，因此 this.a 和 obj.a 是一样的
    >
    > 对象属性引用链中只有上一层或者说最后一层在调用位置起作用。如
    >
    > ```javascript
    > function foo(){
    >     console.log( this.a );
    > }
    > var obj1 = {
    >     a: 2,
    >    	obj2: obj2
    > };
    > var obj2 = {
    >     a: 42,
    >    	foo: foo
    > };
    > obj1.obj2.foo(); // 42
    > ```

  * 显式绑定

    > 即 `apply()` 和 `call()` 方法。它们的第一个参数是一个对象，在调用函数时将其绑定到 this。

  * new 绑定

    > 使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作
    >
    > 1. 创建（或者说构造）一个全新的对象
    > 2. 这个新对象会被执行 [[Prototype]] 连接
    > 3. 这个新对象会绑定到函数调用的 this
    > 4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象
    >
    > ```javascript
    > function foo(a){
    >     this.a = a;
    > }
    > var bar = new foo(2);
    > console.log(bar.a); // 2
    > ```
    >
    > 使用 new 来调用 foo( ... ) 时，我们会构造一个新对象并把它绑定到 foo( ... ) 调用中的 this 

* 优先级

  * 毫无疑问，默认绑定优先级最低。

  * ```javascript
    function foo(a){
        console.log( this.a );
    }
    var obj1 = {
        a: 2,
       	foo: foo
    };
    var obj2 = {
        a: 3,
       	foo: foo
    };
    obj1.foo(); // 2
    obj2.foo(); // 3
    obj1.foo.call(obj2); // 3
    obj2.foo.call(obj1); // 2
    // 显然，显式绑定优先级更高
    ```

  * ```javascript
    function foo(something){
        this.a = something;
    }
    var obj1 = {
        foo:foo
    };
    var obj2 = {};
    obj1.foo( 2 );
    console.log( obj1.a ); // 2
    obj1.foo.call( obj2, 3 );
    console.log( obj2.a ); // 3
    var bar = new obj1.foo( 4 );
    console.log( obj1.a ); // 2
    console.log( bar.a ); // 4
    // 可以看到，new 绑定比隐式绑定优先级高
    ```

  * ```javascript
    function foo(something){
        this.a = something;
    }
    var obj1 = {};
    var bar = foo.bind( obj1 );
    bar( 2 );
    console.log( obj1.a ); // 2
    var baz = new bar(3); 
    console.log( obj1.a ); // 2
    console.log( baz.a ); // 3
    ```

  * > 根据优先级判断函数
    >
    > 1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象
    >
    >    `var bar = new foo()`
    >
    > 2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用（bind）？如果是的话，this 绑定的是指定的对象
    >
    >    `var bar = foo.call()`
    >
    > 3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的haul，this 绑定的是哪个上下文对象
    >
    >    `var bar = obj1.foo()`
    >
    > 4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象。
    >
    >    `var bar = foo()`

* this 词法

  * > 箭头函数不适用 this 的四种标准规则，而是根据外层（函数或者全局）作用域来决定 this
    >
    > ```javascript
    > function foo(){
    >     // 返回一个箭头函数
    >     return (a)=>{
    >         // this 继承自 foo()
    >         console.log( this.a );
    >     };
    > }
    > var obj1 = {
    >     a:2
    > };
    > var obj2 = {
    >     a:3
    > };
    > var bar = foo.call( obj1 );
    > bar.call( obj2 ); // 2,不是 3！
    > ```
    >



##### 第三章 对象

* `Object.defineProperty()` 可以用来添加一个新属性或修改已有属性（如果它是 configurable）并对特性进行设置

  ```javascript
  var myObject = {};
  Object.defineProperty(myObject, "a", {
      value: 2,
      writable: true,
      configurable: true,
      enumerable: true
  })
  myObject.a; // 2
  ```




#####第四章 混合对象 “类”

* 多态：父类的通用行为可以被子类用更特殊的行为重写





#### 第三部分 类型和语法



##### 第一章 类型

* javascript 有 7 种内置类型

  * null
  * undefined
  * boolean
  * number
  * string
  * object
  * symbol（ES6 新增）

  除对象外，其他统称为基本类型

  我们可以用 typeof 运算符来查看值的基本类型，它返回的是类型的字符串值

  ```javascript
  typeof undefined === "undefined"; // true
  typeof true === "boolean"; // true
  typeof 42 === "number"; // true
  typeof "42" === "string"; // true
  typeof { life: 42 } === "object"; // true
  
  // ES6 新加入的类型
  typeof Symbol() === "symbol"; // true
  ```



#####第二章 值

 * 数组

   * 数组也可以包含属性，但不计算在数组长度内

     ```javascript
     var a = [];
     a[0] = 1;
     a["foobar"] = 2;
     
     a.length; // 1
     a["foobar"]; // 2
     a.foobar; // 2
     
     // 如果字符串键值能被强制转换成十进制数字的话，它就会被当做索引处理
     a["13"] = 42;
     a.length; // 14
     ```

   * 将类数组（一组通过数字索引的值）转换为真正的数组

     一般通过数组工具函数（如`indexOf()、concat()、forEach()`）来实现

     例如，一些 DOM 查询操作会返回 DOM 元素列表，它们并非真正意义上的数组，另一个例子是通过 arguments 对象将函数的参数当做列表来访问（ES6 已废止）

     ```javascript
     function foo(){
         var arr = Array.prototype.slice.call(arguments);
         arr.push("bam");
         console.log(arr);
     }
     foo("bar","baz"); // ["bar","baz","bam"]
     
     // ES6 的内置工具函数 Array.from() 也能实现相同的功能
     var arr = Array.from( arguments );
     ```

* 字符串

  字符串经常被当做数组

  ```javascript
  var a = "foo";
  var b = ["f","o","o"];
  
  a.length; // 3
  b.length; // 3
  
  a.indexOf("o"); // 1
  b.indexOf("o"); // 1
  
  // 但并不意味着它们都是 "字符数组"，比如：
  a[1] = "0";
  b[1] = "0";
  
  a; // "foo"
  b; // ["f","0","o"]
  ```

  javascript 中字符串是不可变的，而数组是可变的。并且 a[1] 在 javascript 中并非总是合法语法，在老版本的 IE 中就不被允许。正确的方法应该是 `a.charAt(1)`

  字符串不可变是指字符串的成员函数不会改变其原始值，而是创建并返回一个新的字符创，而数组的成员函数都是在其原始值上进行操作

  ```javascript
  c = a.toUpperCase();
  a === c; // false
  a; // "foo"
  c; // "FOO"
  
  b.push( "!" );
  b; // ["f","0","o","!"]
  ```

  许多数组函数用来处理字符串很方便，虽然字符创没有这些函数，但可以通过 “借用” 数组的非变更方法来处理字符串

  ```javascript
  a.join; // undefined
  a.map; // undefined
  
  var c = Array.prototype.join.call(a,"-");
  var d = Array.prototype.map.call(a,function(v){
      return v.toUpperCase() + ".";
  }).join("");
  
  c; // "f-o-o"
  d; // "F.O.O"
  ```

  另一个不同点在于字符串反转。数组有一个字符串没有的可变更成员函数`reverse()`

  ```javascript
  a.reverse; // undefined
  
  b.reverse(); // ["!","o","0","f"]
  b;	// ["f","0","o","!"]
  ```

  可我们无法 “借用” 数组的可变更成员函数，因为字符串是不可变的

  ```javascript
  Array.prototype.reverse.call( a );
  // 返回值仍是字符串 "foo" 的一个封装对象
  ```

  一个变通方法是先将字符串转换为数组，处理完之后结果转换回字符串

  ```javascript
  var c = a
  	// 将 a 的值转换为字符串数组
  	.split( "" )
  	// 将数组中的字符串进行倒转
  	.reverse()
  	// 将数组中的字符拼接回字符串
  	.join( "" );
  c; // "oof"
  
  ```

  如果需要经常以字符数组的方式来处理字符串，倒不如直接使用数组，在需要的时候用 `join()` 将字符数组转换为字符串

* 数字

* 特殊数值

  * undefined
  * null
  * NaN（`isNaN()`）
  * 无穷数（Infinity）
  * 0 值（-0 === 0）

* 值和引用



##### 第 3 章 原生函数

常用的原生函数有：

* `String()`
* `Number()`
* `Boolean()`
* `Array()`
* `Object()`
* `Function()`
* `RegExp()`
* `Date()`
* `Error()`
* `Symbol()`——ES6 中新加入的



##### 第 4 章 强制类型转换

* 值强制类型转换

  ```javascript
  var a = 42;
  var b = a + ""; // 隐式强制类型转换
  var c = String(a); // 显式强制类型转换 
  ```

* 抽象值操作

  ```javascript
  JSON.stringify( 42 ); // "42"
  JSON.stringify( "42" ); // ""42""
  JSON.stringify( null ); // "null"
  JSON.stringify( true ); // "true"
  ```

  