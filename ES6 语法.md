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

  > Promise 对象代表一个异步操作，有 3 中状态：Pending（进行中）、Fulfilled（已成功）和 Rejected（已失败）。只有异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 的由来

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

```javascript
// 异步加载图片
function loadImageAsync(url){
    return new Promise((resolve,reject)=>{
        var image = new Image();
        image.onload = function(){
            resolve(image);
        };
        image.onerror = function(){
            reject(new Error('Could not find image at '+image);
        }
        img.src = url;
    });
}
// 使用方法
var loadImg = loadImageAsync('./image.jpg');
loadImg.then(res=>{
    var ele = document.querySelector('.main');
    ele.append(res);
}).catch(res=>console.log(res))
```

```javascript
// 用 promise 对象实现 ajax
var getJSON = function(url){
    var promise = new Promise((resolve,reject)=>{
        var xhr = new XMLHttpRequest();
        xhr.open('get',url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'JSON';
        xhr.setRequestHeader('Accept','application/json');
        xhr.send(null);
        
        function handler(){
            if(this.readyState != 4) return;
            if(this.status >= 200 && this.status < 300 || this.status === 304){
                resolve(this.response);
            }else{
                reject(new Error(this.statusText));
            }
        }
    });
    return promise
}

// 使用方法
getJSON('./posts.json').then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})

```

如果调用 resolve 和 reject 函数时带有参数，那么这些参数会被传递给回调函数。reject 函数的参数通常是 Error 对象的实例，表示抛出的错误；resolve 函数的参数除了正常的值外，还可能是另一个 Promise 实例，比如下面这样

```javascript
var p1 = new Promise((resolve,reject)=>{
	setTimeout(()=>reject(new Error('fail')),3000);
});

var p2 = new Promise((resolve,reject)=>{
	setTimeout(()=> resolve(p1),1000)
});

p2.then(res => console.log(res))
.catch(err => console.log(err))
// 上述代码，p1 是一个 promise，3 秒之后变为 rejected。p2 的状态在 1 秒之后改变，resolve 方法返回的是 p1.由于 p2 返回的是另一个 promise，导致 p2 的状态无效，由 p1 的状态决定 p2 的状态。所以，后面的 then 语句都是针对后者（p1）的，再过 2 秒，p1 的状态变为 rejected，触发 catch 方法返回指定的回调函数。
```

此时 p1 的状态就会传递给 p2。也就是说 p1 的状态决定了 p2 的状态

如果 p1 的状态是 Pending，那么 p2 的回调函数就会等待 p1 的状态改变

如果 p1 的状态已经是 Resolved 或 Rejected，那么 p2 的回调函数就会立即执行

**注意**：调用 resolve 或 reject 并不会终结 promise 的参数函数的执行。

这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的**同步任务**

```javascript
new Promise((resolve,reject)=>{
	resolve(1);
	console.log(2);
}).then(r=>console.log(r))
// 2
// 1
```

一般来说，调用 resolve 或 reject 之后，Promise 的使命就完成了，后继操作应该放到 then 方法里面，而不应该直接写在 resolve 或 reject 的后面。所以，最好在它们前面加上 return 语句，这样就不会产生意外。

```javascript
new Promise((resolve,reject)=>{
	return resolve(1);
	console.log(2);// 不会执行
})
```

#####14.3 then

Promise 实例具有 then 方法，是定义在 Promise.prototype 上的。它的作用是为 Promise 实例添加状态改变时的回调函数。then 方法的第一个参数是 Resolved 状态的回调函数，第二个参数（可选）是 Rejected 状态的回调函数（自测如果有这个的话，就不会触发 catch 函数了）

then 方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）。因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法。

```javascript
getJSON('./posts.json').then((json)=>json.post)
    .then((post)=>{
    // ...
});
```

上面的代码使用 then 方法依次指定了两个回调函数，第一个回调函数完成以后，会将返回结果作为参数传入第二个回调函数。

采用链式的 then 可以指定一组按照次序调用的回调函数。这时，前一个回调函数返回的还是一个 promise 对象（即有一步操作）后一个回调函数就会等待该 promise 对象的状态发生变化，再被调用

```javascript
getJSON('./posts.json').then((post)=>getJSON(post.commentURL))
    .then(function funcA(comments){
    console.log('Resolved:',comments);
},function funcB(err){
    console.log('Rejected:',err);
});
```

上述代码中，第一个 then 方法指定的回调函数返回的是另一个 promise 对象。这时，第二个 then 方法指定的回调函数就会等待这个新的 promise 对象状态发生变化。如果变为 Resolved，就调用 funcA；如果状态变为 Rejected，就调用 funcB

##### 14.4 catch

catch 方法是 `.then(null,rejection)` 的别名，用于指定发生错误时的回调函数。

另外，then 方法指定的回调函数如果在运行中抛出错误也会被 catch 方法捕获

```javascript
var promise = new Promise((resolve,reject)=>{
	throw new Error('test');
});
promise.then(val=>console.log(val),e=>console.log(e)).catch(e=>console.log(e))
// 直接被捕获，变成 rejected
```

