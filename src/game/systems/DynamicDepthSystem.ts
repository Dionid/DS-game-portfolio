import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {MOVEMENT_COMPONENT_NAME} from "game/components/MovementComponent"
import {DEPTH_COMPONENT_NAME, IDepthComponentComponentState} from "game/components/DepthComponent"
import {GO_COMPONENT_NAME, IGOComponentState} from "game/components/GOComponent"
import {BODY_COMPONENT_NAME} from "game/components/BodyComponent"

const DynamicDepthSystemName = "DynamicDepthSystem"

class DynamicDepthSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {

        const entities = entityManager.queryByComponentsName([
            BODY_COMPONENT_NAME,
            DEPTH_COMPONENT_NAME,
        ])

        for (let i = 0; i < entities.length; i++) {
            const ent = entities[i]
            ent.componentsByName[DEPTH_COMPONENT_NAME].state.depth = ent.componentsByName[BODY_COMPONENT_NAME].state.y
        }

        return
    }
}

export default new DynamicDepthSystem(DynamicDepthSystemName)
