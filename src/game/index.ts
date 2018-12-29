import Phaser from "phaser"
import {BootScene} from "game/scenes/BootScene"
import {PreloadScene} from "game/scenes/PreloadScene"
import {GameScene} from "game/scenes/GameScene"

// main game configuration
export const defaultGameConfig: GameConfig = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    parent: "game",
    scene: [
        BootScene,
        PreloadScene,
        GameScene,
    ],
    backgroundColor: "#292929",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: true,
        },
    },
    render: {
        antialias: false,
        pixelArt: true,
    },
}

export interface IGameConfig {
    width: number
    height: number
}

export const createGameConfig = ({ width, height}: IGameConfig) => {
    return {
        ...defaultGameConfig,
        width,
        height,
    }
}

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config)
    }
}