需要注意的是，catch 方法返回的还是一个 Promise 对象，因此后面还可以接着调用 then 方法。

##### 14.5 Promise.all()

Promise.all() 方法用于将多个 Promise 实例包装成一个新的 Promise 实例

`var p = Promise.all([p1,p2,p3])`

上述代码中，Promise.all 方法接受一个数组作为参数，p1、p2、p3 都是 Promise 对象的实例；如果不是，就会调用 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理（Promise.all 方法的参数不一定是数组，但是必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例）。

p 的状态由 p1、p2、p3 决定，分为两种情况

1. 只有 p1，p2，p3 的状态都变成 Fulfilled，p 的状态才会编程 Fulfilled，此时 p1，p2，p3 的返回值组成一个数组，传递给 p 的回调函数。
2. 只要 p1，p2，p3 中有一个状态变成 Rejected，p 的状态就变成 Rejected，此时第一个被 Rejected 的实例的返回值会传递给 p 的回调函数

下面是一个具体的例子

```javascript
// 生成一个 Promise 对象的数组
var promises = [2,3,5,7,11,13].map(id=>getJSON('/post/' + id + '.json'));

Promsie.all(promises).then(posts=>{
    // ...
}).catch(err=>{
    // ...
})
```

上面代码中，promises 是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都编程 fulfilled，或者其中有 1 个变成 rejected，才会调用 Promise.all 方法后面的回调函数。

下面是另一个例子

```javascript
const databasePromise = connectDatabase();

const booksPromise = databasePromise.then(findAllBooks);

const userPromise = databasePromise.then(getCurrentUser);

Promise.all({
    booksPromise,
    userPromise
})
.then(([books,user])=>pickTopRecommentations(books,user));
```

上面的代码中，booksPromise 和 userPromise 是两个异步操作，只有它们的结果都返回，才会触发 pickTopRecommentations 回调函数。

**注意**：如果作为参数的 Promise 实例自身定义了 catch 方法，那么它被 rejected 时并不会触发 Promise.all() 的catch 方法。

这里用自己的例子

```javascript
	window.onload = function(){
		var promise1 = loadImageAsync('./微信公众号图片/' + 1 + '.JPG').then(result=>result).catch(e=>e);
		var promise2 = loadImageAsync('./微信公众号图片/' + 4 + '.JPG').then(result=>result).catch(e=>); // 这里直接被自身的 catch 捕获，变成 resolved，返回一个新的 promise 实例，导致 Promise.all() 方法参数里面两个实例都会 resolved，因此 .all 会正常执行。假设没有 catch 则会被 .all 的 catch 捕捉，.all 变成 rejected 状态，抛出错误。 
		Promise.all([promise1,promise2]).then(res=>{
			var div = document.querySelector('.container');
			res.forEach(ele=>div.append(ele));
		}).catch(e=>console.log('all:'+e));
	}
function loadImageAsync(url){
	return new Promise((reslove,reject)=>{
		var image = new Image();
		image.src = url;
		image.onload = function(){
			return reslove(image);
		}
		image.onerror = function(){
			return reject(new Error('Could not load image at' + url));
		}
		
	})
}
```

##### 14.6 Promise.race()

Promise.race() 方法同样是将多个 Promise 实例包装成一个新的 Promise 实例

`var promises = Promise.race([p1,p2,p3]);`

上面代码中，只要 p1，p2，p3 中有一个实例**率先改变状态**（可以是出错，也可以是正常执行），p 的状态就跟着改变。那个率先改变的 Promise 实例的返回值就传递给 p 的回调函数。

和 Promise.all 一样，如果不是 Promise 实例，就会先调用下面讲到的 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理 

来个例子

```javascript
	window.onload = function(){
		var promise = loadImageAsync('./微信公众号图片/' + 1 + '.JPG').then(result=>result).catch(e=>e);

		Promise.race([promise,new Promise((resolve,reject)=>{
			setTimeout(()=>{
				reject(new Error('timeout'));
			},1000)
		}
			)]).then(res=>{
			var div = document.querySelector('.container');
			div.append(res);
		}).catch(e=>console.log(e))
    }
```

这个例子是如果图片 1 秒内加载出来则 promise 的状态就会改变，如果加载不出来第二个 Promise 实例就会执行 reject，被 race 的catch 捕捉。

#####14.7 Promise.resolve()

有时候需要将现有对象转为 Promise 对象，Promise.resolve 方法就起到这个作用。

Promise.resolve 等价于下面的写法

```javascript
Promise.resolve('foo');
// 等价于
new Promise(resolve => resolve('foo'));
```

Promise.resolve 方法的参数分成以下四种情况

######参数是一个 Promise 实例

如果参数是一个 Promise 实例，那么 Promise.resolve 将不做任何修改，原封不动的返回这个实例

###### 参数是一个 thenable 对象

thenable 对象指的是具有 then 方法的对象，比如下面这个对象

```javascript
let thenable = {
    then:function(resolve,reject){
        resolve(42);
    }
};
```

