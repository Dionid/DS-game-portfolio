import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {IPositionComponentState, POSITION_COMPONENT_NAME} from "game/components/PositionComponent"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"

const PhaserInputPositionSystemName = "PhaserInputPositionSystem"

class PhaserInputPositionSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {

        const plEnt = entityManager.queryByComponentsName([
            PLAYER_COMPONENT_NAME,
            POSITION_COMPONENT_NAME,
        ])[0]

        const posComp = plEnt.componentsByName[POSITION_COMPONENT_NAME].state as IPositionComponentState

        posComp.x = inj.playerGO.x
        posComp.y = inj.playerGO.y
        posComp.width = inj.playerGO.width
        posComp.height = inj.playerGO.height

        return
    }
}

export default new PhaserInputPositionSystem(PhaserInputPositionSystemName)
