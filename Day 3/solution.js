#!/usr/bin/env node

function intersect(a, b){
    if(a.X1 > a.X2) [a.X1, a.X2] = [a.X2, a.X1];
    if(a.Y1 > a.Y2) [a.Y1, a.Y2] = [a.Y2, a.Y1];
    if(b.X1 > b.X2) [b.X1, b.X2] = [b.X2, b.X1];
    if(b.Y1 > b.Y2) [b.Y1, b.Y2] = [b.Y2, b.Y1];

    const aHor = a.Y1 == a.Y2;
    const bHor = b.Y1 == b.Y2;

    if(aHor && !bHor){
        if(a.X1 <= b.X1 && a.X2 >= b.X1 && a.Y1 >= b.Y1 && a.Y1 <= b.Y2)
            return {X: b.X1, Y: a.Y1};
    }else if(!aHor && bHor){
        if(a.Y1 <= b.Y1 && a.Y2 >= b.Y1 && a.X1 >= b.X1 && a.X1 <= b.X2)
            return {X: a.X1, Y: b.Y1};
    }

    return null;
}

function calculatePos(x, y, ins){
    const delta = parseInt(ins.substr(1), 10);
    switch(ins[0]){
        case "U": return [x, y + delta];
        case "D": return [x, y - delta];
        case "L": return [x - delta, y];
        case "R": return [x + delta, y];
    }
    return [x, y];
}

let data = require("fs")
    .readFileSync("input", "utf8")
    .split("\n")
    .map((val) => val.split(","))


let intersections = [];
let aX1 = 0;
let aY1 = 0;
let aLen = 0;
data[0].forEach((a) => {
    let aX2, aY2;
    let bX1 = 0;
    let bY1 = 0;
    [aX2, aY2] = calculatePos(aX1, aY1, a);
    
    let bLen = 0;
    data[1].forEach((b) => {
        let bX2, bY2;
        [bX2, bY2] = calculatePos(bX1, bY1, b);
        
        let i = intersect(
            {X1: aX1, X2: aX2, Y1: aY1, Y2: aY2}, 
            {X1: bX1, X2: bX2, Y1: bY1, Y2: bY2}
        );
        
        if(i){
            let len = Math.abs(aX1 - i.X) + Math.abs(aY1 - i.Y);
            len += Math.abs(bX1 - i.X) + Math.abs(bY1 - i.Y);
            if(aLen + bLen + len > 0) intersections.push({...i, Len: aLen + bLen + len });
        } 
        bLen += parseInt(b.substr(1), 10);
        [bX1, bY1] = [bX2, bY2];
    });

    aLen += parseInt(a.substr(1), 10);
        
    [aX1, aY1] = [aX2, aY2];
});

console.log("Solution 1:", intersections
    .map((val) => Math.abs(val.X) + Math.abs(val.Y))
    .sort((a, b) => a > b ? 1 : -1)[0]
);

console.log("Solution 2:", intersections
    .map((val) => val.Len)
    .sort((a, b) => a > b ? 1 : -1)[0]
);
