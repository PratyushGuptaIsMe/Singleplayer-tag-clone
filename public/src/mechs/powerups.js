function powerupSpawner(posX, posY) {
    let size = 50;

    return [
        rect(size, size),
        pos(posX, posY),
        anchor("center"),
        color("#000000"),
        opacity(0.5),
        spawnPowerups(),
        area(),
        "powerupSpawner",
    ];
}

function spawnPowerups() {
    return {
        id: "spawnPowerups",
        isPowerupThere: false,
        isPowerupSpawning: false,
        powerup: {},

        powerupTypes: [
            {
                color: "#ff0000",
            },
            {
                color: "#c8ff00",
            },
            {
                color: "#0400ff",
            },
            {
                color: "#15ff00",
            },
        ],
        spawnPowerup() {
            debug.log("spawned powerup");

            let randomPowerupType =
                this.powerupTypes[
                    Math.floor(Math.random() * this.powerupTypes.length)
                ];

            this.powerup = this.add([
                rect(10, 10),
                pos(0, 0),
                anchor("center"),
                color(randomPowerupType.color),
            ]);
        },
        update() {
            if (
                this.isPowerupThere === false &&
                this.isPowerupSpawning === false
            ) {
                this.isPowerupSpawning = true;
                wait(3, () => {
                    this.isPowerupThere = true;
                    this.isPowerupSpawing = false;

                    this.spawnPowerup();
                });
            }
        },
        pickupPowerup() {
            if (this.isPowerupThere === false) {
                return;
            }

            destroy(this.powerup);
            this.isPowerupThere = false;
            this.isPowerupSpawning = false;
        },
    };
}

let EXPORTS = {
    powerupSpawner: powerupSpawner,
};

export default EXPORTS;
