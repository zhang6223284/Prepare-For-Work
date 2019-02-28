// 1 判断是否存在循环引用
var obj={
	a: 1,
	b: 2
}
obj.c = obj
fn(obj)
// JSON.stringify(obj) 会报错
// 思路 遍历对象，将 KEY 加入到 arr 中，如果 key 在 arr 中已经存在，则证明存在循环引用
function fn(obj, arr) {
  const cache = arr || [] 
  if(typeof obj === 'object' && !cache.includes(obj) ) {
    cache.push(obj)
  } else {
    return 
  }
  try{
    Object.values(obj).forEach( val => {
      if(cache.includes(val)) {
        throw new Error()
      } else {
        if(typeof val === 'obj') {
      		cache.push(obj)
          fn(val, cache)
        }
      }
    })
  }catch(e) {
    return false
  }
  return true
}

function fn(obj, arr) {
	const cache = arr || []
	if(typeof obj !== 'object') return true
	for(let key in obj) {
		if(cache.includes(obj[key])) {
			return false
		} else {
			if(typeof obj[key] === 'object') {
				cache.push(obj[key])
				if(!fn(obj[key], cache)) {
					return false
				}
			}
		}
	}
	return true
}
// 2 数组去重

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

// 3 树形结构
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

// 4 手动实现一个 compose 函数
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
const compose = (arr) => {
  return function(ctx) {
    [...arr].reverse().reduce((func, item) => {
      return function(ctx) {
        item(ctx, function() {
          func(ctx)
        })
      }
    })(ctx)
  }
}

// 防抖 立即执行版
function debounce(func,wait) {
	    var timeout;

	    return function () {
	        var context = this;
	        var args = arguments;

	        if (timeout) clearTimeout(timeout);

	        var callNow = !timeout;
	        timeout = setTimeout(function(){
	            timeout = null;
	        }, wait)

	        if (callNow) func.apply(context, args)
	    }
	}

// 简易 promise
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
	const that = this
	that.state = PENDING
	that.value = null
	that.resolvedCallbacks = []
	that.rejectedCallbacks = []

	function resolve(value) {
		if(that.state === PENDING) {
			that.value = value
			that.state = RESOLVED
			that.resolvedCallbacks.map( cb => cb(that.value))
		}
	}

	function reject(value) {
		if(that.state === PENDING) {
			that.value = value
			that.state = REJECTED
			that.rejectedCallbacks.map( cb => cb(that.value))
		}
	}

	try {
		fn(resolve, reject)
	} catch (e) {
		reject(e)
	}
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
	const that = this
	onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
	onRejected = typeof onRejected === 'function'? onRejected : r => { throw r }

	if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value)
  }
  if (that.state === REJECTED) {
    onRejected(that.value)
  }
}

// before 函数
Function.prototype.before = function(beforefn){
	var self = this;
	return function(){
		beforefn.apply(this,arguments);
		return self.apply(this,arguments);
	}
}

// after 函数
Function.prototype.after = function(afterfn){
	var self = this;
	return function(){
		var res = self.apply(this,arguments);
		afterfn.apply(this,arguments);
		return res;
	}
}

function deepClone(obj,objNew){
	objNew = objNew||{};
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


function debounce(fn,wait){
	var timeout;
	return function(){
		var context = this;
		var args = arguments;
		if(timeout) clearTimeout(timeout);
		timeout = setTimeout(function() {
			fn.apply(context,args);
		}, wait);
	}
}

function throttle(fn,wait){
	var timeout;
	return function(){
		var context = this;
		var args = arguments;
		if(!timeout){
			timeout = setTimeout(function(){
				timeout = null;
				fn.apply(context,args);
			},wait)
		}
	}
}


function throttle(fn,wait){
	var pre = 0;
	return function(){
		var context = this;
		var agrs = arguments;
		var now = Date.now();
		if(now - pre > wait){
			fn.apply(context,args);
			pre = now;
		}
	}
}

// apply，call，bind
// 深拷贝
// 防抖节流
// compose
// 数组转化对象
// once,memoized,reduce,curry,partial,compose,pipe,maybe,either
function add(a,b){
	return a+b;
}

var MyModules = (function Manager(){
	var modules = {};
	function define(name, deps, impl){
		this.a = 2;
		for(var i = 0; i<deps.length; i++){
			deps[i] = modules[deps[i]]
		}
		console.log(this.a);
		console.log(impl.a)
		modules[name] = impl.apply(impl, deps);
	}
	return {
		define: define
	}
})()

MyModules.define('bar',[],function(){
	this.a = 1;
	function hello(who){
		this.a = 1;
		return "Let me introduce: " + who  ;
	}
	return {
		hello: hello,
	};
});