import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"
import {IMovementComponentState, MOVEMENT_COMPONENT_NAME} from "game/components/MovementComponent"
import {IPositionComponentState, POSITION_COMPONENT_NAME} from "game/components/PositionComponent"

const WorldBorderCollisionSystemName = "WorldBorderCollisionSystem"

class WorldBorderCollisionSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {

        const entities = entityManager.queryByComponentsName([
            MOVEMENT_COMPONENT_NAME,
            POSITION_COMPONENT_NAME,
        ])

        for (let i = 0; i < entities.length; i++) {
            const pl = entities[i]
            const posComp = pl.componentsByName[POSITION_COMPONENT_NAME].state as IPositionComponentState
            const movComp = pl.componentsByName[MOVEMENT_COMPONENT_NAME].state as IMovementComponentState
            if (
                posComp.x + posComp.width / 2 >= inj.gameWidth && movComp.curVelocityX > 0
                ||
                posComp.x - posComp.width / 2 <= 0 && movComp.curVelocityX < 0
            ) {
                movComp.curVelocityX = 0
            }

            if (
                posComp.y - posComp.height / 2 <= 0 && movComp.curVelocityY < 0
                ||
                posComp.y + posComp.height / 2 > inj.gameHeight && movComp.curVelocityY > 0
            ) {
                movComp.curVelocityY = 0
            }
        }

        return
    }
}

export default new WorldBorderCollisionSystem(WorldBorderCollisionSystemName)
