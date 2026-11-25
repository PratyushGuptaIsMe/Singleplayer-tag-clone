
import maps from "../maps.js";
import outerWalls from "../outerWalls.js";

export default function game(options){
    const whenStarted = elapsed;
    const timeForGame = options.gameLength;
    let timeLeft = timeForGame - elapsed + whenStarted;
    //timeleft = 25 - 20 + 10

    let gameEnded = false;

    let playerCount = options.players;

    const PLAYER_SIZE = 50;
    let playerPos = {
        x: 25,
        y: 30,
    };
    let playerPoints = [];
    let largestX = 0;
    let largestY = 0;

    let smallestX = gameWidth;
    let smallestY = gameHeight;
    const airJumps = 1;
    const movementSpeed = 350;
    const itPlayerSpeedBoost = 100;
    const jumpForce = 600;
    const gravity = 1000;
    const bonusGravityOnEnd = 1000;
    const downwardVelocity = 0; //DO NOT CHANGE
    setGravity(gravity);

    const currentTagCooldownTop = 1;
    let currentTagCooldown = currentTagCooldownTop;
    let tagOnCooldown = true;

    let currentCameraScale = 0.56;

    let loseScreenTransitionPos=vec2(gameWidth,0);
    let endScreenColor = rgb("#fffb00");

    let wallLength = 2500;
    let wallHeight = 1200;
    let wallThickness = 25;
    setBackground("#2299e3");

    // RECT AT 0,0
    add([rect(10, 10), pos(0, 0), color("#ad9847")]);

    let arenaBackground = add([
        rect(wallLength, wallHeight),
        pos(0, 0),
        color("#342a6b"),
    ]);

    outerWalls.createOuterWalls(wallLength, wallHeight, wallThickness);

    maps.addMap1();
    //adding 1 map (the default)


    //#region players
    let player1;
    let player2;
    let player3;
    let player4;
    let players = [];
    let currentlyIt;

    let loser;

    player1 = add([
        rect(PLAYER_SIZE, PLAYER_SIZE),
        pos(playerPos.x, playerPos.y),
        color("#47ad7c"),
        body({ jumpForce: jumpForce }),
        area(),

        "player",
        {
            movementKeys: {
                up: "up",
                down: "down",
                left: "left",
                right: "right",
            },
            airJumpsLeft: airJumps,
        },
    ]);

    player2 = add([
        rect(PLAYER_SIZE, PLAYER_SIZE),
        pos(playerPos.x + 100, playerPos.y),
        color("#77a610"),
        body({ jumpForce: jumpForce }),
        area(),

        "player",
        {
            movementKeys: {
                up: "w",
                down: "s",
                left: "a",
                right: "d",
            },
            airJumpsLeft: airJumps,
        },
    ]);
    players.push(player1);
    players.push(player2);

    if (playerCount >= 3) {
        player3 = add([
            rect(PLAYER_SIZE, PLAYER_SIZE),
            pos(playerPos.x + 200, playerPos.y),
            color("#c68400"),
            body({ jumpForce: jumpForce }),
            area(),

            "player",
            {
                movementKeys: {
                    up: "i",
                    down: "k",
                    left: "j",
                    right: "l",
                },
                airJumpsLeft: airJumps,
            },
        ]);
        players.push(player3);
    }
    if (playerCount === 4) {
        player4 = add([
            rect(PLAYER_SIZE, PLAYER_SIZE),
            pos(playerPos.x + 300, playerPos.y),
            color("#c60059"),
            body({ jumpForce: jumpForce }),
            area(),

            "player",
            {
                movementKeys: {
                    up: "t",
                    down: "g",
                    left: "f",
                    right: "h",
                },
                airJumpsLeft: airJumps,
            },
        ]);
        players.push(player4);
    }

    currentlyIt = players[Math.floor(Math.random() * playerCount)];
    currentlyIt.tag("it");


    for (let player of players) {
        player.vel.y = downwardVelocity;

        let mk = player.movementKeys;
        onKeyPress(mk.up, () => {
            if (gameEnded) {
                return;
            }

            if (player.isGrounded()) {
                player.jump();
            } else if (player.airJumpsLeft > 0) {
                player.jump();
                player.airJumpsLeft--;
            }
        });
    }

    //#endregion

    onUpdate(() => {
        timeLeft = timeForGame - elapsed + whenStarted;

        if (timeLeft <= 0) {
            gameEnded = true;
            setGravity(gravity+bonusGravityOnEnd)
        }

        if (gameEnded === true) {
            loser = currentlyIt;
        }



        if(loseScreenTransitionPos.x.toFixed(0)==0&& loseScreenTransitionPos.y.toFixed(0)==0
){
                        go("lose_screen",{loser:loser,endScreenColor:endScreenColor,gameOptions:options})

        }

        currentTagCooldown -= dt();
        if (currentTagCooldown <= 0) {
            tagOnCooldown = false;
        }

        playerPoints = [];

        for (let player of players) {
            processPlayer(player);
        }

        largestX = 0;
        largestY = 0;
        smallestX = wallLength;
        smallestY = wallHeight;
        for (let point of playerPoints) {
            if (point.x > largestX) {
                largestX = point.x;
            }
            if (point.x < smallestX) {
                smallestX = point.x;
            }
            if (point.y > largestY) {
                largestY = point.y;
            }
            if (point.y < smallestY) {
                smallestY = point.y;
            }
        }
                setCameraControls();

    });

    onDraw(() => {
        let itTriangleHeight = 50;
        let distanceFromPlayer = 10;
        drawTriangle({
            p1: vec2(0, 0),
            p2: vec2(currentlyIt.width, 0),
            p3: vec2(currentlyIt.width / 2, itTriangleHeight),
            pos: vec2(
                currentlyIt.pos.x,
                currentlyIt.pos.y - itTriangleHeight - distanceFromPlayer,
            ),
            color: rgb(0, 0, 255),
        });

        let tagCooldownCounter = currentTagCooldown.toFixed(2);
        if (tagCooldownCounter < 0) {
            tagCooldownCounter = "";
        }

        drawText({
            text: tagCooldownCounter,
            size: 24,
            font: "sans-serif",
            width: 60,
            pos: vec2(
                currentlyIt.pos.x,
                currentlyIt.pos.y - itTriangleHeight - distanceFromPlayer * 4,
            ),
            color: rgb(0, 0, 255),
        });
        drawText({
            text: Math.ceil(timeLeft),
            size: 48,
            font: "sans-serif",
            width: 120,
            pos: vec2(gameWidth / 2, 100),
            color: rgb(0, 0, 0),
            fixed: true,
        });

        if (gameEnded && timeLeft <= 0.5) {
            let transitionSpeed = 0.05;
            loseScreenTransitionPos.x = lerp(loseScreenTransitionPos.x,0,transitionSpeed);
            drawRect({
                width:gameWidth,
                height:gameHeight,
                pos:loseScreenTransitionPos,
color: endScreenColor       ,     fixed:true
            })
        }




        if (debug.inspect === false) {
            return
        }

        drawPolygon({
            pts: [
                vec2(smallestX, smallestY),
                vec2(largestX, smallestY),
                vec2(largestX, largestY),
                vec2(smallestX, largestY),
            ],
            color: rgb(14, 14, 200),
            opacity: 0.2,
        });
    });

    onCollideUpdate("it", "player", (a, b, col) => {
        if (gameEnded) {
            return;
        }

        if (tagOnCooldown) {
            return;
        }

        if (a === b) {
            return;
        }

        tagOnCooldown = true;
        currentTagCooldown = currentTagCooldownTop;

        a.untag("it");
        b.tag("it");
        currentlyIt = b;
    });

    function processPlayer(player) {

            if (player.isGrounded()) {
                player.airJumpsLeft = airJumps;
            }
            playerMovement(player);
            playerPoints.push(vec2(player.pos.x, player.pos.y));
            playerPoints.push(vec2(player.pos.x + PLAYER_SIZE, player.pos.y));
            playerPoints.push(
                vec2(player.pos.x + PLAYER_SIZE, player.pos.y + PLAYER_SIZE),
            );
            playerPoints.push(vec2(player.pos.x, player.pos.y + PLAYER_SIZE));
    }

    function playerMovement(player) {
        if (gameEnded) {
            return;
        }

        let mk = player.movementKeys;
        let actualMovementSpeed = movementSpeed;
        if (player.is("it")) {
            actualMovementSpeed = movementSpeed + itPlayerSpeedBoost;
        }
        if (isKeyDown(mk.right)) {
            player.move(actualMovementSpeed, 0);
        }
        if (isKeyDown(mk.left)) {
            player.move(-actualMovementSpeed, 0);
        }
    }

    function setCameraControls() {
        if (gameEnded) {
            return;
        }

        // We need to :
        // 1. set Scale of Camera based on how far apart players are
        // 2. Set Position of camera based on the player's location

        const highestScale = 0.9;
        const lowestScale = 0.4;

        let boundingBoxpadding = PLAYER_SIZE;

        let cameraZoneX = largestX - smallestX;
        let cameraZoneY = largestY - smallestY;

        let scaleXratio =
            (gameWidth / (cameraZoneX + boundingBoxpadding)) * 0.55;
        let scaleYratio =
            (gameHeight / (cameraZoneY + boundingBoxpadding)) * 0.55;

        let scale = Math.min(scaleXratio, scaleYratio, highestScale);
        // throw HighestScale in there to save code for the if statement

        if (scale < lowestScale) {
            scale = lowestScale;
        }

        let lerpSpeed = 0.5;
        currentCameraScale = lerp(currentCameraScale, scale, lerpSpeed);

        let camPosX = smallestX + cameraZoneX / 2;
        let camPosY = smallestY + cameraZoneY / 2;
        let currentCamPos = getCamPos();
        let camPositionX = lerp(currentCamPos.x, camPosX, lerpSpeed);
        let camPositionY = lerp(currentCamPos.y, camPosY, lerpSpeed);

        setCamPos(camPositionX, camPositionY);
        setCamScale(currentCameraScale, currentCameraScale);
    }}

// export default {
//     game:game
// }