[TOC]

### javascript 高级程序设计第二遍总结



##### 第二章 \< script > 元素

* \<script> 尽量放在最后，\</body> 之前
* `!DOCTYPE`：如果不指定的话，浏览器会按照他的标准来渲染页面，指定了会按照 W3C 标准来渲染页面。



##### 第三章 基本概念

* 未经过初始化的变量会保留一个 undefined 的初始值

  ```javascript
  var message;	// undefined
  ```

* 6 种简单的数据类型 Undefined，Null，Number，String，Boolean，Symbol

* 1 种复杂的数据类型 Object

* typeof 返回值

  > "undefined" 这个值未定义 
  >
  > "boolean" 这个值是布尔值
  >
  > "string" 这个值是字符串
  >
  > "number" 这个值是数值
  >
  > "object" 这个值是对象或 null
  >
  > "function" 这个值是函数
  >
  > "symbol" 这个值是 symbol

  ```javascript
  undefined == null //true 
  undefined === null //false
  null == null //true
  null === null //true
  undefined == undefined //true
  undefined === undefined //true
  NaN == NaN //false
  NaN === NaN //false
  ```

* parseInt ( ) 第二个参数表示转换时使用的基数

  ```javascript
  var num1 = parseInt("10",2);	// 2	(按二进制解析)
  var num1 = parseInt("10",8);	// 8	(按八进制解析)
  var num1 = parseInt("10",10);	// 10	(按十进制解析)
  var num1 = parseInt("10",16);	// 16	(按十六进制解析)
  ```

* String 类型可以用单引号或双引号表示，这两种语法完全相同。

  * 把某个值转换为字符串可以使用加号操作符把他和一个 ( " " ) 加在一起。

* 一元加和减操作符可以用于转换数据类型

  ```javascript
  var s1 = "01";
  var s2 = "1.1";
  s1 = +s1;	// 值变成数值1
  s2 = -s2;	// 值变成数值-1.1
  ```

* 位操作符

  * 负数求二进制码

    1. 求绝对值的二进制码
    2. 求反码，即 0 替换成 1，1 替换成 0
    3. 反码加1

  * 按位非（~）结果是返回数值的反码，本质是操作数的负值减 1

    ```javascript
    var num1 = 25;		// 二进制 00000000000000000000000000011001
    var num2 = ~num1;	// 二进制 11111111111111111111111111100110
    alert(num2);		// -26
    ```

  * 按位与（&）将两个操作数的每一位相与

    ``` javascript
    var result = 25 & 3;
    alert(result);	//1
    //底层操作
    /*
    	25 = 00000000000000000000000000011001
    	3  = 00000000000000000000000000000011
    	—————————————————————————————————————
    	AND= 00000000000000000000000000000001
    */
    ```

  * 按位或（|）将两个操作数每一位进行或运算
    ```javascript
    var result = 25 | 3;    
    alert(result);	//27
    //底层操作
    /*
        25 = 00000000000000000000000000011001
        3  = 00000000000000000000000000000011
        —————————————————————————————————————
        OR = 00000000000000000000000000011011
    */
    ```

  * 按位异或（^）将两个操作数每一位进行异或操作，即相同为 0，不同为 1

    ```javascript
    var result = 25 ^ 3;    
    alert(result);	//26
    //底层操作
    /*
        25 = 00000000000000000000000000011001
        3  = 00000000000000000000000000000011
        —————————————————————————————————————
        OR = 00000000000000000000000000011010
    */
    ```

  * 左移（<<）左移指定的位数 n，即乘以 2 的 n 次方

    ```javascript
    var oldValue = 2;			   	// 二进制的 10
    var newValue = oldValue << 5;	// 二进制的 1000000,十进制的 64 
    //应用
    2 << 1 === 2 * 2; // true
    ```

  * 有符号右移（>>）右移指定的位数 n，即除以 2 的 n 次方

    ```javascript
    var oldValue = 64;			   	// 二进制的 1000000
    var newValue = oldValue >> 5;	// 二进制的 10,十进制的 2 
    //应用
    2 >> 1 === 2 / 2; // true
    ```

* 逻辑或（||）是短路操作符，即如果第一个操作数求值结果为 true，就不会对第二个操作数求值

  * 第一个操作数是对象，则返回第一个操作数。

  * **如果第一个操作数的求值结果为 false，则返回第二个操作数**

* 乘性操作符

  * 乘法
  * 除法
  * 求模

* 加性操作符

  * 加法，注意数字和字符串相加

    ```javascript
    var num1 = 5;
    var num2 = 10;
    var message1 = "The sum of 5 and 10 is " + ( num1 + num2 );	
    // "The sum of 5 and 10 is 15"
    var message2 = "The sum of 5 and 10 is " + num1 + num2;		
    //"The sum of 5 and 10 is 510"
    ```

* switch 语句可以使用任何数据类型，比较值的时候用的是全等（===）

  ```javascript
  switch (expression)	{
      case value: statement
      	break;
      case value: statement
      	break;
      default: statement       
  }
  ```




##### 第四章 作用域和内存问题

* 数据类型的值（区别数据类型）

  * 基本类型值（放在栈中）
  * 引用类型值（放在堆中，对对象的引用放在栈中）

* 关于传递参数的列子

  ```javascript
  // javascript 参数传递是按值传递的
  function changeStuff(a, b, c)
  {
    a = a * 10;
    b.item = "changed";
    c = {item: "changed"};
  }
  
  var num = 10;
  var obj1 = {item: "unchanged"};
  var obj2 = {item: "unchanged"};
  
  changeStuff(num, obj1, obj2);
  
  console.log(num);
  console.log(obj1.item);    
  console.log(obj2.item);
  
  // 输出结果
  10
  changed
  unchanged
  
  var a = {n:1};  
  var b = a; // 持有a，以回查  
  a.x = a = {n:2};  
  alert(a.x);// --> undefined  
  alert(b.x);// --> [object Object] 
  ```

* 检测类型

  ```javascript
  // typeof
  var a = new Object();
  typeof a; // object
  // instanceof
  a instanceof Object; // true
  ```

* 执行环境和作用域 

  执行环境包含全局执行环境和函数执行环境

  **变量对象** 执行环境中包含的变量和函数都保存在这个对象中

  我的理解是每个块级作用域都有它单独的执行环境（？）

  > 作用域链的前端始终都是当前执行的代码所在的`变量对象`。如果这个环境是函数，则将其`活动对象`（我的理解是函数执行时的`变量对象`）作为`变量对象`。`活动对象`（即`变量对象`）开始的时候只包含 arguments 对象。作用域链中的下一个`变量对象`来自`包含环境`（我的理解是包含这个函数的环境），而再下一个`变量对象`则来自下一个`包含环境`。一直延续到全局执行环境，因此，全局执行环境的`变量对象`始终都是作用域链中的最后一个对象。

* 延长作用域链

  * with
  * try-catch

* 垃圾收集

  > Javascript 具有自动垃圾收集机制。垃圾收集器会按照固定的时间间隔，周期性的找出那些不再继续使用的变量，然后释放其占用的内存。
  >
  > 最常用的垃圾收集方式是标记清除。当变量进入环境（例如，在函数中声明一个变量）时，就将这个变量标记为 “ 进入环境 ”。从逻辑上讲，永远不能释放进入环境中的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到它们。而当变量离开环境时，则将其标记为 “ 离开环境 ”。



##### 第五章 引用类型

* 一般情况下，访问对象属性时用的都是点表示法。也可以用方括号语法，使用方括号语法时，应该将要访问的属性以字符串的形式放在方括号中，如 `person["name"] === person.name`。

* 如果属性名中包含会导致语法错误的字符，或者属性名使用的是关键字或保留字，也可以使用方括号表示法，如 `person["first name"] = "Nicholas"`

