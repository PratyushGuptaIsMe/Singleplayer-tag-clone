export default function lose_screen(options){
let gameOptions = options.gameOptions
    let loser  = options.loser;
    let loseScreenpos = vec2(gameWidth,0)


    setGravity(0)

    add([
        rect(gameWidth,gameHeight),
        pos(vec2(0,0)),
        fixed(),
        color(options.endScreenColor)
    ])

    let loserScreen = add([
        rect(gameWidth,gameHeight),
        pos(loseScreenpos),
        fixed(),
        color("#ba0b0b")
    ])


    onUpdate(()=>{
        let lerpSpeed = 0.05
        loseScreenpos.x = lerp(loseScreenpos.x,0,lerpSpeed)

        loserScreen.pos.x = loseScreenpos.x
    })

loserScreen.add([
    text("LOSER", {
        size: 80,
        font: "Lilita One",
    }),
    pos(100,100),
    color("#000000"),
]);loserScreen.add(loser);
loser.pos=vec2(loserScreen.width/2,loserScreen.height/3)
loser.width=loser.width*5;
loser.height=loser.height*5;


loserScreen.add([
        rect(160, 50, { radius: 8 }),
        pos(vec2(100, loserScreen.height/2)),
        color("#caca2d"),
        area(),
        opacity(0.7),
        "againBtn"
    ]).add([
        text("Again", { size: 40, font: "Lilita One" }),
        pos(55, 7),
        opacity(0.85),
        color("#300856"),
    ]);

loserScreen.add([
        rect(160, 50, { radius: 8 }),
        pos(vec2(100, (loserScreen.height/2) + 60)),
        color("#a4a498"),
        area(),
        opacity(0.7),
        "homeBtn"
    ]).add([
        text("Home", { size: 40, font: "Lilita One" }),
        pos(55, 7),
        opacity(0.85),
        color("#300856"),
    ]);

    onClick("againBtn",()=>{
        go("game", gameOptions)
    })
        onClick("homeBtn",()=>{
            go("main_menu")
    })

}
