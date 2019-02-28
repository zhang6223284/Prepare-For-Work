[TOC]

#### 1.判断是否存在循环引用

```JavaScript
// 测试
var obj={
	a:{
		b:{
			c:obj
		}
	},
	l:4
}
fn(obj)

// 思路一 JSON.stringify(obj) 会报错

// 思路二 遍历对象，将 KEY 加入到 arr 中，如果 key 在 arr 中已经存在，则证明存在循环引用
var arr = [];
function fn(obj){
	for(item in obj){
		if(arr.indexOf(item)!=-1){
			return false;
		}else{
			arr.push(item);
			console.log(arr);
			if(obj[item] instanceof Object){
				if(!fn(obj[item])){
					return false;
				}
			}
		}

	}
	return true;
}
```

#### 2.数组去重

```javascript
// 测试
var arr = [6,2,2,3,2,8,4]
distinct(arr);

// 思路 两重循环 不乱序
function distinct(arr){
	var newArr = arr.concat();
	newArr.forEach((elem,index)=>{
		for(let i = index+1;i<newArr.length;i++){
			if(elem === newArr[i]){
				newArr.splice(i,1);
				i=i-1;
			}
		}
	})
	return newArr
}

// 思路 Set 不乱序
function distinct(arr){
	var newArr = arr.concat();
	var result = new Set(newArr);
	result = Array.from(result)
	return result
}

// 思路 Obj 乱序
function distinct(arr){
	var newArr = arr.concat();
	var obj = {};
	newArr.forEach((elem)=>{
		obj[elem]=elem;
	})
	return obj
}

// 思路 添加到一个数组中 不乱序
function distinct(arr){
	var newArr = arr.concat();
	var array = [];
	newArr.forEach((elem)=>{
		if(array.indexOf(elem)===-1){
			array.push(elem);
		}
	})
	return array
}

// 思路 先排序后比较相邻的两个 乱序
function distinct(arr){
	var newArr = arr.concat();
	newArr.sort()
	for (var i = 0; i < newArr.length; i++) {
		if(newArr[i]===newArr[i+1]){
			newArr.splice(i+1,1);
			i=i-1;
		}
	}
	return newArr
}
```

#### 3.树形结构

```JavaScript
//将
var data = [
    {
        parentId: 0,
        id: 1,
        value: '1'
    },
    {
        parentId: 3,
        id: 2,
        value: '2'
    },
    {
        parentId: 0,
        id: 3,
        value: '3'
    },
    {
        parentId: 1,
        id: 4,
        value: '4'
    },
    {
        parentId: 1,
        id: 5,
        value: '5'
    }
];
//转换成
var node = {
   children:[
      {
          children:[
            {
                children:[],
                id: 2,
                value: '2'
            }
          ],
          id: 3,
          value: '3'
      },
      {
          children:[
            {
                children:[],
                id: 4,
                value: '4'
            },
            {
                children:[],
                id: 5,
                value: '5'
            }
          ],
          id: 1,
          value: '1'
      }
    ],
    id: 0,
    value: undefined
}

// 思路，遍历数组，
function fn(data,pid){
	var result = [];
	var temp;
	for (var i = 0; i < data.length; i++) {
		if(data[i].parentId === pid){
			var obj = {"id":data[i].id,"value":data[i].value};
			temp = fn(data,data[i].id);
			if(temp.length>0){
				obj.children = temp;
			}
			result.push(obj);
		}
	}
	return result
}
```

#### 4.手动实现 compose 函数

```javascript
//例：
 
var arr = [func1, func2, func3];
function func1 (ctx, next) {
  ctx.index++
  next();
}
function func2 (ctx, next) {
  setTimeout(function() {
    ctx.index++
    next();
  });
}
function func3 (ctx, next) {
  console.log(ctx.index);
}
 
compose(arr)({index: 0}); 
 
// out: 2
// 思路一
function compose(arr){
	return function(ctx){
		const promise = new Promise((resolve,reject)=>{
			func1(ctx,resolve);
		});
		promise.then(()=>{
			return new Promise((resolve,reject)=>{
				func2(ctx,resolve)
			})
		}).then(()=>{
			return new Promise((resolve,reject)=>{
				func3(ctx);
			})
		})
	}
}
// 思路
const compose = (arr) => {
  return function(ctx) {
    [...arr].reverse().reduce((func, item) => {
      return function(ctx) {
        item(ctx, function() {
          func(ctx)
        })
      }
    }, ()=>{})(ctx)
  }
}
```

#### 5.解析 url 后的参数