* 数组

  * 数组的每一项可以保存任何类型的数据

  * 创建数组的方式

    ```javascript
    var colors = new Array();
    var colors = new Array(20); // 创建一个 length 为 20 的数组
    var colors = new Array("red", "blue", "green");
    var colors = []; // 创建一个空数组
    var colors = ["red", "blue", "green"];
    ```

  * 数组的 length 不是只读的，可以通过设置这个属性，可以从数组的末尾移除项或向数组中添加新项。

    ```javascript
    var colors = ["red", "blue", "green"];
    
    colors.length = 2;
    alert(colors[2]); // undefined
    
    colors.length = 4;
    alert(colors[4]); // undefined
    
    // 利用 length 向数组添加项
    colors[colors.length] = "black";
    colors[colors.length] = "brown";
    
    colors[99] = "black";
    alert(colors.length); // 100
    ```

  * 检测数组的方法

    ```javascript
    var arr = [];
    Object.prototype.toString.call(arr); // "[object Array]"
    Array.isArray(arr); // true
    arr instanceof Array; // true
    a.constructor === Array; // true
    a.constructor.name === "Array"; // true
    ```

  * 转换方法

    > 所有对象都有 `toString()` 和 `valueOf()` 方法。调用数组的 `toString()` 方法会返回数组中每个值的字符串形式拼接成的一个以逗号分隔的字符串，调用 `valueOf()` 方法返回的还是数组（经我测试调用 `valueOf()` 返回的数组与原数组全等）

    ```javascript
    var colors = ["red", "blue", "green"];
    console.log(colors.toString()); // red,blue,green
    console.log(colors.valueOf()); // ["red", "blue", "green"]
    ```

    调用 `join()` 方法可以使用不同的分隔符来构建这个字符串，如

    ```javascript
    // 不传参数或者传 undefined 默认以逗号，或者传一个参数
    colors.join(","); // red,blue,green
    colors.join("||"); // red||blue||green
    ```

  * 栈方法 后进先出

    ```javascript
    var colors = new Array();
    // 添加一个或多个元素到数组末尾，并返回修改后的数组长度
    var count = colors.push("red", "green"); // 推入两项
    count // 2
    count = colors.push("black"); // 推入另一项
    count // 3
    
    // 从数组末尾移除最后一项，减少 length 的值,并返回移除的项
    var item = colors.pop(); // 取得最后一项
    item // "black"
    colors.length // 2
    ```

  * 队列方法 先进先出

    ```javascript
    var colors = new Array();
    var count = colors.push("red", "green"); // 推入两项
    count // 2
    count = colors.push("black"); // 推入另一项
    count // 3
    
    // shift() 能够移除并返回数组中的第一项
    var item = colors.shift(); // 取得第一项
    item // "red"
    colors.length // 2
    
    // unshift() 在数组前端添加任意个项并返回修改后的长度
    var colors = new Array();
    var count = colors.unshift("red", "green"); // 推入两项
    count // 2
    count = colors.unshift("black"); // 推入另一项
    count // 3
    ```

  * 重排序方法 `reverse()` 和 `sort()`

    ```javascript
    // reverse() 方法会反转数组的顺序
    var values = [1, 2, 3, 4, 5];
    values.reverse(); // [5, 4, 3, 2, 1]
    
    // sort() 方法接受一个函数作为参数
    var values = [0, 1, 5, 10, 15];
    function compare(value1, value2){
        return value1 < value2;
    }
    values.sort(compare); // [0, 1, 5, 10, 15]
    ```

  * 操作方法

    ```javascript
    /*
    	concat() 在没有给它传递参数的情况下复制当前数组，并返回副本(浅拷贝)
    	如果传递的是一个或多个数组，则会把这些数组中的每一项都添加到结果数组中
    	如果传递的不是数组，则这些值会被简单的添加到数组的末尾
    */
    var colors = ["red", "blue", "green"];
    var colors2 = colors.concat("yellow", ["black", "brown"]);
    colors // ["red", "blue", "green"];
    colors2 // ["red", "blue", "green", "yellow", "black", "brown"];
    
    /*
    	slice() 基于当前数组创建一个新数组。
    	接受一个或两个参数，即要返回的起始位置和结束位置(不包含结束位置)，只有一个参数的情况下，返回	   指定位置到数组末尾的所有项。
    	slice() 也不会影响原数组。
    	如果参数里面包含负数，则加上数组的长度，如长度为 5 的数组 slice(-2,-1) 与 slice(3,4) 结果	   相同
    */
    var colors = ["red", "blue", "green", "yellow", "black", "brown"];
    var colors2 = colors.slice(1);
    var colors3 = colors.slice(1,4);
    colors2 // ["blue", "green", "yellow", "black", "brown"];
    colors3 //  ["blue", "green", "yellow"];
    
    /*
    	splice() 是最强大的数组方法。主要用途是向数组中插入项。
    	删除：可以删除任意的项，只需指定两个参数，要删除的第一个位置和要删除的项数
    	插入：可以向指定位置添加指定项数，3个参数，起始位置，0 (要删除的项数)，和要插入的项
    	替换：向任意位置插入任意项数，3个参数，起始位置，要删除的项数，要插入的项
    	返回值是从原数组中删除的项，没有返回空数组。
    	会影响原数组
    */
    var colors = ["red", "blue", "green"];
    var removed = colors.splice(0,1); // 删除第一项
    colors // [blue", "green"]
    removed // ["red"]
    
    removed = colors.splice(1, 0, "yellow", "orange")
    colors // [blue", "yellow", "orange", "green"]
    removed // []
    
    removed = colors.splice(1, 1, "red", "purple")
    colors // [blue", "red",  "purple", "orange", "green"]
    removed // ["yellow"]
    ```

  * 位置方法

    ```javascript
    // indexOf() 和 lastIndexOf() 都接收两个参数，要查找的项，和从哪个位置开始查找(可选)。没有找到	 的情况下返回 -1。找到返回查到的第一个位置。
    // indexOf() 从前往后查，lastIndexOf() 从后往前查
    var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    numbers.indexOf(4); // 3
    numbers.lastIndexOf(4); // 5
    
    numbers.indexOf(4, 4); // 5
    numbers.lastIndexOf(4, 4); // 3
    
    var person = { name: "Jack" };
    var people = [{ name: "Jack" }];
    var morePeople = [person];
    people.indexOf(person); // -1
    morePeople.indexOf(person); // 0
    ```

  * 迭代方法

    > 五个迭代方法，每个方法都接受两个参数：要在每一项上运行的函数和运行该函数的作用域对象 ( 可选的 )——影响 `this` 的值。
    >
    > 传入这些方法中的函数会接收 3 个参数：数组项的值，该项在数组中的位置，数组对象本身
    >
    > `every()` 对数组中每一项执行给定函数，每一项都为 true，则返回 true
    >
    > `some()` 对数组中每一项执行给定函数，只要有一项为 true，则返回 true 
    >
    > `filter()` 对数组中每一项执行给定函数，返回 true 的项组成的数组
    >
    > `forEach()` 对数组中每一项执行给定函数，没有返回值
    >
    > `map()` 对数组中每一项执行给定函数，返回每次调用结果组成的数组
    >
    > 以上方法都不会修改原数组中的值

    ```javascript
    var arr = [0,2,4,6,8];
    var str = arr.map(function(item,index,arr){
        console.log(this);
        console.log("原数组arr：",arr); //注意这里执行5次
        return item / 2;
    },this);
    console.log(str);
    ```

  * 归并方法

    ```javascript
    /*
    	reduce() 和 reduceRight()，这两个方法都会迭代数组的所有项，然后构建一个最终的返回值
    	reduce() 从前往后，reduceRight() 从后往前。
    	都接受两个参数：一个在每一项上调用的函数和作为归并基础的初始值
    	传给 reduce 和 reduceRight() 的函数接收 4 个参数：前一个值，当前值，项的索引和数组对象。
    	这个函数的返回值会作为第一个参数自动传给下一项，第一次迭代在第二项上
    */
    var values = [1, 2, 3, 4, 5];
    var sum = values.reduce(function(prev, cur, index, array){
                            return prev + cur;
                            })
    sum // 15
    ```

* Date 对象

  ```javascript
  // 创建一个日期对象
  var now = new Date(); // 在调用 Date 的构造函数而不传递参数的情况下，新创建的对象自动获得当前的日					   期和时间，参数为表示该日期的毫秒数
  
  // Date.parse() 方法接收一个表示日期的字符串参数
  var someDate = new Date(Date.parse("May 25,2004"));
  // 等价于
  var someDate = new Date("May 25,2004");
  
  // Date.UTC() 方法同样返回表示日期的毫秒数，参数分别是年，基于 0 的月份，月份中的哪一天（1-31），
  // 小时数（0-23），分钟，秒，以及毫秒数
  // 前两个必填，后面不填天数默认为 1，其他默认为 0
  // GMT 时间 2000 年 1 月 1 日午夜零时
  var y2k = new Date(Date.UTC(2000,0))
  
  // Date.now() 返回调用时的毫秒数，用于分析代码工作
  var start = Date.now(); // 取得开始时间
  doSomething();  // 执行程序
  var stop = Date.now() // 取得停止时间
  var result = stop - start;
  ```

  * 继承的方法

    ```javascript
    // Date 类型的 valueOf() 方法返回日期的毫秒数，可以用来比较日期值
    var date1 = new Date(2007,0,1);
    var date2 = new Date(2007,1,1);
    date1 < date2 // true
    date1 > date2 // false
    ```

* RegExp 类型

  * 创建一个正则表达式：`var expression = / pattern / flags` 

    > 每个正则表达式可以带有一个或多个标志（flags），有三个标志
    >
    > g：表示全局模式，即全局匹配，而不是在发现第一个匹配项时立即停止
    >
    > i：表示区分大小写
    >
    > m：表示多行匹配

    ```javascript
    /*
    匹配字符串中所有的 "at" 的实例
    */
    var pattern = /at/g
    /*
    匹配第一个 "bat" 或 "cat"，不区分大小写
    */
    var pattern = /[bc]at/i
    /*
    匹配所有以 "at" 结尾的 3 个字符的组合，不区分大小写
    */
    var pattern = /.at/gi
    ```

  * 实例方法

    ```javascript
    // test() 接收一个字符串参数，在模式与该参数匹配的时候返回 true，否则返回 false
    var text = "000-00-000";
    var pattern = /\d{3}-\d{2}-d{4}/;
    if(pattern.test(text)){
        ...
    }
    ```

* Function 类型

  * 由于函数是对象，所以函数名实际上是一个指向函数的指针，不会与某个函数绑定

    ```javascript
    // 两种定义函数方式
    function sum(num1, num2){
        return num1 + num2;
    }
    var sum = function(num1, num2){
        return num1 + num2;
    }; // 注意这种方式末尾需要一个分号，就像声明变量一样
    ```

    ```javascript
    // 深入理解函数是对象
    function sum(num1, num2){
        return num1 + num2;
    }
    sum(10, 10); // 20
    
    var antherSum = sum;
    antherSum(10, 10); // 20
    
    sum=null;
    antherSum(10, 10); // 20
    
    // 没有重载
    function addSomeNumber(){
        return num + 100;
    }
    function addSomeNumber(){
        return num + 200;
    }
    addSomeNumber(100); // 300
    
    // 将函数名想象成指针就很好理解上面的代码，即
    var addSomeNumber = function(){
        return num + 100;
    };
    addSomeNumber = function(){
        return num + 200;
    };
    addSomeNumber(100); // 300
    ```

  * 函数声明和函数表达式

    ```javascript
    // 试想下面两种方法的输出结果
    /** 1 **/
    sum(10,10);
    function sum(num1, num2){
        return num1 + num2;
    }
    /** 2 **/
    sum(10,10);
    var sum = function(num1, num2){
        return num1 + num2;
    };
    // 第一个打印 20，第二个报 unexpected identifier
    ```

    之所以上面两种情况是因为第一种定义情况属于函数声明，函数声明会有一个函数声明提升的过程；第二种情况属于函数表达式，函数表达式中不会保存对函数的引用。除此之外，两种声明方式是等价的

    个人理解：其实把第二种情况想象成变量就可以，变量有变量提升，但是访问的时候值是 undefined

  * 函数的内部属性

    > 函数的内部有两个特殊的对象 this 和 arguments。其中 arguments 是一个类数组对象，包含着传入函数中的所有参数。这个对象还有一个叫 callee 的属性，该属性是一个指针，指向拥有这个 arguments 对象的函数。
    >
    > 比如下面这个经典的递归
    >
    > ```javascript
    > function factorial(num){
    >     if(num <= 1){
    >         return 1;
    >     } else {
    >         return num * factorial( num-1 );
    >     }
    > }
    > ```
    >
    > 但是这样就使这个函数的执行与 factorial 紧紧耦合在了一起，为了消除这种耦合，可以这样
    >
    > ```javascript
    > function factorial(num){
    >     if(num <= 1){
    >         return 1;
    >     } else {
    >         return num * arguments.callee( num-1 );
    >     }
    > }
    > ```
    >
    > 函数内部的另一个特殊对象是 this。this 引用的是函数执行的环境对象。

  * 函数的属性和方法

    > 函数的 length 表示函数希望接收的命名参数的个数
    >
    > ```javascript
    > function sum(num1, num2){
    >     return num1 + num2;
    > }
    > sum.length // 2
    > ```
    >
    > 每个**函数**都包含两个非继承而来的方法：`apply()` 和 `call()`。这两个方法的用途是在特定的作用域中调用函数，实际上等于设置函数体内 this 对象的值。
    >
    > `apply()` 方法接收两个参数，一个是在其中运行函数的作用域，另一个是参数数组。其中，第二个参数可以是 Array 的实例，也可以是 arguments 对象。如：
    >
    > ```javascript
    > function sum(num1, num2){
    >     return num1 + num2;
    > }
    > function callSum1(num1, num2){
    >     return sum.apply(this, arguments); // 传入 arguments 对象
    > }
    > function callSum2(num1, num2){
    >     return sum.apply(this,[num1, num2]); // 传入数组
    > }
    > callSum1(10,10); // 20
    > callSum2(10,10); // 20
    > ```
    >
    > `call()` 和 `apply()` 方法的作用相同，它们的区别仅在与接收参数的方式不同。对于`call()` 方法而言，第一个参数是 this 值没有变化，变化的是其余的参数都直接传递给函数，即传递的参数需要一个一个列出来
    >
    > ```javascript
    > function sum(num1, num2){
    >     return num1 + num2;
    > }
    > function callSum1(num1, num2){
    >     return sum.call(this, num1, num2); 
    > }
    > callSum(10,10); // 20
    > ```
    >
    > 这两个方法真正的强大之处是能够扩充函数赖以生存的作用域
    >
    > ```javascript
    > window.color = "red";
    > var o = { color: "blue" };
    > function sayColor(){
    >     console.log(this.color);
    > }
    > sayColor(); // red
    > 
    > sayColor.call(this); // red
    > sayColor.call(window); // red
    > sayColor.call(o); // blue
    > ```
    >
    > `bind()` 这个方法会创建一个函数的实例，其 this 值会被绑定传给 `bind()` 函数的值。
    >
    > ```javascript
    > window.color = "red";
    > var o = { color: "blue" };
    > function sayColor(){
    >     console.log(this.color);
    > }
    > var objectSayColor = sayColor.bind(o);
    > objectSayColor(); // blue
    > ```

