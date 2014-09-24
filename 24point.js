function transfer(arr, operation, index, expA, expB) {
	var obj = [];
	for (var i in arr)
		obj[i] = arr[i];
	obj[index] = expA + " " + operation + " " + expB;
	if (operation === "-" || operation === "+")
		obj[index] = "(" + obj[index] + ")";
	return obj;
}

function calc(arr) {
	if (arr.length == 4) {
		for (var i in arr) {
			arr[i] = arr[i].toString();
		}
	}

	if (arr.length == 1) {
		if (eval(arr[0]) == 24) {
			console.log(arr[0]);
			return true;
		}
		else {
			return false;
		}
	} else {
		for (var i = 0; i < arr.length; i++) 
			for (var j = i + 1; j < arr.length; j++) {
				var expa = arr[i];
				var expb = arr[j];
				var tmp;
				arr.splice(j, 1);

				tmp = transfer(arr, "+", i, expa, expb);
				calc(tmp);
				tmp = transfer(arr, "-", i, expa, expb);
				calc(tmp);
				tmp = transfer(arr, "*", i, expa, expb);
				calc(tmp);
				if (expb != 0) {
					tmp = transfer(arr, "/", i, expa, expb);
					calc(tmp);
				}
				if (expa != 0) {
					tmp = transfer(arr, "/", i, expb, expa);
					calc(tmp);
				}
				tmp = transfer(arr, "-", i, expb, expa);
				calc(tmp);

				//restore
				arr.splice(j, 0, expb);
			}
	}
}
var arr5 = [2, 4, 6, 7];
calc(arr5);
var arr1 = [1, 2, 3, 4];
calc(arr1);
