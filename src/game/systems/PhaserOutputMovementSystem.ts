import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {IMovementComponentState, MOVEMENT_COMPONENT_NAME} from "game/components/MovementComponent"
import {GO_COMPONENT_NAME, IGOComponentState} from "game/components/GOComponent"
import {GOSprite} from "game/GOManager"

const PhaserOutputMovementSystemName = "PhaserOutputMovementSystemName"

class PhaserOutputMovementSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {
        const entities = entityManager.queryByComponentsName([
            MOVEMENT_COMPONENT_NAME,
            GO_COMPONENT_NAME,
        ])

        for (let i = 0; i < entities.length; i++) {
            const ent = entities[i]
            const movementComp: IMovementComponentState = ent.componentsByName[MOVEMENT_COMPONENT_NAME].state
            const goIdComp = ent.componentsByName[GO_COMPONENT_NAME].state as IGOComponentState
            const go = inj.goManager.getGOById(goIdComp.id) as GOSprite
            go.body.setVelocity(
                movementComp.curVelocityX,
                movementComp.curVelocityY,
            )
        }

        return
    }
}

export default new PhaserOutputMovementSystem(PhaserOutputMovementSystemName)