* 基本包装类型

  * 为了便于操作基本类型值，Javascript 还提供了三个特殊的引用类型：Boolean、Number 和 String

    ```javascript
    /*
    	在这个例子中，s1 是一个基本类型值，不应当有方法，而下一行却调用了方法，其实为了完成这个操    	  作，后台已经自动完成了一系列的处理
    	（1）创建 String 类型的一个实例
    	（2）在实例上调用指定的方法
    	（3）销毁这个实例
    	同样适用于 Number 和Boolean
    */
    var s1 = "some text";
    var s2 = s1.substring(2);
    // 可以想象成执行了以下代码
    var s1 = new String("some text");
    var s2 = s1.substring(2);
    s1 = null;
    ```

  * > 引用类型和基本包装类型的主要区别就是对象的生存期，使用 new 操作符创建的引用类型的实例，在执行流离开当前作用域之前一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。这意味着不能给基本类型值添加属性和方法。

  * Number 类型

    ```javascript
    // toString() 方法传递一个表示基数的参数，返回几进制数值的字符串
    var num = 10;
    num.toString();// "10"
    num.toString(2);// "1010"
    num.toString(8);// "12"
    num.toString(16);// "a"
    
    // toFixed() 方法会按照指定的小数位返回数值的字符串表示
    var num = 10;
    num.toFixed(2); // 10.00
    var num = 10.005
    num.toFixed(2); // 10.01
    ```

  * String 类型

    ```javascript
    // charAt() 返回基于 0 位置的单字字符串
    var stringVlaue = "hello world";
    stringValue.charAt(1); // "e"
    stringValue[1]; // "e"
    
    // concat() 用于将一个或多个字符串拼接起来，返回拼接得到的心字符串，可以接受任意多个参数，依次拼接
    var stringVlaue = "hello";
    var result = stringValue.concat(" world");
    result; // "hello world"
    stringValue; // "hello"
    
    /* slice()、substr() 和 substring() 这三个方法都会返回被操作字符串的一个子串而且都接受一到两个	  参数。第一个参数指定字符传开始位置，第二个参数（在指定了的情况下）表示字符串到哪里结束。
       具体来说 slice() 和 substring() 的第二个参数指定的是字符串最后一个字符后面的位置。而  	      substr() 的第二个参数则是返回的字符个数。如果没有第二个参数，则将长度作为结束位置。
       不会修改原字符串的值
    */
    var stringVlaue = "hello world";
    stringVlaue.slice(3); // "lo world"
    stringVlaue.substring(3); // "lo world"
    stringVlaue.substr(3); // "lo world"
    stringVlaue.slice(3, 7); // "lo w"
    stringVlaue.substring(3, 7); // "lo w"
    stringVlaue.substr(3, 7); // "lo worl"
    
    // trim() 创建一个字符串的副本，去掉前置和后缀的所有空格，并返回
    var stringVlaue = "  hello world  ";
    var trimmedStringValue = stringValue.trim();
    trimmedStringValue; // "hello world"
    
    // 字符串大小写转换方法 toUpperCase() toLowerCase()
    
    // 字符串位置方法：indexOf() 和 lastIndexOf()，第二个参数代表从哪个位置开始搜索
    var stringVlaue = "hello world";
    stringValue.indexOf("o"); // 4
    stringValue.lastIndexOf("o"); // 7
    
    // 模式匹配方法
    var text = "cat, bat, sat, fat";
    var pattern = /.at/;
    
    var matches = text.match(pattern);
    var result = text.replace("at","ond");
    result; // "cond, bat, sat, fat";
    result.replace(/at/g,"ond");
    result; // "cond, bond, sond, fond"
    ```

* Math 对象

  ```javascript
  // Math.max() 和 Math.min()
  var max = Math.max(3, 54, 32, 16);
  max; // 54
  var min = Math.min(3, 54, 32, 16);
  min; // 3
  
  // 要找到数组中的最大值或最小值，可以向下面这样使用 apply() 方法
  var values=[1, 2, 3, 4, 5, 6, 7, 8];
  var max=Math.max.apply(Math,values);
  
  // 舍入方法 Math.ceil()、Math.floor() 和 Math.round()
  // Math.ceil() 向上舍入
  Math.ceil(25.9); // 26
  Math.ceil(25.5); // 26
  Math.ceil(25.1); // 26
  // Math.floor() 向下舍入
  Math.floor(25.9); // 25
  Math.floor(25.5); // 25
  Math.floor(25.1); // 25
  // Math.round() 四舍五入
  Math.round(25.9); // 26
  Math.round(25.5); // 26
  Math.round(25.1); // 25
  
  // Math.random() 返回大于等于 0 小于 1 之间的一个随机数
  // 值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能值)
  var num = Math.floor(Math.random() * 9 + 2) // 返回一个 2 - 10 之间的整数
  ```

  |         方法         |          说明          |
  | :------------------: | :--------------------: |
  |    Math.abs(num)     |   返回 num 的绝对值    |
  | Math.pow(num, power) | 返回 num 的 power 次幂 |
  |    Math.sqrt(num)    |   返回 num 的平方根    |




##### 第六章 面向对象的程序设计

* 属性类型

  * 数据属性：数据属性包含一个数据值的位置，在这个位置可以读取和写入值。数据属性有4个描述其行为的特性

    * `[[Configurable]]`：表示是否能通过 delete 删除属性，能否修改属性的特性，或者能否把属性修改为访问器属性
    * `[[Enumerable]]`：表示能否通过 for-in 循环返回属性
    * `[[Writable]]`：表示能否修改属性的值
    * `[[Value]]`：包含这个属性的数据值，默认值为 undefined

    要修改属性默认的特性，必须使用`Object.defineProperty()`方法。这个方法接收三个参数：属性所在的对象、属性的名字和一个描述符对象。其中，描述符对象的属性必须是：configurable、enumerable、writable 和 value。设置其中的一个或多个值，可以修改对应的特性值。

    ```javascript
    var person = {};
    Object.defineProperty(person, "name", {
        writable: false,
        value: "Nicholas"
    });
    person.name; // "Nicholas"
    person.name = "Greg";
    person.name; // "Nicholas"
    
    // 类似的规则也适用于不可配置的属性
    var person = {};
    Object.defineProperty(person, "name", {
        configurable: false,
        value: "Nicholas"
    });
    person.name; // "Nicholas"
    delete person.name;
    person.name; // "Nicholas"
    person.name = "Greg";
    person.name; // "Nicholas"
    ```

  * 访问器属性：访问器属性不包含数据值：它们包含一对 getter 和 setter 函数（不过这两个函数都不是必须的）。在读取访问器属性时，会调用 getter 函数，这个函数赋值则返回有效的值；在写入访问器属性时，会调用 setter 函数并传入新值。访问器属性有如下四个特性

    * `[[Configurable]]`：表示是否能通过 delete 删除属性，能否修改属性的特性，或者能否把属性修改为数据属性
    * `[[Enumerable]]`：表示能否通过 for-in 循环返回属性
    * `[[Get]]`：在读取属性时调用的函数，默认值为 undefined
    * `[[Set]]`：在写入属性时调用的函数，默认值为 undefined

    访问器属性不能直接定义，必须使用`Object.defineProperty()`方法来定义

    ```javascript
    var book = {
        _year:2004,  // _year 下面加下划线使用一种常用的记号，表示只能通过对象方法访问的属性
        edition:1
    };
    Object.defineProperty(book,"year",{
        get:function(){
            return this._year;
        },
        set:function(newValue){
            if(newValue > 2004){
                this._year = newValue;
                this.edition += newValue - 2004;
            }
        }
    });
    book.year = 2005;
    book.edition; // 2
    /* 
    	getter 函数会返回 _year 的值，setter 函数会通过计算来确定正确的版本，这就是访问器属性最常		见的方式，修改一个属性的值会导致其他属性发生变化。
    */
    ```

  * 定义多个属性：`Object.defineProperties()`用这个方法可以通过描述符一次定义多个属性，这个方法接收两个对象参数：第一个对象参数是要添加和修改其属性的对象，第二个对象的属性与第一个对象中要添加或修改的属性一一对应，如

    ```javascript
    var book = {};
    Object.defineProperties(book, {
        _year:{
            value: 2004
        },
        edition:{
            value: 1
        },
        year:{
            get: function(){
                return this._year;
            },
            set: function(newValue){
                if(newValue > 2004){
                    this._year = newValue;
                    this.edition += newValue - 2004;
                }
            }
        }
    });
    ```