Promise.resolve 方法会将这个对象转换为 Promise 对象，然后立即执行 thenable 对象的 then 方法

```javascript
let p1 = Promise.resolve(thenable);
p1.then(val=>console.log(val)) // 42
```

上述代码中，thenable 对象的 then 方法执行后，对象 p1 的状态就变为 resolved，从而立即执行最后的 then 方法指定的回调函数，输出 42

###### 参数不是具有 then 方法的对象或根本不是对象

如果参数是一个原始值，或者是一个不具有 then 方法的对象，那么 Promise.resolve 方法返回一个新的 Promise 对象，状态为 Resolved。

```javascript
var p = Promise.resolve('Hello');
p.then(s=>console.log(s)); // Hello
```

###### 不带有任何参数

Promise.resolve 方法允许在调用时不带有任何参数，而直接返回一个 Resolved 状态的 Promise 对象。

所以如果想得到一个 Promise 对象，比较方便的方法就是直接调用 Promise.resolve 方法

```javascript
var p = Promise.resolve();

p.then(function(){
    // ...
})
```

上面代码中的 p 就是一个 Promise 对象

##### 14.8 Promise.reject()

Promise.reject(reason) 方法也会返回一个新的 Promise 实例，状态为 Rejected

```javascript
var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolve,reject)=>reject('出错了'))

p.then(null,function(s){
    console.log(s); // 出错了
});
```

**注意**：Promise.reject() 方法的参数会原封不动地作为 reject 的理由变成后续方法的参数。这一点与 Promise.resolve 方法不一致

```javascript
const thenable = {
    then(resolve,reject){
        reject('出错了');
    }
};

Promise.reject(thenable)
    .catch(e => {
    console.log(e === thenable) // true;
})
```

上面的代码中，Promise.reject 方法的参数是一个 thenable 对象，执行以后，后面 catch 方法的参数不是 reject 抛出的 “出错了” 这个字符串，而是 thenable 对象。

####第 15 章 Iterator 和 for...of 循环

##### 15.1 Iterator（遍历器）的概念

遍历器是一种借口，为各种不同的数据结构提供统一的访问机制。任何数据结构，只要部署 Iterator 借口，就可以完成遍历操作，即依次处理该数据结构的所有成员。

Iterator 的作用主要有 3 个：一是为各种数据结构提供一个统一的，简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令——for ... of 循环

Iterator 遍历的过程如下：

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上就是一个指针对象。
2. 第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员。
3. 第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员。
4. 不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。

每次调用 next 方法都会返回数据结构的当前成员的信息，就是一个包括 value 和 done 两个属性的对象。value 是当前成员的值，done 表示循环是否结束。

下面是一个模拟 next 方法返回值的例子

```javascript
var it = makeIterator(['a','b']);

it.next(); // {value:'a',done:false}
it.next(); // {value:'b',done:false}
it.next(); // {value:undefined,done:true}

function makeIterator(array){
    var nextIndex = 0;
    return {
        next:function(){
            return nextIndex < array.length ?
            {value:array[nextIndex++],done:false}:
            {value:undefined,done:true};
        }
    }
}
```

##### 15.2 默认 Iterator 接口

原生具有 Iterator 接口的数据结构如下

* Array
* Map
* Set
* String
* TypedArray
* 函数的 arguments 对象
* NodeList 对象

下面的例子是数组的 Symbol.iterator 属性

```javascript
let arr = [1,2,3];
let iter = arr[Symbol.iterator]();

iter.next(); // {value:1,done:false}
iter.next(); // {value:2,done:false}
iter.next(); // {value:3,done:false}
iter.next(); // {value:undefined,done:true}
```



#### 第 16 章 Generator 函数

##### 16.1 简介

###### 16.1.1 基本概念

从语法上可以把它理解为一个状态机，里面封装了多个内部状态

执行 Generator 函数会返回一个遍历器对象。也就是说，Generator 函数除了是状态机，还是一个遍历器对象生成函数。返回的遍历器对象可以依次遍历 Generator 函数内部的每一个状态

形式上，Generator 函数就是一个普通函数，有两个特征：一是 function 命令与函数名之间有一个星号；而是函数体内使用 yield 语句定义不同的内部状态

```javascript
function*　helloWorldGenerator(){
    yield 'hellon';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();

hw.next(); // {value:'hello',done:false}
hw.next(); // {value:'world',done:false}
hw.next(); // {value:'ending',done:false}
hw.next(); // {value:'undefined',done:true}
```

上面的代码定义了一个 Generator 函数——helloWorldGenerator，它内部有两个 yield 语句 “hello” 和 “world”，即该函数有三个状态，hello，world 和 return 语句。

Generator 函数调用和普通函数一样，区别是调用后并不执行，返回的是一个指向内部状态的指针对象

下一步，调用 next 方法，使得指针移向下一个状态。即每次调用 next 方法，内部指针就从函数头部或上一次停下来的地方执行，直到遇到下一条 yield 语句（或 return 语句）。换言之， yield 语句是暂停执行的标记，而 next 方法可以恢复执行。

