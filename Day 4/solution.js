#!/usr/bin/env node

const passwMin = 353096;
const passwMax = 843212;

let firstValid = 0;
let secondValid = 0;
for(let i = passwMin; i <= passwMax; i++){
	let asc = i.toString() == i.toString().split("").sort().join("");
	let hasDouble = false;
	let hasMultiple = false;

	let arr = i.toString().split("");
	for(let j = 1; j < arr.length; j++){
		let len = arr.length;
		while(arr[j] == arr[j-1]) arr.splice(j, 1);
		if(len - arr.length == 1) hasDouble = true;
		if(len - arr.length >= 1) hasMultiple = true;
	}

	if(asc && hasMultiple){
		firstValid++;
		if(hasDouble) secondValid++;
	}
}

console.log("Solution 1:", firstValid);
console.log("Solution 2:", secondValid);
