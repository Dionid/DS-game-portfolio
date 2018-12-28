import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"
import {IMovementComponentState, MOVEMENT_COMPONENT_NAME} from "game/components/MovementComponent"

const PhaserOutputPlayerMovementSystemName = "PhaserOutputPlayerMovementSystemName"

class PhaserOutputPlayerMovementSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
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

        inj.playerGO.body.setVelocity(
            movementComp.curVelocityX,
            movementComp.curVelocityY,
        )

        return
    }
}

export default new PhaserOutputPlayerMovementSystem(PhaserOutputPlayerMovementSystemName)
