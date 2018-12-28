import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {MOVEMENT_COMPONENT_NAME} from "game/components/MovementComponent"
import {DEPTH_COMPONENT_NAME, IDepthComponentComponentState} from "game/components/DepthComponent"
import {GO_COMPONENT_NAME, IGOComponentState} from "game/components/GOComponent"

const PhaserOutputDynamicDepthSystemName = "PhaserOutputDynamicDepthSystem"

class PhaserOutputDynamicDepthSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {

        const entities = entityManager.queryByComponentsName([
            MOVEMENT_COMPONENT_NAME,
            DEPTH_COMPONENT_NAME,
            GO_COMPONENT_NAME,
        ])

        for (let i = 0; i < entities.length; i++) {
            const ent = entities[i]
            const dComp = ent.componentsByName[DEPTH_COMPONENT_NAME].state as IDepthComponentComponentState
            const goIdComp = ent.componentsByName[GO_COMPONENT_NAME].state as IGOComponentState
            const go = inj.goManager.getGOById(goIdComp.id) as Phaser.GameObjects.Sprite
            if (go) {
                go.setDepth(dComp.depth)
            }
        }

        return
    }
}

export default new PhaserOutputDynamicDepthSystem(PhaserOutputDynamicDepthSystemName)