* 创建对象

  * 工厂模式

    ```javascript
    function createPerson(name, age, job){
        var o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function(){
            alert(this.name)
        };
        return o;
    }
    var person1 = createPerson("Nicholas", 29, "Software Engineer");
    var person2 = createPerson("Greg", 27, "Doctor");
    ```

    工厂模式解决了创建多个相似对象的问题，但没解决对象识别的问题（怎么知道一个对象的类型）

  * 构造函数模式

    ```javascript
    // 按照惯例构造函数应以一个大写字母开头，非构造函数以小写字母开头
    function Person(name, age, job){ 
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = function(){
            alert(this.name)
        };
    }
    var person1 = new Person("Nicholas", 29, "Software Engineer");
    var person2 = new Person("Greg", 27, "Doctor");
    person1.constructor == Person; // true
    person2.constructor == Person; // true
    person1 instanceof Person; // true
    person1 instanceof Object; // true // 因为所有对象都继承自 Object
    person2 instanceof Person; // true
    person2 instanceof Object; // true
    ```

    不同之处

    > (1)没有显式地创建对象；
    >
    > (2)直接将属性和方法赋给了 this 对象；
    >
    > (3)没有 return 语句

    要创建 Person 的新实例，必须使用 new 操作符，以这种方式调用构造函数实际上会经历以下 4 个步骤

    > (1)创建一个新对象；
    >
    > (2)将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）；
    >
    > (3)执行构造函数中的代码（为这个新对象添加属性）；
    >
    > (4)返回新对象；
    >
    > ```javascript
    > new Person("Greg", 27, "Doctor") == {
    >     var obj = {};
    >     obj.__proto__ = Person.prototype;
    >     var result = Person.call(obj,"Greg", 27, "Doctor");
    >     return typeof result === 'object'? result : obj;
    > }
    > ```

    构造函数的问题：

    ```javascript
    function Person(name, age, job){ 
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = new Function("alert(this.name)"); // 与声明函数在逻辑上是相等的
    }
    ```

    每个 Person 实例都包含一个不同的 Function 实例。因此不同实例上的同名函数是不相等的。然而，创建两个完成同样任务的 Function 实例的确没有必要。可以通过把函数定义转移到构造函数外部来解决这个问题

  * 原型模式（这一节最好照着书上的图看）

    我们创建的每个函数都有一个 prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法

    ```javascript
    function Person(){ 
    }
    
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 29;
    Person.prototype.job = "Software Engineer";
    Person.prototype.sayName = function(){
      alert(this.name);  
    };
    
    var person1 = new Person();
    person1.sayName(); // "Nicholas"
    var person2 = new Person();
    person2.sayName(); // "Nicholas"
    person1.sayName == person2.sayName
    ```

    > 创建完构造函数以后，其原型对象默认只会取得 constructor 属性，至于其他方法，则都是从 Object 继承而来。当调用构造函数创建一个新实例后，该实例的内部将包含一个指针（内部属性），指向构造函数的原型对象，叫`[[prototype]]`。在脚本中没有标准的方式访问`[[prototype]]`，但是有一个属性`_proto_`，这个链接存在于实例和构造函数的原型对象之间，而不是存在实例与构造函数之间。

    > 每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性，如果在实例中找到了这个属性，则返回该属性的值；如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。

    > 我们可以通过对象实例访问保存在原型中的值，但却**不能通过对象实例重写原型中的值**。如果我们在实例中添加了一个属性，而该属性与实例原型中的一个属性同名，那我们就在实例中创建该属性，该属性将会屏蔽原型中的那个属性
    >
    > ```javascript
    > function Person(){ 
    > }
    > 
    > Person.prototype.name = "Nicholas";
    > Person.prototype.age = 29;
    > Person.prototype.job = "Software Engineer";
    > Person.prototype.sayName = function(){
    >   alert(this.name);  
    > };
    > 
    > var person1 = new Person();
    > var person2 = new Person();
    > 
    > person1.hasOwnProperty("name"); // false
    > person2.hasOwnProperty("name"); // false
    > 
    > person1.name = "Greg";
    > person1.name; // "Greg"————来自实例
    > person2.name; // "Nicholas"————来自原型
    > person1.hasOwnProperty("name"); // true
    > person2.hasOwnProperty("name"); // false
    > 
    > delete person1.name;
    > person1.name; // "Nicholas"————来自原型
    > person1.hasOwnProperty("name"); // false
    > ```
    >
    > 当为对象添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性，换句话说，添加这个属性只会阻止我们访问原型中的那个属性，但不会修改那个属性。即使将这个属性设置为 null，也只会在实例中设置这个属性，从而让我们能够重新访问原型中的属性。

    > 使用`hasOwnProperty()`方法可以检测一个属性是存在于实例中，还是存在于原型中

    > 有两种方式使用 in 操作符：单独使用和在 for-in 循环中使用。在单独使用时，in 操作符会在通过对象能够访问给定属性时返回 true，无论该属性存在于实例中还是原型中
    >
    > ```javascript
    > function Person(){ 
    > }
    > 
    > Person.prototype.name = "Nicholas";
    > Person.prototype.age = 29;
    > Person.prototype.job = "Software Engineer";
    > Person.prototype.sayName = function(){
    >   alert(this.name);  
    > };
    > 
    > var person1 = new Person();
    > var person2 = new Person();
    > 
    > "name" in person1; // true
    > "name" in person2; // true
    > 
    > person1.name = "Greg";
    > 
    > "name" in person1; // true
    > 
    > // 同时使用 hasOwnProperty() 方法和 in 操作符就可以确定该属性到底是存在于对象中，还是存在于原型中
    > function hasPrototypeProperty(object,name){
    >     return !object.hasOwnProperty(name) && (name in object);
    > }
    > ```

    > ```javascript
    > // 要取得对象上所有的可枚举的实例属性，可以使用 Object.keys() 方法。接收一个对象作为参数，
    > // 返回一个包含所有可枚举属性的字符串数组
    > function Person(){ 
    > }
    > 
    > Person.prototype.name = "Nicholas";
    > Person.prototype.age = 29;
    > Person.prototype.job = "Software Engineer";
    > Person.prototype.sayName = function(){
    >   alert(this.name);  
    > };
    > 
    > var keys = Object.keys(Person.prototype);
    > alert(keys); // "name,age,job,sayName"
    > 
    > var p1 = new Person();
    > p1.name = "Rob";
    > p1.age = 31;
    > var p1keys = Object.keys(p1);
    > plkeys; // "name,age"
    > 
    > // Object.getOwnPropertyNames() 可以得到所有的实例属性，不论是否可以枚举，如 constructor
    > ```

    > 更简单的原型语法：字面量语法
    >
    > ```javascript
    > function Person(){ 
    > }
    > 
    > Person.prototype = {
    >     name: "Nicholas",
    >     age: 29,
    >     job: "Software Engineer",
    >     sayName: function(){
    >         alert(this.name);
    >     }
    > };
    > ```
    >
    > 但是有一个例外，constructor 属性不再指向 Person 了。每创建一个函数，就会同时创建他的 prototype 对象，这个对象也会自动获得 constructor 属性。而这里的语法，本质上完全重写了默认的 prototype 对象，因此 constructor 属性也就变成了新对象的 constructor 属性（指向 Object 构造函数），不再指向 Person 函数。此时，尽管 instanceof 能返回正确的结果，但通过 constructor 已经无法确定对象的类型了
    >
    > ```javascript
    > var friend = new Person();
    > 
    > friend instanceof Object; // true
    > friend instanceof Person; // true
    > friend.constructor == Person; // false
    > friend.constructor == Object; // true
    > ```
    >
    > 如果 constructor 的值真的很重要，可以像下面这样特意将它设置回适当的值
    >
    > ```javascript
    > function Person(){ 
    > }
    > 
    > Person.prototype = {
    >     constructor: Person,
    >     name: "Nicholas",
    >     age: 29,
    >     job: "Software Engineer",
    >     sayName: function(){
    >         alert(this.name);
    >     }
    > };
    > var friend = new Person(); // "Nicholas"
    > console.log(friend.sayName());
    > Person.prototype = {
    >     constructor: Person,
    >     name: "Nicholas",
    >     age: 29,
    >     job: "Software Engineer",
    >     sayName: function(){
    >         alert(1);
    >     }
    > };
    > console.log(friend.sayName()); // "Nicholas"
    > ```
    >
    > 但是这种方式的 constructor 属性的特性`[[Enumerable]]`将被设置为 true。而默认情况下时 false，此时，可以用 `Object.defineProperty()`。
    >
    > ```javascript
    > Object.defineProperty(Person.prototpe, "constructor", {
    >     enumerable: false,
    >     value: Person
    > })
    > ```

    > 原型的动态性
    >
    > ```javascript
    > function Person(){
    > }
    > 
    > var friend = new Person();
    > 
    > Person.prototype = {
    >     constructor: Person,
    >     name: "Nicholas",
    >     age: 29,
    >     job: "Software Engineer",
    >     sayName: function(){
    >         alert(1);
    >     }
    > };
    > 
    > friend.sayName(); // error
    > ```
    >
    > 首先我们创造了 Person 的一个实例，然后又重写了其原型对象。调用 `friend.sayName()` 时发生了错误，因为 friend 指向的原型中不包含以该名字命名的属性。

    > 原型对象的问题：
    >
    > (1) 所有实例在默认情况下都将取得相同的属性值
    >
    > (2) 原型中的所有属性是被很多实例共享的，这种共享对函数非常合适，对于包含基本值的属性也说的过去，然而，对于引用类型值的属性来说，问题就比较突出了
    >
    > ```javascript
    > function Person(){
    > }
    > 
    > Person.prototype = {
    >     constructor: Person,
    >     name: "Nicholas",
    >     age: 29,
    >     job: "Software Engineer",
    >     friends: ["Shelby","Court"]
    >     sayName: function(){
    >         alert(1);
    >     }
    > };
    > 
    > var person1 = new Person();
    > var person2 = new Person();
    > 
    > person1.friends.push("Van");
    > 
    > person1.friends; // "Shelby,Court,Van"
    > person2.friends; // "Shelby,Court,Van"
    > person1.friends === person2.friends; // true	
    > ```

  * 组合使用构造函数模式和原型模式

    > 创建对象**最常见的方式**，就是组合使用构造函数模式与原型模式。构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性
    >
    > ```javascript
    > function Person(name, age, job){
    >     this.name = name;
    >     this.age = age;
    >     this.job = job;
    >     this.friends = ["Shelby","Court"];
    > }
    > 
    > Person.prototype = {
    >     constructor: Person,
    >     sayName: function(){
    >         alert(this.name);
    >     }
    > }
    > 
    > var person1 = new Person("Nicholas",29,"Software Engineer");
    > var person2 = new Person("Greg",27,"Doctor");
    > 
    > person1.friends.push("Van");
    > person1.friends; // "Shelby,Court,Van"
    > person2.friends; // "Shelby,Court"
    > person1.friends === person2.friends; // false
    > person1.sayName === person2.sayName; // true
    > ```

  * 动态原型模式

    > 动态原型模式致力于把所有信息都封装在构造函数中，通过检查某个应该存放的方法是否有效，来决定是否需要初始化原型
    >
    > ```javascript
    > function Person(name, age, job){
    >     this.name = name;
    >     this.age = age;
    >     this.job = job;
    >     if(typeof this.sayName != "function"){
    >         Person.prototype.sayName = function(){
    >             alert(this.name);
    >         }
    >     }
    > }
    > ```
    >
    > 这里只在 `sayName()` 方法不存在的情况下，才会将它添加到原型中，这段代码只会在初次调用构造函数时才会执行

  * 寄生构造函数模式（知道）类似工厂模式，只不过创建实例时用的 new 操作符

  * 稳妥构造函数模式（知道）只能通过构造函数里面的方法访问数据成员

