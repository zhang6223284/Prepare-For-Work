[TOC]

###ES6 语法



##### 第一章 简介

* ES6 转码器 Babel 可以将 ES6 代码转化为 ES5 代码，意味着可以用 ES6 的方式编写代码，不用担心现有环境是否支持（具体使用方法见 p5 - p7）



##### 第二章 let 和 const 

* let 只在代码块中有效，不允许重复声明

  ```javascript
  let a = 1；
  let a = 2；//Uncaught SyntaxError: Identifier 'a' has already been declared
  //for 循环的特别之处
  for(let i=0;i<3;i++){
      let i='abc';
      console.log(i);
  }
  //abc
  //abc
  //abc
  //这段代码可以正确运行，说明函数内部的 i 与循环变量 i 不在同一个作用域
  ```

* var 存在变量提升，即变量可以在声明之前使用，值为 undefined。

  ```javascript
  console.log(bar);//undefined
  console.log(foo);//报错 ReferenceError
  console.log(abc);//报错 ReferenceError
  var bar = 2;
  let foo = 2;
  abc = 2;
  ```

* 暂时性死区（为了让大家养成良好的编程习惯）

  ```javascript
  var tmp = 123;
  if(true){
      tmp = 'abc';//ReferenceError
      let tmp;
  }
  ```

  上面代码中存在全局变量 tmp，但是在块级作用域内 let 又声明了一个局部变量 tmp，导致后者绑定这个块级作用域，所以在 tmp 声明前，对 tmp 声明会报错。

  ES6 明确规定，如果区块中存在 let 和 const 命令，则只要在声明之前使用这些变量就会报错。

* const 声明一个只读的常量，一旦声明必须立即初始化，不能留到以后赋值。

  const 实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。

  对于简单类型的数据而言，值就保存在地址中，因而等于常量。对于符合类型的数据，主要是对象和数组，

  变量指向的内存地址保存的只是一个指针，const 只能保证指针固定，而不能保证它指向的数据结构是不可变的。

  ```javascript
  const foo={};
  foo.prop = 123;
  foo.prop // 123
  foo = {};// TypeError: "foo" is read-only
  ```

  如果真的想将对象冻结，可以使用 Object.freeze 方法。

  `const foo = Object.freeze({});`

  

##### 第三章 变量的解构赋值

+ 解构：按照一定模式从数组或对象中提取值，然后对变量进行赋值

+ 这种方法本质上属于模式匹配，只要左右两边模式相同，就会被赋上响应的值

  ```javascript
  let [x,y,z] = [1,2,3];
  let [foo,[[bar],baz]] = [1,[[2],3]];
  foo	// 1
  bar // 2
  baz // 3
  let [x,,z] = [1,2,3]
  x // 1
  z // 3
  let [head,...tail] = [1,2,3,4]
  head // 1
  tail // [2,3,4]
  // 如果解构不成功，变量的值就等于 undefined 
  let [foo] = [];
  let [bar,foo] = [1];
  foo // undefined
  // 不完全解构
  let [a,[b],c] = [1,[2,3],4];
  a // 1
  b // 2
  c // 4
  ```

+ 解构赋值允许默认值

  ```javascript
  let [foo=true]=[];
  foo // true
  // ES6 内部使用严格相等运算符判断一个位置是否有值，null 不严格等于 undefined
  let [x,y='b'] = ['a',undefined]; // x='a',y='b'
  let [x=1] = [null]; // x=null
  // 默认值可以引用解构赋值的其他变量，但该变量必须已经声明
  let [x=1,y=x]=[2]; // x=2;y=2
  let [x=y,y=1]=[]; // ReferenceError
  ```

