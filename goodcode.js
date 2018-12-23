// 统计字符串中各个单词出现的个数

var arr = 'i love you';

var res = arr.split('').reduce((pre,cur) => (pre[cur]++ || (pre[cur] = 1),pre),{}); // 这里主要是用了逗号和 reduce 的第二个参数


console.log(res);

// 数组的完全扁平化
var arr = [1, [2, 3], [4, 5, [6,7,[8]]], [9], 10];
var array = arr.join().split(',');
console.log(array)

// 评级组件
var rate = 5;

"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);

// 快速取整
console.log(~~47.11) // -> 47

console.log(~~1.9999) // -> 1

console.log(20.15|0); // -> 20

console.log((-20.15)|0); // -> -20

// 交换两个数字的值
var a = 1,b = 2;
a ^= b;
b ^= a;
a ^= b;
//或
[a, b] = [b, a];

// 图片起飞
javascript: R=0; x1=.1; y1=.05; x2=.25; y2=.24; x3=1.6; y3=.24;x4=300; y4=200; x5=300; y5=200; 
DI=document.getElementsByTagName("img"); 
DIL=DI.length; 
function A(){
	for(i=0; i-DIL; i++){
		DIS=DI[ i ].style;
		DIS.position='absolute'; 
		DIS.left=(Math.sin(R*x1+i*x2+x3)*x4+x5)+"px"; 
		DIS.top=(Math.cos(R*y1+i*y2+y3)*y4+y5)+"px"
	}
	R++;
}
setInterval('A()',5); void(0);