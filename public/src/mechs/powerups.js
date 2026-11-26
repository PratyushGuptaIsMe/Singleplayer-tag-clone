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
        drawnPowerup: {},
        powerupTypes: [
            {
                color: "#ff0000",
                buffName: "speed",
                giveBuff(player) {
                    player.buffProperties.speed.inEffect = true;

                    player.bonusSpeedBoost += 500;
                    wait(10, () => {
                        player.bonusSpeedBoost -= 500;
                        player.buffProperties.speed.inEffect = false;
                    });
                    debug.log("picked up speed");
                },
            },
            {
                color: "#00ff37",
                buffName: "invincibility",
                giveBuff(player) {
                    debug.log("picked up invincibility");
                    player.buffProperties.invincibility.inEffect = true;
                    wait(10, () => {
                        player.buffProperties.invincibility.inEffect = false;
                    });
                },
            },
            {
                color: "#0400ff",
                buffName: "jump",
                giveBuff(player) {
                    debug.log("picked up jump");
                    player.buffProperties.jump.inEffect = true;

                    player.jumpForce += 200;
                    wait(10, () => {
                        player.jumpForce -= 200;
                        player.buffProperties.jump.inEffect = false;
                    });
                },
            },
        ],
        powerup: {},
        spawnPowerup() {
            debug.log("spawned powerup");

            this.powerup =
                this.powerupTypes[
                    Math.floor(Math.random() * this.powerupTypes.length)
                ];

            this.drawnPowerup = this.add([
                rect(10, 10),
                pos(0, 0),
                anchor("center"),
                color(this.powerup.color),
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
                    this.isPowerupSpawning = false;

                    this.spawnPowerup();
                });
            }
        },
        pickupPowerup() {
            if (this.isPowerupThere === false) {
                return;
            }
            destroy(this.drawnPowerup);
            this.powerup = {};
            this.isPowerupThere = false;
            this.isPowerupSpawning = false;
        },
    };
}

let EXPORTS = {
    powerupSpawner: powerupSpawner,
};

export default EXPORTS;