* 继承

  * 原型链

    > 原型链是实现继承的主要方法，基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。
    >
    > ```javascript
    > function SuperType(){
    >     this.property = true;
    > }
    > SuperType.prototype.getSuperValue = function(){
    >     return this.property;
    > }
    > function SubType(){
    >     this.subproperty = false;
    > }
    > 
    > // 继承了 SuperType
    > SubType.prototype = new SuperType(); // 执行这一步时，相当于重写 SubType.prototype 
    > 
    > SubType.prototype.getSubValue = function(){
    >     return this.subproperty;
    > }
    > var instance = new SubType();
    > alert(instance.getSuperValue()); // true
    > ```

    > 以上代码定义了两个类型：SuperType 和 SubType。每个类型分别有一个属性和方法。他们的主要区别是 SubType 继承了 SuperType，而继承是通过创建 SuperType 的实例，并将该实例付给了 SubType.prototype 实现的。实现的本质是重写原型对象，代之以一个新类型的实例，换句话说，原来存在于 SuperType 的实例中的所有属性和方法，现在也存在于 SubType.prototype 中了。在确立了继承关系以后，我们给 SubType.prototype 添加了一个方法，这样就在继承了 SuperType 的属性和方法的基础上又添加了一个新方法。

    * 确定原型和实例的关系

    > 可以通过两种方式来确定原型和实例之间的关系
    >
    > (1) `instanceof`
    >
    > (2) `isPrototypeOf`
    >
    > ```javascript
    > instance instanceof Object; // true
    > instance instanceof SuperType; // true
    > instance instanceof SubType; // true
    > 
    > Object.prototype.isPrototypeOf(instance); // true
    > SuperType.prototype.isPrototypeOf(instance); // true
    > SubType.prototype.isPrototypeOf(instance); // true
    > ```

    * 原型链的问题

    > 最主要的问题来自包含引用类型值的原型
    >
    > 第二个问题是在创建子类型的实例时，不能向超类型的构造函数中传参数 

  * 借用构造函数

    也叫经典继承或者伪造对象，基本思想即在子类型构造函数的内部调用超类型构造函数。通过`apply()`和`call()`方法也可以在新创建的对象上执行构造函数

    ```javascript
    function SuperType(){
        this.colors = ["red", "blue", "green"];
    }
    
    function SubType(){
        // 继承了 SuperType
        SuperType.call(this);
    }
    
    var instance1 = new SubType();
    instance1.colors.push("black");
    instance1.colors; // "red,black,green,black"
    
    var instance2 = new SubType();
    instance2.colors; // "red,black,green"
    ```

  * 组合继承

    也叫伪经典继承，指的是将原型链和借用构造函数技术组合在一块，从而发挥二者之长的一种继承模式，思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。

    ```javascript
    function SuperType(name){
        this.name = name;
        this.colors = ["name", "blue", "green"];
    }
    SuperType.prototype.sayName = function(){
        alert(this.name);
    };
    function SubType(name, age){
        
        // 继承属性
        Supertype.call(this,name); // 第二次调用 SuperType()
        
        this.age = age;
    }
    
    // 继承方法
    SubType.prototype = new SuperType(); // 第一次调用 SuperType()
    SubType.prototype.constructor = SubType;
    SubType.prototype.sayAge = function(){
        alert(this.age);
    };
    
    var instance1 = new SubType("Nicholas", 29);
    instance1.colors.push("black");
    instance1.colors; // "red,black,green,black"
    instance1.sayName(); // "Nicholas"
    isntance1.sayAge(); // 29
    
    var instance2 = new SubType("Greg", 27);
    instance2.colors; // "red,black,green"
    instance2.sayName(); // "Greg"
    isntance2.sayAge(); // 27
    ```

    > 在这个例子中，SuperType 构造函数定义了两个属性：name 和 colors。SuperType 的原型定义了一个方法 `sayName()`。SubType 构造函数在调用 SuperType 构造函数时传入了 name 参数，紧接着又定义了它自己的属性 age。然后，将 SuperType 的实例赋值给 SubType 的原型，然后又在该新原型上定义了方法`sayAge()`。这样一来，就可以让两个不同的 `SubType` 实例既分别拥有自己属性，又可以使用相同的方法了
    >
    > 组合式继承最大问题就是无论在什么情况下都会调用两次超类型的构造函数：一次是在创建子类型原型的时候，另一次是在子类型构造函数，这就会造成一个问题，实例和原型上面具有相同的属性

  * 原型式继承

    原理是借助原型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型

    ```javascript
    function object(o){
        function F(){}
        F.prototype = o;
        return new F();
    }
    ```

    在`object()`函数内部，先创建了一个临时性的构造函数，然后将传入的对象作为整个构造函数的原型，最后返回了这个临时类型的一个新实例。从本质上讲`object()`对传入其中的对象执行了一次浅复制

    ```javascript
    var person = {
        name: "Nicholas",
        friends: ["Shelby", "Court", "Van"]
    };
    
    var anotherPerson = object(person);
    anotherPerson.name = "Greg";
    anotherPerson.friends.push("Rob");
    
    var yetAnotherPerson = object(person);
    yetAnotherPerson.name = "Linda";
    yetAnotherPerson.friends.push("Barbie");
    
    person.friends; // "Shelby,Court,Van,Rob,Barbie"
    ```

    原型式继承要求你必须有一个对象可以作为另一个对象的基础。如果有这么一个对象的话，可以把它传递给`object()`函数，然后再根据具体需求对得到的对象加以修改即可。在这个例子中，可以作为另一个对象基础的是 person 对象，于是我们把它传入`object()`函数中，然后该函数就会返回一个新对象，这个新对象将 person 作为原型，所以它的原型中就包含一个基本类型值属性和一个引用类型值属性。这意味着 person.friends 不仅属于 person 所有，而且也会被 anotherPerson 以及 yetAntherPerson 共享，这就相当于又创建了 person 对象的两个副本

    ES5 通过新增 `Object.create()` 方法规范化了原型式继承。在这个方法接收两个参数：一个用作新对象原型的对象和一个为新对象定义额外属性的对象，在传入一个参数的情况下，`Object.create()` 与 `object()` 方法的行为相同

    ```javascript
    var person = {
        name: "Nicholas",
        friends: ["Shelby", "Court", "Van"]
    };
    var anotherPerson = Object.create(person);
    anotherPerson.name = "Greg";
    anotherPerson.friends.push("Rob");
    
    var yetAnotherPerson = Object.create(person);
    yetAnotherPerson.name = "Linda";
    yetAnotherPerson.friends.push("Barbie");
    
    person.friends; // "Shelby,Court,Van,Rob,Barbie"
    
    var person3 = Object.create(person,{
        name:{
            value:'Greg',
        } 
    });
    person3.name; // "Greg"
    ```

  * 寄生式继承

    寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像是它做了所有工作一样返回对象

    ```javascript
    function createAnother(orginal){
        var clone = object(orginal);
        clone.sayHi = function(){
            alert("hi");
        };
        return clone;
    }
    
    var person = {
        name: "Nicholas",
        friends: ["Shelby", "Court", "Van"]
    };
    
    var anotherPerson = createAnother(person);
    anotherPerson.sayHi; // "hi"
    ```

  * 寄生组合式继承

    寄生组合式继承即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。基本思路是：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后将结果指定给子类型的原型

    ```javascript
    function inheritPrototype(subType,superType){
        var prototype = object(superType.prototype); // 创建对象
        prototype.constructor = subType; // 增强对象
        subType.protoType = prototype; // 指定对象
    }
    ```

    ```javascript
    function SuperType(name){
        this.name = name;
        this.colors = ["red", "blue", "green"];
    }
    
    SuperType.prototype.sayName = function(){
        alert(this.name);
    };
    
    function SubType(name, age){
        SuperType.call(this, name);
        
        this.age = age;
    }
    
    inheritPrototype(Subtype,SuperType);
    
    SubType.prototype.sayAge = function(){
        alert(this.age);
    };
    ```


##### 第七章 函数表达式

* 定义函数的方式

  * 函数声明：关于函数声明，最重要的特征就是函数声明提升，它意味着在执行代码之前会先读取函数声明

    ```javascript
    sayHi(); // 不会报错
    function sayHi(){
        alert("Hi!");
    }
    ```

  * 函数表达式

    ```javascript
    var functionName = function(arg0, arg1, arg2){
        // 函数体
    };
    ```

    这种方式是创建一个函数并将它赋值给变量 functionName。这种情况下创建的函数叫做匿名函数，因为 function 关键字后面没有标识符

    ```javascript
    // 函数表达式和其他表达式一样，使用前必须先赋值，以下代码会报错
    sayHi(); // 会报错
    var sayHi = function(){
        alert("Hi!");
    };
    ```

  * 闭包

    闭包是指有权访问另一个函数作用域中变量的函数。

    由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。

    * 闭包与变量

      作用域链的副作用：闭包只能取得包含函数中任何变量的最后一个值

      ```javascript
      function createFunctions(){
          var result = new Array();
          
          for(var i = 0; i < 10; i++){
              result[i] = function(){
                  return i;
              };
          }
          
          return result;
      }
      ```

      这个函数会返回一个数组。表面上看，似乎每个函数都应该返回自己的索引值，即位置 0 的函数返回 0，位置 1 的函数返回 1，以此类推。但实际上，每个函数都返回 10，因为每个函数的作用域链中都保存着 `createFunctions()` 函数的活动对象，所以它们引用的都是同一个变量 i 。当 `createFunctions()` 函数返回后，变量 i  的值是 10，此时每个函数都引用着保存变量 i 的同一个变量对象，所以在每个函数内部 i 的值都是10。但是，我们可以通过创建另一个匿名函数强制让闭包的行为符合预期，如下

      ```javascript
      function createFunctions(){
          var result = new Array();
          
          for(var i = 0; i < 10; i++){
              result[i] = function(num){
                  return function(){
                      return num;
                  }
              }(i);
          }
          
          return result;
      }
      ```

    * 关于 this 对象

      ```javascript
      var name = "The Window";
      
      var object = {
          name: "My Object",
          
          getNameFunc: function(){
              return function(){
                  return this.name;
              };
          }
      };
      
      object.getNameFunc()(); // "The Window"
      ```

      前面曾提到过，每个函数在被调用的时候都会自动取得两个特殊变量：this 和 arguments。内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不可能直接访问外部函数中的这两个变量。不过，把外部作用域中的 this 对象保存在一个闭包能够访问到的变量里，就可以让闭包访问该对象了

      ```javascript
      var name = "The Window";
      
      var object = {
          name: "My Object",
          
          getNameFunc: function(){
              var that = this;
              return function(){
                  return that.name;
              };
          }
      };
      
      object.getNameFunc()(); // "My Object"
      ```

      ```javascript
      var name = "The Window";
      
      var object = {
          name: "My Object",
          
          getName: function(){
              return this.name;				
          }
      };
      object.getName(); // "My Object"
      (object.getName)(); // "My Object"
      (object.getName = object.getName)(); // "The Window"
      ```

      第二行代码在调用这个方法前先给它加上了括号，虽然加上括号之后，就好像是在引用一个函数，但 this 的值得到了维持，因为 `object.getName` 和 `(object.getName)` 的定义是相同的。

      第三行代码先执行了一个赋值语句，然后在调用赋值后的结果，因为这个函数表达式的值是函数本身，所以 this 的值不能维持

      ```javascript
      (object.getName = object.getName)(); // "The Window"
      // 等价于
      (object.getName = function(){
          return this.name;
      })();
      // 等价于
      (function(){
          return this.name
      })();
      ```

    * 内存泄漏

      如果闭包的作用域链中保存着一个 HTML 元素，那就意味着该元素将无法被销毁

      ```javascript
      function assignHandler(){
          var element = document.getElementById("someElement");
          element.onclick = function(){
              alert(element.id);
          }
      }
      ```

      以上代码创建了一个作为 element 元素事件处理程序的闭包，而这个闭包则又创建了一个循环引用。由于匿名函数保存了一个对 `assignHandler()` 的活动对象的引用，因此就会导致无法减少 element 的引用数。只要匿名函数存在，element 的引用数至少也是 1，因此它所占用的内存就永远不会被回收。不过这个问题可以通过稍微改写一下代码来解决，如下所示

      ```javascript
      function assignHandler(){
          var element = document.getElementById("someElement");
          var id = element.id;
          element.onclick = function(){
              alert(id);
          }
          element = null;
      }
      ```

      上面的代码中，通过把 element.id 的一个副本保存在一个变量中，并且在闭包中引用该变量消除了循环引用。但仅仅做到这一步，还是不能解决内存泄漏的问题。必须要记住：**闭包会引用包含函数的整个活动对象**，而其中包含着 element。即使闭包不直接引用 element，包含函数的活动对象中也仍然会保存一个引用，因此，有必要把 element 变量设置为 null。这样就能解除对 DOM 对象的引用，顺利地减少其引用数，确保正常回收其占用的内存。

  * 模仿块级作用域

    ```javascript
    (function(){
        // 这里是块级作用域
    })();
    ```

    这种做法可以减少闭包占用的内存问题，因为没有指向匿名函数的引用，只要函数执行完毕，就可以立即销毁其作用域链。

  * 私有变量

    javascript 中没有私有成员的概念，但是有一个私有变量的概念，任何在函数中定义的变量，都可以认为是私有变量，因为不能再函数外部访问这些变量。私有变量包括函数的参数，局部变量和在函数内部定义的其他函数

    ```javascript
    function add(num1, num2){
        var sum = num1 + num2;
        return sum;
    }
    ```

    在这个函数内部，有 3 个私有变量：num1、num2 和 sum。在函数内部可以访问这几个变量，在函数外部则不能访问它们。如果在这个函数内部创建一个闭包，那么闭包通过自己的作用域链也可以访问这些变量。利用这一点，就可以创建用于访问私有变量的公有方法。

    我们把有权访问私有变量和私有函数的公有方法称为特权方法。有两种在对象上创建特权方法的方式，第一种是在构造函数中定义特权方法，基本模式如下：

    ```javascript
    function MyObject(){
        // 私有变量和私有函数
        var privateVariable = 10;
        function privateFunction(){
            return false;
        }
        // 特权方法
        this.publicMethod = function(){
            privateVariable++;
            return privateFunction();
        }
    }
    ```

    这个模式在构造函数内部定义了所有私有变量和函数。然后又继续创建了能够访问这些私有成员的特权方法。能够在构造函数中定义特权方法，是因为特权方法作为闭包有权访问在构造函数中定义的所有变量和函数。对这个例子而言，变量`privateVariable` 和函数 `privateFunction()` 只能通过特权方法 `publicMethod()` 来访问。在创建 `MyObject` 的实例后，除了使用 `publicMehtod()` 这一个途径外，没有任何办法可以直接访问 `privateVariable` 和 `privateFunction()` 

    利用私有和特权成员，可以隐藏那些不应该被直接修改的数据，如

    ```javascript
    function Person(name){
        this.getName = function(){
            return name;
        };
        this.setName = function(value){
            name = value;
        };
    }
    
    var person = new Person("Nicholas");
    person.getName(); // "Nicholas"
    person.setName("Greg");
    person.getName(); // "Greg"
    ```

    以上代码的构造函数中定义了两个特权方法，`getName() `和 `setName()`。这两个方法都可以在构造函数的外部使用，而且都有权访问私有变量 name。但在 Person 构造函数外部，没有任何办法访问 name。

    * 静态私有变量

      ```javascript
      (function(){
          // 私有变量和私有函数
          var privateVariable = 10;
          function privateFunction(){
              return false;
          }
          
          // 构造函数
          MyObject = function(){
          };
          
          // 公有/特权方法
          MyObject.prototype.publicMethod = function(){
              privateVariable++;
              return privateFunction();
          }
      })();
      ```

      这个模式创建了一个私有作用域，并在其中封装了一个构造函数及相应的方法。在私有作用域中，首先定义了私有变量和私有函数，然后又定义了构造函数及其公有方法。公有方法实在原型上定义的，这一点体现了典型的原型模式。需要注意的是，这个模式在定义构造函数时并没有使用函数声明，而是使用了函数表达式。函数声明只能创建局部函数。因此，没有在声明 `MyObject` 时使用 `var` 关键字。**初始化未经声明的变量，总是会创建一个全局变量 **。因此，`MyObject` 就成了一个全局变量，能够在私有作用域之外被访问到。但是严格模式下会报错。

      这个模式与在构造函数中定义特权方法的主要区别在于私有变量和函数是由实例共享的。由于特权方法是在原型上定义的，因此所有实例都使用同一个函数，而这个特权方法，作为一个闭包，总是保存着对包含作用域的引用。

      ```javascript
      (function(){
          
          var name = "";
          
          Person = function(value){
              name = value;
          };
          
          Person.prototype.getName = function(){
              return name;
          };
          
           Person.prototype.setName = function(value){
              name = value;
          };
      })();
      
      var person1 = new Person("Nicholas");
      person1.getName(); // "Nicholas"
      person1.setName("Greg");
      person1.getName(); // "Greg"
      
      var person2 = new Person("Michael");
      person1.getName(); // "Michael"
      person2.getName(); // "Michael"
      
      ```

      这个例子中 Person 构造函数与 `getName()` 和 `setName()` 方法一样，都有权访问私有变量 name。

      在这种模式下，变量 name 就编程了一个静态的、由所有实例共享的属性。也就是说，在一个实例上调用 `setName()` 会影响到所有实例

      以这种方式创建静态私有变量会因为使用原型而增进代码复用，但是每个实例都没有自己的私有变量。

    * 模块模式

      模块模式视为单例创建私有变量和特权方法，单例指的就是只有一个实例的对象。

      按照惯例，javascript 是以对象字面量的方式来创建单例对象的。

      ```javascript
      var singleton = {
          name: value;
          method: function(){
          	// 这里是方法的代码
      	}
      };
      ```

      模块模式通过为单例添加私有变量和特权方法能够使其得到增强，如下

      ```javascript
      var singleton = function(){
           // 私有变量和私有函数
          var privateVariable = 10;
          function privateFunction(){
              return false;
          }
          
          // 特权/公有方法和属性
          return {
              publicProperty: true,
              publicMethod: function(){
                  privateVariable++;
              	return privateFunction();
              }
          };
      }();
      ```

      这个模块模式使用了一个返回对象的匿名函数，在这个匿名函数内部，首先定义了私有变量和函数，然后讲一个对象字面量作为函数的值返回。返回的对象字面量中只包含可以公开的属性和方法。由于这个对象实在匿名函数内部定义的，因此它的公有方法有权访问私有变量和函数。从本质上来讲，这个对象字面量定义的是单例的公共接口。这种模式在需要对单例进行某些初始化，同时又需要维护其私有变量时是非常有用的。

      模块模式需要具备两个必要条件：

      (1) 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）

      (2) 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态

      一个具有函数属性的对象本身并不是真正的模块，一个从函数调用所返回的，只有数据属性而没有闭包函数的对象并不是真正的模块