+ 解构不仅可以用于数组，还可以用于对象

  **对象的解构与数组的解构不同。数组的元素是按次序排列的，变量的取值是由它的位置决定的；而对象的属性没有次序，变量必须与属性同名才能取到正确的值**

  也就是说，对象的解构赋值的内部机制是先找到同名属性，然后再赋值给对应的变量。

  ```javascript
  let { foo,bar } = { foo:"aaa",bar:"bbb" };
  foo // aaa
  bar // bbb
  let { bar,foo } = { foo:"aaa",bar:"bbb" };
  foo // aaa
  bar // bbb
  // 如果变量名与属性名不一致，必须写成下面这样
  var { foo:baz } = { foo:"aaa",bar:"bbb" };
  baz // aaa
  foo // error: foo is not defined
  // 上面的代码中，foo 是匹配的模式，baz 才是变量。
  
  let obj = { first:'hello',last:'world' };
  let { first:f,last:l } = obj;
  f // hello
  l // world
  
  let obj = {
      p:[
          'Hello',
          {y:'World'}
      ]
  };
  let { p,p:[x,{ y }] } = obj
  p // ['Hello',{y:'World'}]
  x // 'Hello'
  y // 'World'
  
  var node = {
      loc:{
          start:{
              line:1,
              column:5
          }
      }
  };
  
  var { loc,loc:{ start },loc:{ start:{ line }} } = node;
  loc // Object { start:Object }
  start // Object { line:1,column:5 }
  
  // 应用
  let { log,sin,cos } = Math
  // 上面的代码将 Math 对象的对数、正弦、余弦三个方法赋值到对应的变量上，使用起来就会方便很多
  ```

+ 字符串的解构赋值

  ```javascript
  const [ a,b,c,d,e ] = 'hello';
  a // h
  b // e
  c // l
  d // l
  e // o
  ```

+ **解构赋值的用途**

  ```javascript
  // 交换变量的值
  let x = 1;
  let y = 2;
  [x, y] = [y, x];
  
  // 从函数返回多个值
  // 返回一个数组
  function example(){
      return [1, 2, 3];
  }
  let[a, b, c] = example();
  // 返回一个对象
  function example(){
      return {
          foo:1,
          bar:2
      };
  }
  let { foo, bar } = example();
  
  /* 
  	提取 JSON 对象中的数据尤其有用
  */
  let jsonData = {
      id: 42,
      status: "OK",
      data: [867,5309]
  };
  let { id, status, data: number} = jsonData;
  console.log(id, status, number);
  // 42, "OK", [867,5309]
  
  // 遍历 Map 解构
  var map = new Map();
  map.set('first','hello');
  map.set('second','world');
  
  for(let [key, value] of map){
      console.log(key + " is " + value);
  }
  // first is hello
  // second is value
  // 如果只想获取键名或值
  // 获取键名
  for(let [key] of map){
      // ...
  }
  // 获取值
  for(let [value] of map){
      // ...
  }
  ```




##### 第四章 字符串的扩展

* 字符串的遍历器接口

  > ES6 为字符创添加了遍历器接口，使得字符串可以由 for ... of 循环遍历

  ```javascript
  for(let codePoint of 'foo'){
      console.log(codePoint);
  }
  // "f"
  // "o"
  // "o"
  ```

* `includes()`、`startsWith()`、`endsWith()`

  >`includes()`：返回布尔值，表示是否找到了参数字符串
  >
  >`startsWith()`：返回布尔值，表示参数字符串是否在源字符串的头部
  >
  >`endsWith()`：返回布尔值，表示参数字符串是否在源字符串的尾部
  >
  >这三个方法都支持第二个参数，表示开始搜索的位置
  >
  >```javascript
  >var s = 'Hello world!';
  >s.startsWith('Hello'); // true
  >s.endsWith('!'); // true
  >s.includes('o'); // true
  >
  >s.startsWith('world',6); // true 针对第 n 个到结束位置之间的字符
  >s.endsWith('Hello',5); // true 针对前 n 个字符
  >s.includes('Hello',6); // false 针对第 n 个到结束位置之间的字符
  >```

* `repeat()`

  > `repeat()` 返回一个新字符串，表示将原字符串重复 n 次
  >
  > ```javascript
  > 'x'.repeat(3); // "xxx"
  > 'hello'.repeat(2); // "hellohello"
  > 'na'.repeat(0); // ""
  > // 如果是小数会被取整
  > 'na'.repeat(2.9); // "nana"
  > ```

