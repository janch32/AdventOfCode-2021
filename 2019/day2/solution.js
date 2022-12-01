#!/usr/bin/env node

/**
 * @param {number} arg1 
 * @param {number} arg2 
 * @param {number[]} rom 
 * @returns {number}
 */
function run(arg1, arg2, rom){
    let ram = rom.map((val) => val);
    ram[1] = arg1;
    ram[2] = arg2;
    
    for(let i = 0; i < ram.length - 3; i += 4){
        if(ram[i] == 1)
            ram[ram[i+3]] = ram[ram[i+1]] + ram[ram[i+2]];
        else if(ram[i] == 2)
            ram[ram[i+3]] = ram[ram[i+1]] * ram[ram[i+2]];
        else break;
    }

    return ram[0];
}

const rom = require('fs')
    .readFileSync('input')
    .toString()
    .split(',')
    .map((val) => parseInt(val, 10));


console.log('Solution 1:', run(12, 2, rom));

for(let a = 0; a < 99; a++)
    for(let b = 0; b < 99; b++)
        if(run(a, b, rom) === 19690720)
            console.log('Solution 2:', 100 * a + b);
