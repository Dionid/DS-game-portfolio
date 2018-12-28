import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {IPositionComponentState, POSITION_COMPONENT_NAME} from "game/components/PositionComponent"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"
import {GO_COMPONENT_NAME, IGOComponentState} from "game/components/GOComponent"
import {GOSprite} from "game/GOManager"

const PhaserInputPositionSystemName = "PhaserInputPositionSystem"

class PhaserInputPositionSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {

        const entities = entityManager.queryByComponentsName([
            PLAYER_COMPONENT_NAME,
            POSITION_COMPONENT_NAME,
            GO_COMPONENT_NAME,
        ])

        for (let i = 0; i < entities.length; i++) {
            const ent = entities[i]
            const posComp = ent.componentsByName[POSITION_COMPONENT_NAME].state as IPositionComponentState
            const goIdComp = ent.componentsByName[GO_COMPONENT_NAME].state as IGOComponentState
            const go = inj.goManager.getGOById(goIdComp.id) as GOSprite

            posComp.x = go.x
            posComp.y = go.y
            posComp.width = go.width
            posComp.height = go.height
        }

        return
    }
}

export default new PhaserInputPositionSystem(PhaserInputPositionSystemName)