* `padStart()`、`padEnd()`

  > 字符串补全长度：如果某个字符串不够指定长度，会在头部或尾部补全
  >
  > `padStart()` 用于头部补全，`padEnd()` 用于尾部补全
  >
  > 接收两个参数，第一个参数用来指定字符串的自小长度，第二个参数则用来补全字符串
  >
  > ```javascript
  > 'x'.padStart(5,'ab') // 'ababx'
  > 'x'.padStart(4,'ab') // 'abab'
  > 'x'.padEnd(5,'ab') // 'xabab'
  > 'x'.padEnd(4,'ab') // 'abab'
  > 
  > // 如果原字符串长度大于等于指定的最小长度，则返回原字符串
  > 'xxx'.padStart(2,'ab') // 'xxx'
  > 'xxx'.padEnd(2,'ab') // 'xxx'
  > 
  > // 如果用来补全的字符串与原字符串长度之和超过了指定的最小长度，则会截去超出位数的补全字符串
  > 'abc'.padStart(10,'0123456789') // '0123456abc'
  > 
  > // 如果省略第二个参数，则会用空格来补全
  > 'x'.padStart(4) // '   x'
  > 'x'.padEnd(4) // 'x   '
  > 
  > // 主要用途是为了为数值补全指定位数
  > '1'.padStart(10,'0') // "0000000001"
  > '12'.padStart(10,'0') // "0000000012"
  > '123456'.padStart(10,'0') // "0000123456"
  > // 另一个用途是提示字符串格式
  > '12'.padStart(10,'YYYY-MM-DD') // "YYYY-MM-12"
  > '09-12'.padStart(10,'YYYY-MM-DD') // "YYYY-09-12"
  > ```

* 模版字符串



#### 第 14 章 Promise 对象

##### 14.1 Promise 的含义

Promise 是 异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理且更强大。

所谓 Promise，简单的来说就是一个容器，保存着**某个未来才会结束的事件（通常是一个异步操作）的*结果***。

Promise 对象的特点

* 对象的状态不受外界影响

  > Promise 对象代表一个异步操作，有 3 中状态：Pending（进行中）、Fulfilled（已成功）和 Rejected（已失败）。只有一步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 的由来

* 一旦状态改变就不会再变，任何时候都可以得到这个结果

  > Promise 对象的状态的改变只有两种可能，从 Pending 变为 Fulfilled 和从 Pending 变为 Rejected。只要这两种情况发生，状态就凝固了，不会再变，而是一直保持这个结果，这时成为 Resolved（已定型）。就算改变已经发生，再对 Promise 对象添加回调函数，也会立即得到这个结果。

优点：

将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。提供统一的接口，使得控制异步操作更加容易。

缺点：

首先，无法取消 Promise，一旦新建他会立即执行，无法取消

其次，如果不设置回调函数，Promise 内部抛出的错误不会反应到外部

再者，当处于 Pending 状态时，无法得知目前进展到哪一个阶段

##### 14.2 基本用法

Promise 对象是一个构造函数，用来生成 Promise 实例

```javascript
var promise = new Promise(function(resolve,reject){
    // ...some code
    if(/* 异步操作成功 */){
       resolve(value);
	} else {
       reject(error);
	}
});
```

Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 `resolve` 和 `reject`。它们是两个函数，由 javascript 提供，不用自己部署。

`resolve` 函数的作用是，将 Promise 对象的状态从 “ 未完成 ” 变为 “ 已成功 ”（即从 Pending 变为 Resolved），在异步操作成功时调用，并将异步操作的结果作为参数传递进去；`reject` 函数的作用是，将 Promise 对象的状态从 “ 未完成 ” 变为 “ 失败 ”（即从 Pending 变为 Rejected），在异步操作失败时调用，并将异步操作报出的错误作为参数传递出去。

Promise 实例生成以后，可以用 `then` 方法分别指定 Resolved 状态和 Rejected 状态的回调函数。

```javascript
promise.then(function(value){
    // success
},function(error){
    // failure
});
```

`then` 方法接收两个回调函数作为参数，第一个回调函数是 Promise 对象的状态变为 Resolved 时调用，第二个回调函数是 Promise 对象的状态变为 Rejected 时调用。其中，第二个参数是可选的。这两个函数都接受 Promise 对象传出的值作为参数。

```javascript
// Promise 对象简单的例子
function timeout(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms,'done');
    });
}

timeout(100).then((value)=>{
    console.log(value);
});
```

Promise 新建后就会立即执行。

```javascript
let promise = new Promise(function(resolve,reject){
   	console.log('promise');
   	resolve();
});
promise.then(function(){
    console.log('Resolved');
});
console.log("Hi!");
// Promise
// Hi!
// Resolved
```

上面的代码中，Promise 新建后会立即执行，所以首先输出的是 Promise。然后，then 方法指定的回调函数将在当前脚本所有同步任务执行完成后才会执行，所以 Resolved 最后输出。