#####第十章 DOM

DOM（文档对象模型）可以将任何 HTML 或 XML 文档描绘成一个由多层结点构成的结构

* Node 类型

  每个结点都有一个 nodeType 属性，用于标明结点的类型。常用结点 nodeType 如下

  * `元素结点` Node.Element_Node(1)
  * `属性结点` Node.ATTRIBUTE_Node(2)
  * `文本结点` Node.TEXT_Node(3)

  ```javascript
  //判断结点类型
  if(someNode.nodeType == Node.Element_Node){ // 在 ie 中无效
      //操作
  }
  //或
  if(someNode.nodeType == 1){ // 适用于所有浏览器
      //操作
  }
  ```

  > (1) nodeName 和 nodeValue 属性

  > (2) 节点关系
  >
  > 每个节点都有一个 childNodes 属性，其中保存着一个 NodeList 对象
  >
  > NodeList 是一个类数组对象，可以通过位置访问
  >
  > ```javascript
  > var fistChild = someNode.childNodes[0];
  > var secondChild = someNode.childNodes.item(1);
  > // length 属性表示的是访问的那一刻的长度，包含着结点数量
  > var count = someNode.childNodes.length;
  > // 可以通过对 arguments 使用 Array.prototype.slice() 方法将类数组对象转换为数组
  > function convertToArray(nodes){
  >     var array = null;
  >     try{
  >         array = Array.prototype.slice.call(nodes,0); // 非 ie
  >     }catch(ex){ // ie
  >         array = new Array();
  >         for(var i=0,len = nodes.length;i<len;i++){
  >             array.push(nodes[i])
  >         }
  >     }
  >     return array;
  > }
  > ```
  >
  > 每个节点都有一个 parentNode 属性，该属性指向文档树中的父节点，包含在 childNodes 列表中的所有结点都具有相同的父节点，因此它们的 parentNode 属性都指向同一个结点。此外，包含在 childNodes 列表中的每个结点相互之间都是同胞节点。通过使用列表中每个节点的 previousSibling 和 nextSibling 属性，可以访问同一列表中的其他节点。列表中第一个节点的 previousSilbing 属性为 null，而列表中的最后一个节点的 nextSibling 属性的值同样也为 null。
  >
  > 父节点的 firstChild 和 lastChild 分别指向 childNodes 列表中的第一个和最后一个节点

  > (3) 操作节点
  >
  > `appendChild()` 用于向 childNodes 列表的末尾添加一个结点。添加完以后，childNodes 的新增结点、父节点及以前的最后一个子节点的关系指针都会得到相应的更新，该方法返回新增的节点。
  >
  > ```javascript
  > var returnedNode = someNode.appendChild(newNode);
  > returnedNode == newNode; // true
  > someNode.lastChild == newNode; // true
  > ```
  >
  > 如果传入的节点已经是文档的一部分，那结果就是将该节点从原来的位置转移到新位置
  >
  >  `insertBefore()`：如果要把节点放在 childNodes 列表中的某个特定的位置上，而不是末尾，可以使用 `insertBefore()` 方法。这个方法接收两个参数：要插入的节点和作为参照的节点。插入后，被插入的节点会变成参照节点的前一个同胞节点（previousSibling）同时被方法返回
  >
  > ```javascript
  > // 插入后成为最后一个子节点
  > returnedNode = someNode.insertBefore(newNode,null);
  > newNode == someNode.lastChild; // true
  > 
  > // 插入后成为第一个子节点
  > var returnedNode = someNode.insertBefore(newNode,someNode.firstChild);
  > returnedNode == newNode; // true
  > newNode == someNode.firstNode; // true
  > 
  > // 插入到最后一个子节点前面
  > returnedNode = someNode.insertBefore(newNode,someNode.lastChild);
  > newNode == someNode.childNode[someNode.childNodes.length - 2]; // true
  > ```
  >
  > `replaceChild()`：接受两个参数：要插入的节点和要替换的节点。要替换的节点将由这个方法返回并从文档中移除，同时由要插入的节点占据其位置
  >
  > ```javascript
  > // 替换第一个子节点
  > var returnedNode = someNode.replace(newNode,someNode.firstChild);
  > 
  > // 替换最后一个子节点
  > returnedNode = someNode.replace(newNode,someNode.lastChild);
  > ```
  >
  > `removeChild()`：移除而非替换节点，接收一个参数，即要移除的节点，被移除的节点将成为方法的返回值。
  >
  > ```javascript
  > // 移除第一个子节点
  > var formerFirstChild = someNode.removeChild(someNode.firstChild);
  > 
  > // 移除最后一个子节点
  > var formerLastChild = someNode.removeChild(someNode.lastChild);
  > ```

  > (4) 其他方法
  >
  > `cloneNode()`：接收一个布尔值参数，表示是否进行深复制。如果为 true，则复制节点及整个字节点树。如果为 false，执行浅复制，只复制节点本身。复制后的节点需要通过 `appendChild()`、`insertBefor() ` 或 `replaceChild()` 将它添加到文档中。

* Document 类型

  * 查找元素

    ```javascript
    var div = document.getElementById("myDiv");
    var images = document.getElementsByTagName("img");
    images[0].src; // 输出第一个图像元素的 src 特性
    images.item(0).src; // 输出第一个图像元素的 src 特性
    ```

    要取得文档中的所有元素，可以向 `getElementsByTagName()` 中传入`*`。

    ```javascript
    var allElements = document.getElementsByTagName("*");
    ```

    特殊集合

    ```javascript
    document.anchors // 包含文档中所有带 name 特性的 <a> 元素
    document.forms // 包含文档中所有的 <form> 元素
    document.images // 包含文档中所有的 <img> 元素
    document.links // 包含文档中所有带 href 特性的 <a> 元素
    ```

* Element 类型

  取得特性

  `getAttribute()` 传递给它的特姓名与实际的特姓名相同

  `setAttribute()` 这个方法接收两个参数：要设置的特性名和值，如果特性名存在则重新设置，如果不存在则创建该特性并设置相应的值

  `removeAttribute()` 

  ```javascript
  var div = document.getElementById("myDiv");
  div.getAttribute("class");
  div.getAttribute("id"); // ID 也可以，不区分大小写
  div.getAttribute("title");
  
  div.setAttribute("id","someOtherId");
  div.setAttribute("class","ft"); 
  div.setAttribute("title","Some Other text");
  ```

* 创建元素

  `document.createElement()`：这个方法只接受一个参数，即要创建元素的标签名。不区分大小写。

  ```javascript
  var div = document.createElement("div");
  div.id = "myDiv";
  div.className = "box";
  document.body.appendChild(div);
  
  // 另一种方法
  var div = document.createElement("<div id=\"myDiv\" class=\"box\"></div>")
  ```

