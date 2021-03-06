import {IComponentFactory} from "game/ECS/types"

export interface IMovementComponentState {
    active: boolean

    maxVelocity: number
    curVelocityX: number
    curVelocityY: number
    shiftAcc: number
    movementStartTime: number
    movementStopTime: number
    accelerationTime: number
    deAccelerationTime: number

    movesLeft: boolean
    movesRight: boolean
    movesUp: boolean
    movesDown: boolean
    movesVert: boolean
    movesHor: boolean
}

export const MOVEMENT_COMPONENT_NAME = "MovementComponent"

const MovementComponentFactory: IComponentFactory<IMovementComponentState> = (
    maxVelocity: number,
    accelerationTime: number,
    deAccelerationTime: number,
    shiftAcc: number,
    curVelocityX?: number,
    curVelocityY?: number,
    ) => {
    return {
        name: MOVEMENT_COMPONENT_NAME,
        state: {
            active: true,
            maxVelocity,
            curVelocityX: curVelocityX || 0,
            curVelocityY: curVelocityY || 0,
            shiftAcc,
            movementStartTime: 0,
            movementStopTime: 0,
            accelerationTime,
            deAccelerationTime,
            movesLeft: false,
            movesRight: false,
            movesUp: false,
            movesDown: false,
            movesVert: false,
            movesHor: false,
        },
    }
}

export default MovementComponentFactory
