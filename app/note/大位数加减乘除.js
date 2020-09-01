`大位小数加减乘除`
`转成字符串`
// 除法
function accDiv(arg1, arg2) {
	let t1 = 0, t2 = 0, r1, r2
	try {
		t1 = arg1.toString().split(".")[1].length
		t2 = arg2.toString().split(".")[1].length
		r1 = Number(arg1.toString().replace('.', ''))
		r2 = Number(arg2.toString().replace('.', ''))
	} catch (err) {
		console.log(err)
	}
	return (r1 / r2) * Math.pow(10, t2 - t1)
}

// 乘法
function accMul(arg1, arg2) {
	let m, r1 = arg1.toString(), r2 = arg2.toString()
	try {
		m += r1.split('.')[1].length
		m += r2.split('.')[1].length
	} catch (err) {
		console.log(err)
	}
	return Number(r1.replace('.', '')) * Number(r2.replace('.', '')) / Math.pow(10, m)
}

// 加法
function accAdd(arg1, arg2) {
	let m, r1, r2
	try {
		r1 = arg1.toString().split('.')[1].length
		r2 = arg2.toString().split('.')[1].length
		m = Math.pow(10, Math.max(r1, r2))
	} catch (err) {
		console.log('err', err)
	}
	return (arg1 * m + arg2 * m) / m
}

// 减法
function accRed(arg1, arg2) {
	let r1, r2, m
	try {
		r1 = arg1.toString().split('.')[1].length
		r2 = arg2.toString().split('.')[1].length
		m = Math.pow(10, Math.max(r1, r2))
	} catch (err) {
		console.log('err', err)
	}
	return (arg1 * m - arg2 * m) / m
}

`大位整数按位相加`

function add(a,b){
	var res = '', c = 0;
	while(a.length||b.length){
		let temp = (parseInt(a.substr(-14)||0,10)+parseInt(b.substr(-14)||0,10) + c).toString();
		res = temp.substr(-14) + res;
		c = parseInt(temp.substr(0,temp.length-14,10)||0,10);
		a = a.substr(0,a.length-14);
		b = b.substr(0,b.length-14);
	}
	return res;
}

function add(a, b) {
  let cursor = 1;
  const [{ length: aLen }, { length: bLen }] = [a, b];
  let res = "";
  let carry = 0;
// 全部case合并过来
  while (a[aLen - cursor] || b[bLen - cursor] || carry) {
// ~~的妙处：可以把undefined转为0
    const sum = ~~a[aLen - cursor] + ~~b[bLen - cursor] + carry;
    res = `${sum % 10}${res}`;
    carry = +(sum > 9);
    cursor++;
  }
  return res;
}



var subtract = function(a, b){ 
  var ltrimZero = function(str){
      var i = 0;
      while(i<str.length && str.charAt(i) === "0"){
          i++
      }
      return str.slice(i); 
  };
  var result = [];  
  //是否有借位  
  var minusOne = 0;  
  //去掉a,b开头的0  
  a = ltrimZero(a);  
  b = ltrimZero(b);  
  //补零对齐  
  while(a.length < b.length){  
      a = "0" + a;  
  }  
  while(b.length < a.length){  
      b = "0" + b;  
  }  
  //从后面位数往前相减  
  for(var i=a.length-1;i>=0;i--){  
      var c1 = a.charAt(i) - 0;  
      var c2 = b.charAt(i) - 0;  
      //如果当前位数无须借位  
      if(c1 - minusOne >= c2){  
          result.unshift(c1 - c2 - minusOne);  
          minusOne = 0;  
      }  
      else{  
          result.unshift(c1 + 10 - c2 - minusOne);  
          minusOne = 1;  
      }  
  }  
  //如果最高位仍然要借位  
  //比如："99999" - "100000"  
  if(minusOne){  
      //=> -(100000 - 99999) => -1  
      var newResult = subtract(b, a);  
      newResult = ltrimZero(newResult);  
      return "-" + newResult;         
  }  
  result = result.join("");  
  result = ltrimZero(result);  
  return result ? result : "0";  
};

var result = subtract('5554433','11223347777');
console.log(result);