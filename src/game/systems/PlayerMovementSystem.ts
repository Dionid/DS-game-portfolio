import System from "game/ECS/system"
import EntitiesManager from "game/ECS/entitiesmanager"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"
import {IMovementComponentState, MOVEMENT_COMPONENT_NAME} from "game/components/MovementComponent"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"

const PlayerMovementSystemName = "playerMovementSystem"

class PlayerMovementSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {
        const playerEntity = entityManager.queryByComponentsName([
            PLAYER_COMPONENT_NAME,
            MOVEMENT_COMPONENT_NAME,
        ])[0]

        const movementComp: IMovementComponentState = playerEntity.componentsByName[MOVEMENT_COMPONENT_NAME].state

        movementComp.movesLeft = false
        movementComp.movesRight = false
        movementComp.movesUp = false
        movementComp.movesDown = false
        movementComp.movesHor = false
        movementComp.movesVert = false

        if (
            inj.cursors.left.isDown ||
            inj.cursors.right.isDown ||
            inj.cursors.up.isDown ||
            inj.cursors.down.isDown
        ) {
            movementComp.movementStopTime = 0
            if (movementComp.movementStartTime === 0) {
                movementComp.movementStartTime = additional.time
            }
            let playerSpeed = inj.playerGO.speed * (additional.delta * 60 / 1000)
            const acc = (additional.time - movementComp.movementStartTime) / movementComp.accelerationTime

            if (acc < 1) {
                playerSpeed *= acc
            }

            if (inj.cursors.shift.isDown) {
                playerSpeed *= movementComp.shiftAcc
            }

            if (inj.cursors.left.isDown && !inj.cursors.right.isDown) {
                movementComp.movesLeft = true
                movementComp.movesHor = true
                movementComp.curVelocityX = -playerSpeed
            } else if (inj.cursors.right.isDown && !inj.cursors.left.isDown) {
                movementComp.movesRight = true
                movementComp.movesHor = true
                movementComp.curVelocityX = playerSpeed
            } else {
                movementComp.curVelocityX = 0
            }

            if (inj.cursors.up.isDown && !inj.cursors.down.isDown) {
                movementComp.movesUp = true
                movementComp.movesVert = true
                movementComp.curVelocityY = -playerSpeed
            } else if (inj.cursors.down.isDown && !inj.cursors.up.isDown) {
                movementComp.movesDown = true
                movementComp.movesVert = true
                movementComp.curVelocityY = playerSpeed
            } else {
                movementComp.curVelocityY = 0
            }

            if (movementComp.movesVert && movementComp.movesHor) {
                movementComp.curVelocityX = movementComp.curVelocityX * .8
                movementComp.curVelocityY = movementComp.curVelocityY * .8
            }
        } else {
            if (movementComp.movementStopTime === 0) {
                movementComp.movementStopTime = additional.time
            }
            movementComp.movementStartTime = 0

            const deacc = 1 - (additional.time - movementComp.movementStopTime) / movementComp.deAccelerationTime

            if (deacc > 0) {
                movementComp.curVelocityX = movementComp.curVelocityX * deacc
                movementComp.curVelocityY = movementComp.curVelocityY * deacc
            } else {
                movementComp.curVelocityX = 0
                movementComp.curVelocityY = 0
            }
        }

        return
    }
}

const playerMovementSystem = new PlayerMovementSystem(PlayerMovementSystemName)

export default playerMovementSystem
