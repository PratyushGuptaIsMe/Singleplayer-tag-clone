// import k from "./main.js";



export function addMap1() {
    let map1 = [[
rect(505, 25),
pos(1080, 190),
color("#163325"),
body({ isStatic: true }),
area(),

"block",
    ],

    [
rect(890, 25),
pos(110, 345),
color("#163325"),
area(),
body({ isStatic: true }),
"block",
    ],

    [
rect(160, 25),
pos(2240, 250),
color("#163325"),
area(),
body({ isStatic: true }),
"block",
    ],

    // Upper-middle platforms
    [
rect(205, 25),
pos(0, 510),
color("#163325"),
area(),
body({ isStatic: true }),
"block",
    ],

    [
rect(150, 25),
pos(1400, 470),
color("#163325"),
area(),
body({ isStatic: true }),
"block",
    ],

    [
rect(445, 25),
pos(1880, 410),
color("#163325"),
area(),
body({ isStatic: true }),
"block",
    ],

    // Middle platforms
    [
rect(480, 25),
pos(85, 655),
color("#163325"),
area(),
body({ isStatic: true }),
"block",
    ],

    [
rect(345, 25),
pos(785, 655),
color("#163325"),
area(),
body({ isStatic: true }),
"block",
    ],

    [
rect(980, 25),
pos(1500, 655),
color("#163325"),
area(),
body({ isStatic: true }),
"block",
    ],

    // Lower-middle platforms
    [
rect(315, 25),
pos(510, 855),
color("#163325"),
area(),
body({ isStatic: true }),
"block",
    ],

    [
rect(390, 25),
pos(1150, 855),
color("#163325"),
area(),
body({ isStatic: true }),
"block",
    ],

    // Bottom platforms
    [
rect(640, 25),
pos(260, 1000),
color("#163325"),
area(),
body({ isStatic: true }),
"block",
    ],

    [
rect(745, 25),
pos(1480, 1000),
color("#163325"),
area(),
body({ isStatic: true }),
"block",
    ]]
    
    map1.forEach((element)=>{add(element)})
}

let EXPORTS = {
    addMap1:addMap1,
}

export default EXPORTS;