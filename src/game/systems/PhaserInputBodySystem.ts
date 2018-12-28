import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {IBodyComponentState, BODY_COMPONENT_NAME} from "game/components/BodyComponent"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"

const PhaserInputBodySystemName = "PhaserInputBodySystem"

class PhaserInputBodySystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {

        const plEnt = entityManager.queryByComponentsName([
            PLAYER_COMPONENT_NAME,
            BODY_COMPONENT_NAME,
        ])[0]

        const bodyComp = plEnt.componentsByName[BODY_COMPONENT_NAME].state as IBodyComponentState

        bodyComp.x = inj.playerGO.body.x
        bodyComp.y = inj.playerGO.body.y
        bodyComp.width = inj.playerGO.body.width
        bodyComp.height = inj.playerGO.body.height

        return
    }
}

export default new PhaserInputBodySystem(PhaserInputBodySystemName)