```JavaScript
// 测试
var url = 'http://www.baidu.com/?user=huixin&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';

var params = parseParam(url)

console.log(params)
// 思路
function parseParam(url) {
  let obj = {};
  let arr = url.split("?");
  if (arr.length == 1) { //判断没有问号
    return "无参数"
  }
  let total = arr[1].split("&");
  for (let i = 0; i < total.length; i++) {
    let single = total[i].split("=");
    if (single[0] == '') { //判断有？但是没有参数
      return '无参数'
    }
    if (!single[1]) {
      obj[single[0]] = true;
    } else {
      if (obj[single[0]]) {
        let concat
        if (!Array.isArray(obj[single[0]])) { //判断是否数组
          concat = [obj[single[0]]]
        } else {
          concat = obj[single[0]];
        }
        concat.push(single[1]);
        concat = new Set(concat);
        concat = Array.from(concat) //数组去重
        obj[single[0]] = concat
      } else {
        obj[single[0]] = decodeURI(single[1]) //进行转码
      }
    }
  }
  return obj
}
```

#### 6.实现一个简单的模版引擎

```JavaScript
// 列：我叫a,年龄b，性别c； let data = { name: '小明', age: 18, } 没有定义的返回undefined
let template = '我是{name}，年龄{age}，性别{sex}';
    let data = {
        name: '小明',
        age: 18,
    }
    const  reg= /({([a-zA-Z]+)})/g;
    var r= '',regrounp={};
    while( r = reg.exec(template) ){
        Object.defineProperty(regrounp,r[2],{
            enumerable:true,
            value:r[2]
        })
    }

    var render = (template,regrounp)=>{
        var result='';
        for( key in regrounp){
            if(data[key] == undefined){
                result  = (result || template).replace(new RegExp(`{${regrounp[key]}}`,"g"),undefined);
            }else{		
                result  = (result || template).replace(new RegExp(`{${regrounp[key]}}`,"g"),data[key]);
            }
        }
        return result
    }
    let newtemple = render(template, regrounp);
    console.log(newtemple) // 结果： 我是小明，年龄18，性别undefined
```

#### 7. 睡眠排序法

```JavaScript
function sleepSort(arr){
    arr.forEach( ele => {
        setTimeout(() => console.log(ele),ele)
    })
}
```

#### 8. 写一个观察者模式

```JavaScript
class Subject{
    constructor(){
        this.state = 0;
        this.observers = []		
    }
    getState(){
        return this.state
    }
    setState(state){
        this.state = state
        this.notifyAllObservers()
    }
    notifyAllObservers(){
        this.observers.forEach(observer => {
            observer.update();
        })
    }
    attach(observer){
        this.observers.push(observer)
    }
}

//观察者
class Observer{
    constructor(name,subject){
        this.name = name
        this.subject = subject
        this.subject.attach(this)
    }
    update(){
        console.log(`${this.name} update,state: ${this.subject.getState()}`)
    }
}
// 测试
let s = new Subject()
let o1 = new Observer('o1',s)
let o2 = new Observer('o2',s)
let o3 = new Observer('o3',s)
s.setState(1)
s.setState(2)
s.setState(3)
```

#### 9. 位运算符应用 

```JavaScript
// 1、交换两个整数的值：
var a, b;
a = a ^ b;
b = a ^ b;
a = a ^ b;
// 与下面的等价,不过利用的是^的重要性质，效率当然比算术运算高
a = a + b;
b = a - b;
a = a - b;
// 2、与2的x次方的运算
var a;
a << x;//乘2^x
a >> x;//除2^x
a & 1//判断奇偶性，为0则a为偶数,否则为奇数
a & (a-1)//判断a是否为2的幂或者0，结果为0代表是，否则代表不是
// 3、其他常用技巧
var a, b;
a = ~a + 1//取相反数
a ^ b//判断a、b符号是否相同，如果结果>0则相同，否则不同

```



#### 10. 深拷贝

```javascript
// 1、json.parse(json.stringify(obj))
// 会忽略 undefined，function，symbol 及不能解决循环引用
let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
let b = JSON.parse(JSON.stringify(a))
a.jobs.first = 'native'
console.log(b.jobs.first) // FE

// 2、MessageChannel
function structuralClone(obj) {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel()
    port2.onmessage = ev => resolve(ev.data)
    port1.postMessage(obj)
  })
}

var obj = {
  a: 1,
  b: {
    c: 2
  }
}

obj.b.d = obj.b

// 注意该方法是异步的
// 可以处理 undefined 和循环引用对象
const test = async () => {
  const clone = await structuralClone(obj)
  console.log(clone)
}
test()

// 3、自己的简易实现，真正使用用 loadash 库
function deepClone(obj,objNew){
	objNew = objNew || {};
	for(let key in obj){
		if(typeof key == 'object'){
			if(obj[key] instanceof Object){
				objNew[key] = {};
			}else if(Array.isArray(obj[key])){
				objNew[key] = [];				
			}
			deepClone(obj[key],objNew[key]);
		}else{
			objNew[key] = obj[key];
		}
	}
	return objNew;
}


```