* Text 类型

  可以通过 nodeValue 属性或 data 属性访问 Text 节点中包含的文本

  `createTextNode()` 创建新文本节点，接收一个参数，要插入节点中的文本。

  ```javascript
  // 创建一个 <div> 元素并向其中添加一条消息
  var element = document.createElement("div");
  element.className = "message";
  
  var textNode = document.createTextNode("<strong>Hello</strong> world!");
  emement.appendChild(textNode);
  document.body.appendChild(element);
  ```



##### 第十一章 DOM 扩展

选择符API

`querySelector()`：接收一个 css 选择符，返回与该模式匹配的第一个元素，如果没有，返回 null

`querySelectorAll()`：接收参数与上面一样，返回的是一个 NodeList 的实例

```javascript
// 取得 body 元素
var body = document.querySelector("body");

// 取得 ID 为 "myDiv" 的元素
var myDiv = document.querySelector("#myDiv");

// 取得类为 "button" 的第一个图像元素
var img = document.querySelector("img.button");
```

```javascript
// 取得某 <div> 中的所有 <em>元素（类似于getElementByTagName("em")）
var ems = document.getElementById("myDiv").querySelectorAll("em");

// 取得类为 "selected" 的所有元素
var selecteds = document.querySelectorAll(".selected"); 
```

* HTML5

  * `getElementsByClassName()`：接收一个参数，即一个包含一或多个类名的字符串

    ```javascript
    // 取得所有类中包含 "username" 和 "current" 的元素，类名的先后顺序无所谓
    var allCurrentUsernames = document.getElementsByClassName("username current");
    ```




##### 第十二章 DOM2 和 DOM3

DOM1 级主要定义的是 HTML 和 XML **文档的底层结构**。DOM2 和 DOM3 级则在这个结构的基础上引入了**更多的交互能力**，也支持了更高级的 XML 特性。因此，DOM2 和 DOM3 级分为许多模块，如下

> (1) DOM2 级核心：在 1 级核心基础上构建，为节点添加了更多方法和属性
>
> (2) DOM2 级视图：为文档定义了基于样式基本信息的不同视图
>
> (3) DOM2 级事件：说明了如何使用事件与 DOM 文档交互
>
> (4) DOM2 级样式：定义了如何以编程方式来访问和改变 CSS 样式信息。
>
> (5) DOM2 级遍历和范围：引入了遍历 DOM 文档和选择其特定部分的新接口
>
> (6) DOM2 级 HTML：在 1 级 HTML 基础上构建，添加了更多属性，方法和新接口

* 样式

  * 访问元素的样式

    对于用段划线的 css 属性名，必须将其转换为驼峰大小写形式，才能通过 javascript 来访问。如下

    ```javascript
    var myDiv = document.getElementById("myDiv");
    
    // 设置背景颜色
    myDiv.style.backgroundColor = "red";
    
    // 改变大小
    myDiv.style.width = "100px";
    myDiv.style.height = "200px";
    
    // 指定边框
    myDiv.style.border = "1px solid black";
    ```

    在以这种方式改变样式时，元素的外观会自动被更新

#####第十三章 事件

事件就是文档或浏览器窗口发生的一些特定的交互瞬间，观察员模型。

* 事件流

  事件流描述的是从页面中接收事件的顺序

  (1) IE 的事件流是事件冒泡流

  (2) Netscape Communicator 的事件流是事件捕获流

  *  事件冒泡

    即事件开始由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。例如

    ``` html
    <!DOCTYPE html>
    <html>
        <head>
            <title>Event Bubbing Example</title>
        </head>
        <body>
            <div>
                Click Me!
            </div>
        </body>
    </html>
    ```

    如果你单击了页面中的 `div` 元素，那么这个 `click` 事件会按照如下顺序传播

    (1) div

    (2) body

    (3) html

    (4) document

    也就是说，click 事件首先在 div 元素上发生，然后沿 DOM 树向上传播，在每一级节点上都会发生，直至传播到 document 对象

  * 事件捕获

    事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件

    如果按之间的页面作为例子，则会按照如下顺序传播

    (1) document

    (2) html

    (3) body

    (4) div

