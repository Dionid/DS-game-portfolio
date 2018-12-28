import Cursors from "game/models/Cursors"
import Player from "game/objects/Player"
import GOManager from "game/GOManager"

export interface ISystemAdditional {
    time: number,
    delta: number,
}

// TODO: Add PhaserToInputsSystem
export interface ISystemPhaserInjectable {
    cursors: Cursors,
    scene: Phaser.Scene,
    playerGO: Player,
    goManager: GOManager,
    gameWidth: number,
    gameHeight: number,
}
