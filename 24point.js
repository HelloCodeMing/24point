function deepCopy(proto, copy) {
	var copy = copy || {};
	for (var i in proto) {
		if (typeof proto[i] === "object") {
			copy[i] = (proto[i].constructor === Array) ? [] : {};
			deepCopy(proto[i], copy[i]);
		} else {
			copy[i] = proto[i];
		}
	}
	return copy;
}

function transfer(arr, operation, index, numberA, numberB, expA, expB) {
	var obj = deepCopy(arr);
	obj.num[index] = eval(numberA.toString() + " " + operation + " " + numberB);
	obj.expressions[index] = "(" + expA + operation + expB + ")";
	return obj;
}
function calc(arr) {
	if (arr.length == 4) {
		var tmp = arr;
		arr = { };
		arr.num = [];
		arr.expressions = [];
		for (var i in tmp) {
			arr.num[i] = tmp[i];
			arr.expressions[i] = tmp[i].toString();
		}
	}
	if (arr.num.length == 1) {
		if (arr.num[0] == 24) {
			console.log(arr.expressions[0]);
			return true;
		}
		else {
			return false;
		}
	} else {
		for (var i = 0; i < arr.num.length; i++) 
			for (var j = i + 1; j < arr.num.length; j++) {
				var a = arr.num[i];
				var b = arr.num[j];
				var expa = arr.expressions[i];
				var expb = arr.expressions[j];
				var tmp;
				arr.num.splice(j, 1);
				arr.expressions.splice(j, 1);

				tmp = transfer(arr, "+", i, a, b, expa, expb);
				calc(tmp);
				tmp = transfer(arr, "-", i, a, b, expa, expb);
				calc(tmp);
				tmp = transfer(arr, "*", i, a, b, expa, expb);
				calc(tmp);
				if (b != 0) {
					tmp = transfer(arr, "/", i, a, b, expa, expb);
					calc(tmp);
				}
				if (a != 0) {
					tmp = transfer(arr, "/", i, b, a, expb, expa);
					calc(tmp);
				}
				tmp = transfer(arr, "-", i, b, a, expb, expa);
				calc(tmp);

				//restore
				arr.num.splice(j, 0, b);
				arr.expressions.splice(j, 0, expb);
			}
	}
}
var arr5 = [2, 4, 6, 7];
calc(arr5);
