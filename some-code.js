function chunk(array, size = 1) {
  // 参数类型检查

  const newArr = []
  let tempArr = []

  for(let i = 0, length = array.length; i < length; i++) {
    tempArr.push(array[i])
    if((i + 1) % size === 0 || i === length - 1) {
      newArr.push(tempArr)
      tempArr = []
    } 
  }
  return newArr
}

function chunk(array, size = 1) {
  var length = array ? array.length : 0
  var index = 0,
      resIndex = 0,
      result = Array(Math.ceil(length / size))
  while(index < length) {
    result[resIndex++] = array.slice(index, (index += size)) 
  }
  return result
}


function compact(array) {
  const result = []
  array.forEach( item => {
    if(item) result.push(item)
  })
  return result
}

function concat(array,...values) {
  const result = []
  result.push(...array)
  values.forEach( value => {
    if(value instanceof Array){
        result.push(...value)
    } else {
      result.push(value)
    }

  })
  return result
}

function concat() {
  // 一些类型及合法性检测
  var length = arguments.length
      array = arguments[0]

  if(length < 2) {
    return length ? Array(...array) : []
  }

  var args = Array(length - 1)
  while(length--) {
    args[length - 1] = arguments[length]
  }

  // 这里的 baseFlatten 是他本身的一个扁平化的方法，第二个参数是深度
  return array.concat(baseFlatten(args, 1))
}

function difference(array, values){
  const result = []
  array.forEach( item => {
    if(values.indexOf(item) <= 0){
      result.push(item)
    }
  })
  return result
}

function difference(array, values){
  
}



var fs = require('fs'),
    path = require('path'),
    http = require('http');

var MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

function combineFiles(pathnames, callback) {
    var output = [];

    (function next(i, len) {
        if (i < len) {
            fs.readFile(pathnames[i], function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    output.push(data);
                    next(i + 1, len);
                }
            });
        } else {
            callback(null, Buffer.concat(output));
        }
    }(0, pathnames.length));
}

function main(argv) {
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
        root = config.root || '.',
        port = config.port || 80;

    http.createServer(function (request, response) {
        var urlInfo = parseURL(root, request.url);

        combineFiles(urlInfo.pathnames, function (err, data) {
            if (err) {
                response.writeHead(404);
                response.end(err.message);
            } else {
                response.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                response.end(data);
            }
        });
    }).listen(port);
}

function parseURL(root, url) {
    var base, pathnames, parts;

    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??');
    }

    parts = url.split('??');
    base = parts[0];
    pathnames = parts[1].split(',').map(function (value) {
        return path.join(root, base, value);
    });

    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    };
}

main(process.argv.slice(2));  

// 冒泡排序

function bubble(array) {
  for(let i = 0, length = array.length; i < length; i++) {
    for(let j = 0 ; j < length - i; j++) {
      if(array[j] > array[j+1]) {
        [array[j], array[j+1]] = [array[j+1], array[j]]
      }
    }
  }
  return array
}

// 归并排序

function mergeSort(array, left, right) {
  // 左右索引相同说明只有一个数
  if(left === right) return

  let mid = ~~ array.length >> 1
  mergeSort(array, left, mid)
  mergeSort(array, mid + 1, right)

  let help = []
  let i = 0
  let p1 = left
  let p2 = right
  while(p1 <= mid && p2 <= right) {
    help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++];
  }
  while(p1 <= mid) {
    help[i++] = array[p1++]
  }
  while(p2 <= right) {
    help[i++] = array[p2++]
  }
  for(let i = 0; i < help.length; i++) {
    array[left + i] = help[i]
  }
  return array
}

function sort(array) {
  return mergeSort(array, 0, array.length - 1)
}




function observe(obj) {
  if( typeof obj !== 'object' ) {
    return 
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function defineReactive(obj, key, val) {
  observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
    }
  })
}



function fn(obj, arr) {
  console.log(1)
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




var creatStore = function (initState) {
  let state = initState
  let listeners = []

  function subscribe(listener) {
    listeners.push(listener)
  }

  function changeState(newState) {
    state = newState
    listeners.forEach( listener => {
      listener()
    })
  }

  function getState() {
    return state
  }

  return {
    subscribe,
    changeState,
    getState
  }
}

var store = creatStore({count: 1})
store.subscribe(() => {
  let state = store.getState()
  console.log(state.count)
})

store.changeState({count:3})
store.changeState({count:5})
store.getState()




function createStore(reducer, initState) {
  let state = initState
  const listeners = []

  function subscribe(listener) {
    listeners.push(listener)
  }

  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach(listener => {
      listener()
    })
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState
  }
}

function reducer(state, action) {
  switch(action.type) {
    case 'INCREMENT':
     return {
      ...state,
      count: state.count + 1
     }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default: 
      return state
  }
}

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers)

  return function combination(state = {}, action) {
    const nextState = {}
    reducerKeys.forEach( key => {
      const reducer = reducers[key]
      const preState = state[key]
      const nextStateForKey = reducer(preState, action)

      nextState[key] = nextStateForKey
    })
    return nextState
  }
}

function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers)

  return function combination(state = {}, action) {
    const newState = {}
    reducerKeys.forEach( key => {
      const reducer = reducers[key]
      const preState = state[key]
      newState[key] = reducer(preState, action)
    })
    return newState
  }
}

function fn(data, sum) {
  const cache = {}

  for(let i = 0; i < data.length; i++) {
    if(cache[data[i]] !== undefined) {
    } else {
      cache[data[i]] = data[i]
    }
    if(sum - data[i] === cache[(sum-data[i])] && sum - data[i] !== data[i])
      return data[i]
  }
  return null
}



