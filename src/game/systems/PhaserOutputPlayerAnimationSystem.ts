import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"
import {IMovementComponentState, MOVEMENT_COMPONENT_NAME} from "game/components/MovementComponent"

const PhaserPlayerAnimationSystemName = "PhaserOutputPlayerAnimationSystem"

class PhaserOutputPlayerAnimationSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
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

        if (movementComp.movesDown && movementComp.curVelocityY !== 0) {
            inj.playerGO.setDownMovementPose()
        }
        if (movementComp.movesLeft && movementComp.curVelocityX !== 0) {
            inj.playerGO.setLeftMovementPose()
        }
        if (movementComp.movesRight && movementComp.curVelocityX !== 0) {
            inj.playerGO.setRightMovementPose()
        }

        return
    }
}

export default new PhaserOutputPlayerAnimationSystem(PhaserPlayerAnimationSystemName)
