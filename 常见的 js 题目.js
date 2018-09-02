// 1 判断是否存在循环引用
var obj={
	a:{
		b:{
			c:obj
		}
	},
	l:4
}
fn(obj)
// JSON.stringify(obj) 会报错
// 思路 遍历对象，将 KEY 加入到 arr 中，如果 key 在 arr 中已经存在，则证明存在循环引用
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
	var set = new Set();
	newArr.forEach((elem)=>{
		set.add(elem);
	})
	return set
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



function fn(data,pid){
	var result = [];
	var temp;
	data.forEach(ele=>{
		if(ele.parentId === pid){
			var obj = {'id':ele.id,'value':ele.value};
			temp = fn(data, ele.id);
			if(temp.length>0) obj.children = temp;
			result.push(obj)
		}
	})
	return result;
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
 


function compose(arr){
	return function(ctx){
		[...arr].reverse().reduce((func,item)=>{
			return function(ctx){
				item(ctx,function(){
					func(ctx);
				})
			}
		})(ctx)
	}
}



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

// 防抖
function debounce(func,wait){
	var timeout;
	return ()=>{
		var self = this;
		var args = arguments;
		if(timeout) clearTimeout(timeout);
		timeout = setTimeout(()=>{
			func.apply(self,arguments);
		},wait)
	}
}

// 节流
function throttle(fn,wait){
	var timeout;
	return ()=>{
		var self = this;
		var args = arguments;
		if(!timeout){
			timeout = setTimeout(()=>{
				timeout = null;
				fn.apply(self,args);
			},wait)
		} 
	}
}

function throttle(fn,wait){
	var previous = 0;
	return function(){
		var content = this;
		var args = arguments;
		var now = Date.now();
		if(now - previous > wait){
			previous = now;
			fn.apply(content,args);
		}
	}
}


// 数组的扁平化

var A = new Person(name,age,job);

var obj = new Object();
var res = Person.call(obj, name,age,job);
res._proto_ = Person.prototype;

return res==null?res:obj