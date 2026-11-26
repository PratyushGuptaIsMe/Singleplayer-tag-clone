export default function main_menu() {
    setBackground("#2299e3");

    add([
        text("TAG", { size: 140, font: "Lilita One" }),
        pos(650, 10),
        color("#3f2928"),
    ]);

    let options = {
        players: 2,
        gameLength: 25,
    };

    let limits = {
        players: {
            upper: 4,
            lower: 2,
        },
        gameLength: {
            upper: 185,
            lower: 15,
        },
    };

    add([
        text("Players", { size: 58, font: "Lilita One", width: "250" }),
        pos(650, 150),
        anchor("topright"),
        color("#3f2928"),
    ]);

    add([
        text("<", { size: 60, font: "Lilita One" }),
        pos(700, 150),
        area({ scale: vec2(2, 1.35), offset: vec2(-10, -10) }),
        color("#3f2928"),
        "p<",
    ]);

    add([
        text(">", { size: 60, font: "Lilita One" }),
        pos(850, 150),
        area({ scale: vec2(2, 1.35), offset: vec2(-10, -10) }),
        color("#3f2928"),
        "p>",
    ]);
    add([
        text("Game Length", { size: 58, font: "Lilita One", width: "390" }),
        pos(650, 250),
        anchor("topright"),
        color("#3f2928"),
    ]);

    add([
        text("<", { size: 60, font: "Lilita One" }),
        pos(700, 250),
        area({ scale: vec2(2, 1.35), offset: vec2(-10, -10) }),
        color("#3f2928"),
        "g<",
    ]);
    add([
        text(">", { size: 60, font: "Lilita One" }),
        pos(850, 250),
        area({ scale: vec2(2, 1.35), offset: vec2(-10, -10) }),

        color("#3f2928"),
        "g>",
    ]);

    onClick("p<", () => {
        if (options.players > 2) {
            options.players--;
        }
        updateButtons();
    });
    onClick("p>", () => {
        if (options.players < 4) {
            options.players++;
        }
        updateButtons();
    });

    onClick("g<", () => {
        if (options.gameLength > 15) {
            options.gameLength -= 5;
        }
        updateButtons();
    });
    onClick("g>", () => {
        if (options.gameLength < 185) {
            options.gameLength += 5;
        }
        updateButtons();
    });
    updateButtons();

    const btn = add([
        rect(160, 50, { radius: 8 }),
        pos(vec2(500, 400)),
        color("#a4a498"),
        area(),
        opacity(0.7),
        "goButton",
    ]).add([
        text("Go!", { size: 40, font: "Lilita One" }),
        pos(55, 7),
        opacity(0.85),
        color("#300856"),
    ]);

    onClick("goButton", () => {
        go("game", options);
    });

    onDraw(() => {
        drawText({
            text: options.players,
            size: 58,
            font: "Lilita One",
            width: 250,
            pos: vec2(775, 150),
            color: rgb(0, 0, 255),
        });
        drawText({
            text: options.gameLength,
            size: 58,
            font: "Lilita One",
            width: 250,
            pos: vec2(763, 250),
            color: rgb(0, 0, 255),
        });
    });

    function updateButtons() {
        let greyedOpacityValue = 0.4;

        if (options.players === limits.players.upper) {
            get("p>")[0].opacity = greyedOpacityValue;
        } else {
            get("p>")[0].opacity = 1;
        }
        if (options.players === limits.players.lower) {
            get("p<")[0].opacity = greyedOpacityValue;
        } else {
            get("p<")[0].opacity = 1;
        }
        if (options.gameLength === limits.gameLength.upper) {
            get("g>")[0].opacity = greyedOpacityValue;
        } else {
            get("g>")[0].opacity = 1;
        }
        if (options.gameLength === limits.gameLength.lower) {
            get("g<")[0].opacity = greyedOpacityValue;
        } else {
            get("g<")[0].opacity = 1;
        }

        options.players;
        options.gameLength;
    }
}