function maxSum(arr) {
  let max = 0;
  let sum = 0
  arr.forEach( data => {
    sum += data
    if(sum > max) {
      max = sum
    }
    if(sum < 0) {
      sum = 0
    }
  })
  return max
}



function throttle(fn, wait) {
  let pre = new Date()

  return function() {
    let arg = arguments
    let context = this
    let next = new Date()
    if(next - pre > wait) {
      pre = next
      fn.apply(context,...arg)
    }
  }
}




function debounce(fn, wait){
  let timer = null
  return function() {
    let args = arguments
    let context = this
    if(timer) {
      clearTimeout(timer)
      timer = setTimeout(()=> {
        fn.apply()
      },wait)
    }
  }
}


Function.prototype.myBind = (context = window) => {
  const _this = this
  const args = [...arguments].slice(1)
  return function F() {
    if(this instanceof F()) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}


const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
  this.state = PENDING
  this.value = undefined
  this.resolvedCallbacks = []
  this.rejectedCallbacks = []

  function resolve(value) {
    if(this.state === PENDING) {
      this.state = RESOLVED
      this.value = value
      this.resolvedCallbacks.map( cb => {
        cb(this.value)
      })
    }
  }

  try {
    fn(resolve,reject)
  } catch(e) {
    reject(e)
  }
}

function ajax(url, options) {
  return new Promise((resolved, rejected) => {
    const xhr = new XMLHttpRequest()
    xhr.opent(options.method, url, true)
    xhr.onreadystatechange = handler
    xhr.setRequestHeader(option.Header,option.Value);
    if(option.method == 'get'){ // 写到这里让别写了，说下思路
        xhr.send(null);
    }else{
        xhr.send(option.data);
    }

    function handler() {
      if(this.readyState === 4) {
        if(this.status >= 200 && this.status < 300 || this.status === 304) {
          resolve(this.responseText)
        } else {
          rejecte(this.statusText)
        }
      }
    } 
  })
}

function hasPath(matrix, rows, cols, path) {

  if(matrix.length<=0||rows<=0||cols<=0) return false
  let visited = new Array(rows).fill(false).map(ele => new Array(cols).fill(false))
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      if(hasPathCore(matrix, rows, cols, i, j, visited, path)) return true
    }
  }
  return false
}
function hasPathCore(matrix, rows, cols, i, j, path) {
  if(i >=0 && i < rows && j >= 0 && j < cols && !visited && matrix[i * cols + j] === path[0] ) {
    if(path.length === 1) return true
    visited[i][j] = true
    if(hasPathCore(matrix,rows,cols,i-1,j,path.slice(1),visited)) return true
    if(hasPathCore(matrix,rows,cols,i+1,j,path.slice(1),visited)) return true
    if(hasPathCore(matrix,rows,cols,i,j-1,path.slice(1),visited)) return true
    if(hasPathCore(matrix,rows,cols,i,j+1,path.slice(1),visited)) return true
    visited[i][j] = false
  }
  return false
}


function doExchange(doubleArrays){
    var len=doubleArrays.length;
    if(len>=2){
        var len1=doubleArrays[0].length;
        var len2=doubleArrays[1].length;
        var newlen=len1*len2;
        var temp=new Array(newlen);
        var index=0;
        for(var i=0;i<len1;i++){
            for(var j=0;j<len2;j++){
                temp[index]=doubleArrays[0][i]+
                    doubleArrays[1][j];
                index++;
            }
        }
        var newArray=new Array(len-1);
        for(var i=2;i<len;i++){
            newArray[i-1]= doubleArrays[i];
        }
        newArray[0]=temp;
        return doExchange(newArray);
    }
    else{
        return doubleArrays[0];
    }
}


function doExchange(doubleArrays) {
  var len = doubleArrays.length
  if(len >= 2) {
    var len1 = doubleArrays[0].length
    var len2 = doubleArrays[1].length
    var newlen = len1 * len2
    var temp = new Array(newlen)
    var index = 0
    for(let i = 0; i < len1; i++) {
      for(let j = 0; j < len2; j++) {
        temp[index] = doubleArrays[0][i] + doubleArrays[1][j]
        index++
      }
    }
    var newArray = new Array(len - 1)
    for(var i = 2; i < len; i++) {
      newArray[i - 1] = doubleArrays[i]
    }
    newArray[0] = temp
    return doExchange(newArray)
  } else {
    return doubleArrays[0]
  }
}

function fn(arr) {
  var len = arr.length
  if(len < 2) {
    return arr[0]
  } else {
    var len1 = arr[0].length
    var len2 = arr[1].length
    var newArr = []
    for(let i = 0; i < len1; i++) {
      for(let j = 0; j < len2; j++){
        newArr.push(arr[0][i] + arr[1][j])
      } 
    }
    arr.splice(0,2)
    arr.unshift(newArr)
    return fn(arr)
  }
}



function Event() {
  this.listeners = {}
  this.on = (event, listener) => {
    if(this.listeners[event]) {
      this.listeners[event].push(listener)
    } else {
      this.listeners[event] = [listener]
    }
  }

  this.off = (event, listener) => {
    const index = listener ? this.listeners[event].indeOf(listener) : -1
    this.listeners[event].splice(index, 1)
  }

  this.emit = (event, arguments) => {
    try{
      this.listeners[event].forEach( listener => {
        listener.apply(this, arguments);
      })
    } catch(e) {}
  }
}



