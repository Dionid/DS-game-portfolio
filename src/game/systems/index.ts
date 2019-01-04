import Cursors from "game/models/Cursors"
import Player from "game/objects/Player"
import GOManager from "game/GOManager"
import {IProjectsById} from "game/models/Portfolio"

export interface ISystemAdditional {
    time: number,
    delta: number,
}

// TODO: Add PhaserToInputsSystem
export interface ISystemPhaserInjectable {
    cursors: Cursors,
    scene: Phaser.Scene,
    goManager: GOManager,
    gameWidth: number,
    gameHeight: number,
    timeSpeedScale: {
        value: number,
    },
    deltaTimeScaled: number
    projectsById: IProjectsById
    // folders: Phaser.GameObjects.Group
    projectsGOGroup: Phaser.GameObjects.Group
}
