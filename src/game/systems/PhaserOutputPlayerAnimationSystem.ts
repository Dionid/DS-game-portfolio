import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"
import {IMovementComponentState, MOVEMENT_COMPONENT_NAME} from "game/components/MovementComponent"
import {GO_COMPONENT_NAME} from "game/components/GOComponent"

const PhaserPlayerAnimationSystemName = "PhaserOutputPlayerAnimationSystem"

class PhaserOutputPlayerAnimationSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {
        const playerEntity = entityManager.queryByComponentsName([
            PLAYER_COMPONENT_NAME,
        ])[0]

        const movementComp: IMovementComponentState = playerEntity.componentsByName[MOVEMENT_COMPONENT_NAME].state
        const go = inj.goManager.getGOById(playerEntity.componentsByName[GO_COMPONENT_NAME].state.id)

        if (movementComp.movesDown && movementComp.curVelocityY !== 0) {
            go.setDownMovementPose()
        }
        if (movementComp.movesLeft && movementComp.curVelocityX !== 0) {
            go.setLeftMovementPose()
        }
        if (movementComp.movesRight && movementComp.curVelocityX !== 0) {
            go.setRightMovementPose()
        }

        return
    }
}

export default new PhaserOutputPlayerAnimationSystem(PhaserPlayerAnimationSystemName)
