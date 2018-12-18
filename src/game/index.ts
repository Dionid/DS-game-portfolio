import Phaser from "phaser"

// main game configuration
export const gameConfig: GameConfig = {
    // width: 320,
    // height: 568,
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    parent: "game",
    scene: [
    ],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 10 },
            // debug: true,
        },
    },
    render: {
        antialias: false,
        pixelArt: true,
    },
}

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config)
    }
}
