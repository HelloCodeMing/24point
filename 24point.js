/*
 * desc: a solvtion for 24point game
 */

/* param:
 * arr: The array to be calculate
 * operation: operator
 * index: The first index to be changed.
 * expA, expB: The left and right arguments.
 * return: an object.
 */

function transfer(arr, operation, index, expA, expB) {
	var obj = [];
	for (var i in arr)
		obj[i] = arr[i];
	obj[index] = expA + " " + operation + " " + expB;
	if (operation === "-" || operation === "+")
		obj[index] = "(" + obj[index] + ")";
	return obj;
}

/* desc: The recurive function
 */

function calc(arr) {
	if (arr.length == 4) {
		// init the array
		for (var i in arr) {
			arr[i] = arr[i].toString();
		}
		arr["result"] = [];
	}

	if (arr.length == 1) {
		if (eval(arr[0]) == 24) {
			if (arr.result.indexOf(arr[0]) == -1)
				arr.result.push(arr[0]);
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

exports.main = function() {
	if (arguments.length == 4) {
		var args = [];
		for (var i = 0; i < 4; i++)
			args[i] = arguments[i];
		console.log("The result of the numbers: ", arguments[0], arguments[1], arguments[2], arguments[3]);
		calc(args);
		if (args.result.length == 0)
			console.log("had no result.");
		else  {
			for (var i in args.result) {
				console.log(args.result[i]);
			}
		}
	}
	else
		console.log("Please enter the right arguments");
}