* DOM 事件流

  “DOM2 级事件” 规定的事件流包括三个阶段：事件捕获阶段，处于目标阶段和事件冒泡阶段。

  ![事件流](https://images2015.cnblogs.com/blog/315302/201606/315302-20160621155328756-279009443.png)

  在 DOM 事件流中，实际的目标（div 元素）在捕获阶段不会接收到事件

* 事件处理程序

  事件就是用户或浏览器自身执行的某种动作，如`click`、`load` 和 `mouseover`，都是事件的名字。

  而相应某个事件的函数就叫做事件处理程序（或事件监听器）。事件处理程序的名字以 “on” 开头。

  为事件指定处理程序的方式有好几种。

  * HTML 事件处理程序

    ```html
    <input type="button" value="Click Me" onclick="alert('Clicked')"/>
    <input type="button" value="Click Me" onclick="showMessage()"/>
    <script>
        function showMessage(){
            alert("Hello world！");
        }
    </script>
    ```

  * DOM0 级事件处理程序

    通过 javascript 指定事件处理程序，即将一个函数赋值给一个事件处理程序属性

    优点：

    (1) 简单

    (2) 具有跨浏览器的优势

    要为 javascript 指定事件处理程序，首先必须取得一个要操作的对象的引用，

    ```javascript
    var btn = document.getElementById("myBtn");
    btn.onclick = function(){
        alert("Clicked!");
        // 使用 DOM0 级方法指定的事件处理程序被认为是元素的方法，因此，程序中的 this 指向当前元素
        alert(this.id); // "myBtn"
    };
    btn.onclick = null; // 删除事件处理程序
    ```

  * DOM2 级事件处理程序

    ”DOM2 级事件” 定义了两个方法，用于处理指定和删除事件处理程序的操作：`addEventListener()` 和 `removeEventListener()`。所有 DOM 节点都包含这两个方法，并且它们都接受 3 个参数：要处理的事件名，作为事件处理程序的函数和一个布尔值。这个布尔值如果是 `true`，表示在事件捕获阶段调用事件处理程序，`false` 表示在事件冒泡阶段调用事件处理程序

    在按钮上为 `click` 事件添加事件处理程序

    ```javascript
    var btn = document.getElementById("myBtn");
    btn.addEventListener("click",function(){
        alert("this.id"); // myBtn
    },false)
    ```

     优点：可以添加多个事件处理程序

    ```javascript
    var btn = document.getElementById("myBtn");
    btn.addEventListener("click",function(){
        alert("this.id"); // myBtn
    },false)
    btn.addEventListener("click",function(){
        alert("Hello world!");
    },false)
    ```

    这两个事件处理程序会按照添加他们的顺序触发，因此会先显示 ***ID***，其次会显示 “Hello world!” 消息。

    通过 `addEventListener()` 添加的事件处理程序只能使用 `removeEventListener()` 来移除；移除时传入的参数与添加处理程序时使用的参数相同。这也意味着通过 `addEventListener()` 添加的匿名函数将无法移除。如：

    ```javascript
    var btn = document.getElementById("myBtn");
    btn.addEventListener("click",function(){
        alert("this.id"); // myBtn
    },false)
    btn.removeEventListener("click",function(){ // 没有用
        alert("this.id"); 
    },false)
    
    var handler = function(){
        alert("this.id");
    };
    btn.addEventListener("click",handler,false);
    btn.removeEventListener("click",handler,false); // 有效
    ```

  * IE 事件处理程序

    `attachEvent()` 和 `detachEvent()`，这两个方法接收两个参数，事件处理程序名称与事件处理函数，只会被添加到冒泡阶段

    ```javascript
    var btn = document.getElementById("myBtn");
    btn.attachEvent = ("onclick",function(){
        alert("Clicked!");
    });
    // 添加多个事件处理程序，以相反的顺序被触发，先 Hello World 然后才是 Clicked
    btn.attachEvent = ("onclick",function(){
        alert("Hello world");
    });
    // 匿名还是也是无法移除
    ```

  * 跨浏览器的事件处理程序

    ```javascript
    var EventUtil = {
    
    	addHandler:function(element,type,handler){
    		if(element.addEventListener){
    			element.addEventListener(type,handler,false);
    		}else if(element.attachEvent){
    			element.attachEvent("on"+type,handler);
    		}else{
    			element["on"+type] = handler;
    		}
    	},
    
    	removeHandler:function(element,type,handler){
    		if(element.removeEventListener){
    			element.removeEventListener(type,handler,false);
    		}else if(element.detachEvent){
    			element.detachEvent("on"+type,handler);
    		}else{
    			element["on"+type] = null;
    		}
    	}
    }
    // 使用方法
    var btn = document.getElementById("myBtn");
    btn.attachEvent = ("onclick",function(){
        alert("Clicked!");
    });
    EventUtil.addHandler(btn,"click",handler);
    EventUtil.removeHandler(btn,"click",handler);
    ```

* 事件对象

  在触发 DOM 上的某个事件时，会产生一个事件对象 event，这个对象中包含着所有与事件有关的信息。包括导致事件的元素，事件的类型以及其他与特定事件相关的信息。

  * DOM 中的事件对象

    兼容 DOM 的浏览器会将一个 event 对象传入到事件处理程序中，无论指定事件处理程序时使用什么方法（DOM0 级或 DOM2 级），都会传入 event 对象。

    ```javascript
    var btn = document.getElementById("myBtn");
    btn.onclick = function(event){
        alert(event.type); // "click"
    };
    btn.addEventListener("click",function(event){
        alert(event.type); // "click"
    },false);
    ```

    在事件处理程序内部，对象 this 始终等于 currentTarget 的值，而 target 则只包含事件的实际目标。如果直接将事件处理程序指定给了目标元素，则 this，currentTarget 和 target 包含相同的值

    ```javascript
    var btn = document.getElementById("myBtn");
    btn.onclick = function(event){
        alert(event.currentTarget === this); // true
        alert(event.target === this); // true
    };
    ```

    由于 click 事件的目标是按钮，所以这三个值是相同的。再看下面的例子

    ```javascript
    document.body.onclick = function(event){
        alert(event.currentTarget === document.body); // true
        alert(this === document.body); // true
        alert(event.target === document.getElementById("myBtn")); // true
    };
    ```

    target 是 click 事件真正的目标，由于按钮没有注册事件处理程序，所以就冒泡到了 document.body

    在需要通过一个函数处理多个事件时，可以用 type 属性，如

    ```javascript
    var btn = document.getElementById("myBtn");
    var handler = function(event){
        switch(event.type){
            case "click":
                alert("Clicked");
                break;
            case "mouseover":
                event.target.style.backgroundColor = "red";
                break;
            case "mouseout":
                event.target.style.backgroundColor = "";
                break;
        }
    }
    btn.onclick = handler;
    btn.onmouseover = hander;
    btn.onmouseout = hander;
    ```

    要阻止特定事件的默认行为，可以使用 `preventDefault()` 方法。例如

    ```javascript
    var link = document.getElementById("myLink");
    link.onclick = function(event){
        event.preventDefault(); // IE 为 window.event.cancelBubble = true;
    }
    ```

    阻止事件冒泡可以使用 `stopPropagation()`，例如

    ```javascript
    var btn = document.getElementById("myBtn");
    btn.onclick = function(event){
       	alert("Clicked");
        event.stopPropagation(); // IE 为 window.event.returnValue = false;
    };
    document.body.onclick = function(event){
        alert("Body clicked"); // 触发不了
    };
    ```

    事件对象的 `eventPhase` 属性可以用来确定事件当前处于事件流的哪个阶段。例如

    ```javascript
    var btn = document.getElementById("myBtn");
    // 事件处理程序处于目标身上
    btn.onclick = function(event){
       	alert(event.eventPhase); // 2
    };
    // 捕获阶段调用事件的处理程序
    document.addEventListener("click",function(event){
        alert(event.eventPhase); // 1
    },true);
    // 在冒泡阶段调用的事件处理程序
    document.body.onclick = function(event){
        alert(event.eventPhase); // 3
    };
    ```

  * 跨浏览器的事件对象

    ```javascript
    var EventUtil = {
    
    	addHandler:function(element,type,handler){
    		if(element.addEventListener){
    			element.addEventListener(type,handler,false);
    		}else if(element.attachEvent){
    			element.attachEvent("on"+type,handler);
    		}else{
    			element["on"+type] = handler;
    		}
    	},
    
    	getEvent:function(event){
    		return event ? event : window.event;
    	},
    
    	getTarget:function(event){
    		return event.target || window.event.srcElement;
    	},
    
    	preventDefault:function(event){
    		if(event.preventDefault){
    			return event.preventDefault();
    		}else{
    			event.returnValue = false;
    		}		
    	},
    
    	removeHandler:function(element,type,handler){
    		if(element.removeEventListener){
    			element.removeEventListener(type,handler,false);
    		}else if(element.detachEvent){
    			element.detachEvent("on"+type,handler);
    		}else{
    			element["on"+type] = null;
    		}
    	},
    
    	stopPropagation:function(event){
    		if(event.stopPropagation){
    			return event.stopPropagation();
    		}else{
    			event.cancelBubble = true;
    		}	
    	}
    }
    
    // 使用方法
    // 首先必须要调用 getEvent() 返回对 event 对象的引用
    var link = document.getElementById("myLink");
    link.onclick = function(event){
        event = EventUtil.getEvent(event); // 先取得 event 对象
        EventUtil.preventDefault(event);
    }
    ```

* 事件类型

  > UI 事件，当用户与页面上的元素交互时触发
  >
  > 焦点事件
  >
  > 鼠标事件
  >
  > 键盘与文本事件

  * UI 事件

    > load：当页面完全加载后在 window 上面触发，或 img 加载完毕后在 img 元素上触发等
    >
    > unload
    >
    > select：当用户选择文本框中的一个或多个字符时触发

  * 焦点事件

    > blur：元素失去焦点时触发，不会冒泡
    >
    > focus：元素获得焦点时触发，不会冒泡
    >
    > focusin：元素获得焦点时触发，会冒泡
    >
    > focusout：元素失去焦点时触发，会冒泡

    当焦点从页面的一个元素移动到另一个元素，会依次触发下列事件

    (1) focusout 在失去焦点的元素上触发

    (2) focusin 在获得焦点的元素上触发

    (3) blur 在失去焦点的元素上触发

    (4) focus 在获得焦点的元素上触发

  * 鼠标事件

    所有鼠标事件都冒泡

    > click：在用户单击鼠标按钮（一般是左边）或者按下回车键时触发
    >
    > dbclick：双击，一般是左边
    >
    > mousedown：用户按下了任意鼠标按钮
    > mouseover：鼠标指针位于一个元素外部，然后将其首次一如另一个元素边界之内时触发
    >
    > mouseup：用户释放鼠标按钮时触发

    只有在同一个元素上相继触发 mousedown 和 mouseup 事件，才会触发 click 事件；如果 mousedown 或 mouseup 中的任意一个被取消，就不会触发 click 事件，

    (1) mousedown

    (2) mouseup

    (3) click

    (4) mousedown

    (5) mouseup

    (6) click

    (7) dbclick

  * 键盘与文本事件

    > keydown：用户按下键盘上某个键时触发，按住不放会重复触发
    >
    > keypress：同上
    >
    > keyup：释放键盘上的键时触发
    >
    > 触发顺序 keydown => keypress => keyup

* 内存和性能

  * 事件委托

    对 “ 事件处理程序过多 ” 问题的解决方案就是事件委托。事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

    例如，click 事件会一直冒泡到 document 层次。也就是说，我们可以为整个页面指定一个 onclick 事件处理程序，而不必为每个可单击的元素分别添加事件处理程序。

    ```html
    <ul id="myLinks">
        <li id="goSomewhere">Go somewhere</li>
        <li id="doSomething">Do something</li>
        <li id="sayHi">Say hi</li>
    </ul>
    ```

    ```javascript
    // 传统做法
    var item1 = document.getElementById("goSomewhere");
    var item2 = document.getElementById("doSomething");
    var item3 = document.getElementById("sayHi");
    
    EventUtil.addHandler(item1,"click",function(event){
        location.href = "http://www.wrox.com";
    });
    
    EventUtil.addHandler(item2,"click",function(event){
        document.title = "I changed the document's title";
    });
    
    EventUtil.addHandler(item3,"click",function(event){
        alert("hi");
    });
    
    // 使用事件委托，只需要在 DOM 树中尽量最高的层次上添加一个事件处理程序，如下所示
    var list = document.getElementById("myLinks");
    
    EventUtil.addHandler(list,"click",function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        
        switch(target.id){
            case "goSomethere":
                location.href = "http://www.wrox.com";
                break;
            case "doSomething":
                document.title = "I changed the document's title";
                break;
            case "sayHi":
                alert("hi");
                break;
        }
    })
    ```

    在这段代码里，我们使用事件委托只为 `<ul>` 元素添加了一个 onclick 事件处理程序。由于所有列表项都是这个元素的子元素，而且他们的事件都会冒泡，所以单击这个事件最终会被这个函数处理。

    如果可以的话，可以为 document 对象添加一个事件处理程序，用于处理事件上某种特定类型的事件，优点如下：

    (1) document 对象很快就可以访问，而且可以在任何时间为它添加事件处理程序。换句话说，只要可单击的元素呈现在页面上，就可以立即具备适当功能。

    (2) 在页面中设置事件处理程序所花事件更少（不用写大量重复代码）。只添加一个事件处理程序所需要的 DOM 引用更少，所花时间也更少。

    (3) 整个页面占用的内存空间更少，能提升整体性能

    适合采用事件委托技术的事件包括 `click、mousedown、mouseup、keydown、keyup、keypress` 。

  * 移除事件处理程序

    当将事件处理程序指定给元素时，就会建立一个连接，连接建立的越多，页面执行起来越慢。所以，需要在不需要的时候移除事件处理程序。如：

    当用户点击一个按钮的时候，移除它并用一条消息代替，同时也要把按钮的事件处理程序移除

    ```html
    <div id="myDiv">
    	<input type="button" value="Click Me" id="myBtn">
    </div>
    <script type="text/javascript"> 
    	var btn =document.getElementById("myBtn");
    	btn.onclick = function(event){
    		//先执行某些操作
    		btn.onclick = null; // 移除事件处理程序
    		document.getElementById("myDiv").innerHTML = "Processing...";
    	}
    </script>
    ```

    一般来说，最好的方法是在页面卸载之前，通过 `onunload` 事件处理程序移除所有事件处理程序。因此，事件委托的优势就出来了。



##### 第二十一章 Ajax

* XMLHttpRequest 对象

  `var xhr = new XMLhttpRequest();`

  用法：要调用的第一个方法是 `open()`，接收 3 个参数：要发送的请求的类型（get，post 等），请求的 url （url 是相当于执行代码的当前界面，也可使用绝对路径）和是否异步发送请求

  ```javascript
  var xhr = new XMLhttpRequest();
  xhr.open("get","example.php",false);
  // 调用 open 并不会真正发送请求，而只是启动一个请求准备发送，要发送的话需要调用 send();
  // send 接收一个参数，即作为请求主体发送的数据，如果不发送数据，必须传 null
  xhr.send(null);
  ```

  在收到响应后，响应的数据会自动填充 XHR 对象的属性，相关属性如下

  > responseText：作为响应主体被返回的文本
  >
  > status：响应的 HTTP 状态
  >
  > statusText：HTTP 状态的说明

  为确保接收到适当响应，应当像如下这种方式检查响应状态码

  ```javascript
  var xhr = new XMLhttpRequest();
  xhr.open("get","example.txt",false);
  xhr.send(null);
  
  if((xhr.status >= 200 && xhr.status < 300) || xhr == 304){
      alert(xhr.responseText);
  } else {
      alert("Request was unsuccessful" + xhr.status);
  }
  ```

  像前面这样发送同步请求当然没有问题，但是多数情况下，我们还是要发送异步请求，才能让 javascript 继续执行而不必等待响应。此时，可以检测 XHR 对象的 readyState 属性，该属性表示请求 / 响应过程的当前活动阶段，这个属性可以取的值如下

  * 0：未初始化，尚未调用 open 方法
  * 1：启动，已经调用 open 方法尚未调用 send 方法
  * 2：发送，已经调用 send 方法但尚未收到响应
  * 3：接收，已经接收到部分响应数据
  * 4：完成，已经接受到全部响应数据，而且已经可以在客户端使用了

  只要 readyState 属性的值由一个值变成另一个值，都会触发一次 readystatechange 事件。可以利用这个事件来检测每次状态变化后 readyState 的值。通常，我们只对 readyState 值为 4 的阶段感兴趣，因为这时所有的数据都已经就绪，不过，必须在调用 open 之前指定 onreadystatechange 事件处理程序才能确保跨浏览器兼容性

  ```javascript
  var xhr = new XMLhttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
          if((xhr.status >= 200) && xhr.status < 300 || xhr.status == 304){
              alert(xhr.responseText);
          }else{
              alert("Request was unsuccessful:" + xhr.status);
          }
      }
  };
  xhr.open("get","example.txt",true);
  xhr.send(null);
  ```

  另外，在接收到响应之前可以调用 `abort()` 方法来取消异步请求

  ```javascript
  xhr.abort();
  ```

  调用这个方法后， XHR 对象会停止触发事件，而且也不再允许访问任何与响应有关的对象属性。终止请求后，还应该对 XHR 对象进行解引用操作。

* HTTP 头部信息

  默认情况下，在发送 xhr 请求的同事I，还会发送下列头部信息。

  * Accept：浏览器能处理的内容类型
  * Accept-Charset：浏览器能够显示的字符集
  * Accept-Encoding：浏览器能够处理的压缩编码
  * Accept-Language：浏览器当前设置的语言
  * Connection：浏览器与服务器之间的连接的类型
  * Cookie：当前页面设置的任何 Cookie
  * Host：发出请求的页面所在的域
  * Referer：发出请求的页面的 URI
  * User-Agent：浏览器的用户代理字符串

  使用 `setRequestHeader()` 方法可以设置自定义的请求头部信息。这个方法接受两个参数：头部字段的名称和头部字段的值。要成功发送请求头部信息，必须在调用 open 方法之后且在调用 send 方法之前调用 `setRequestHeader()`

  ```javascript
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
          if((xhr.status >= 200)&&(xhr.status < 300)||xhr.status == 304){
              alert(xhr.responseText);
          }else{
              alert("Request was unsuccessful:" + xhr.status);
          }
      }
  };
  xhr.open("get","example.txt",true);
  xhr.setRequestHeader("Myheader","MyValues");
  xhr.send(null);
  ```

  调用 XHR 对象的 `getResponseHeader()` 方法并传入头部字段名称，可以取得相应的响应头部信息。

  而调用 `getAllResponseHeaders()` 方法则可以取得一个包含所有头部信息的长字符串。

  ```javascript
  var myHeader = xhr.getResponseHeader("MyHeader");
  var allHeaders = xhr.getAllResponseHeaders();
  ```

* 请求类型

  * get 请求

  * post 请求

    区别：post 请求应该把数据作为请求的主体提交，post 请求的主体可以包含非常多的数据，而且格式不限









