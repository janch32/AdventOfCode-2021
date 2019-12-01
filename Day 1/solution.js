#!/usr/bin/env node

const calculateFuel = (mass) =>
    isNaN(mass) ? 0 : Math.floor(mass / 3) - 2;

let fuelFirst = 0;
let fuelSecond = 0;

require("fs")
    .readFileSync("input")
    .toString()
    .split("\n")
    .map((val) => parseInt(val, 10))
    .forEach((mass) => {
        let fuel = calculateFuel(mass);
        fuelFirst += fuel;
        
        do fuelSecond += fuel;
        while((fuel = calculateFuel(fuel)) > 0);    
    });

console.log("Solution 1:", fuelFirst);
console.log("Solution 2:", fuelSecond);

