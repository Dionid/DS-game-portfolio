import Cursors from "game/models/Cursors"
import {Player} from "game/objects/Player"

export interface ISystemAdditional {
    time: number,
    delta: number,
}

// TODO: Add PhaserToInputsSystem
export interface ISystemPhaserInjectable {
    cursors: Cursors,
    playerGO: Player,
    gameWidth: number,
    gameHeight: number,
}
