import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {IBodyComponentState, BODY_COMPONENT_NAME} from "game/components/BodyComponent"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"
import {GO_COMPONENT_NAME, IGOComponentState} from "game/components/GOComponent"
import {GOSprite} from "game/GOManager"

const PhaserInputBodySystemName = "PhaserInputBodySystem"

class PhaserInputBodySystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {

        const entities = entityManager.queryByComponentsName([
            PLAYER_COMPONENT_NAME,
            BODY_COMPONENT_NAME,
            GO_COMPONENT_NAME,
        ])

        for (let i = 0; i < entities.length; i++) {
            const ent = entities[i]
            const bodyComp = ent.componentsByName[BODY_COMPONENT_NAME].state as IBodyComponentState
            const goIdComp = ent.componentsByName[GO_COMPONENT_NAME].state as IGOComponentState
            const go = inj.goManager.getGOById(goIdComp.id) as GOSprite
            bodyComp.speed = go.body.speed
            bodyComp.x = go.body.x
            bodyComp.y = go.body.y
            bodyComp.width = go.body.width
            bodyComp.height = go.body.height
        }

        return
    }
}

export default new PhaserInputBodySystem(PhaserInputBodySystemName)
