import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {FOLDER_COMPONENT_NAME} from "game/components/FolderComponent"
import {PROJECT_COMPONENT_NAME} from "game/components/ProjectComponent"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"
import {BODY_COMPONENT_NAME, IBodyComponentState} from "game/components/BodyComponent"
import {IMovementComponentState, MOVEMENT_COMPONENT_NAME} from "game/components/MovementComponent"
import {IPositionComponentState, POSITION_COMPONENT_NAME} from "game/components/PositionComponent"

const PhaserOutputPlayerProjectCollisionName = "PhaserOutputPlayerProjectCollision"

class PhaserOutputPlayerProjectCollision extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {

        const entities = entityManager.queryByComponentsName([
            PROJECT_COMPONENT_NAME,
        ])

        const pltEnt = entityManager.queryByComponentsName([
            PLAYER_COMPONENT_NAME,
        ])[0]

        const plBody = pltEnt.componentsByName[BODY_COMPONENT_NAME].state as IBodyComponentState

        for (let i = 0; i < entities.length; i++) {
            const project = entities[i]
            const projectBodyComp = project.componentsByName[BODY_COMPONENT_NAME].state as IBodyComponentState
            const projectPosComp = project.componentsByName[POSITION_COMPONENT_NAME].state as IPositionComponentState
            const pltMovComp = pltEnt.componentsByName[MOVEMENT_COMPONENT_NAME].state as IMovementComponentState

            // inj.scene.physics.collide()

            // if (
            //     plBody.x < projectBodyComp.x + projectBodyComp.width &&
            //     plBody.x + plBody.width > projectBodyComp.x &&
            //     plBody.y < projectBodyComp.y + projectBodyComp.height &&
            //     plBody.y + plBody.height > projectBodyComp.y
            // ) {
            //     console.log("COLLISION")
            //
            //     const projMovComp = project.componentsByName[MOVEMENT_COMPONENT_NAME].state as IMovementComponentState
            //     // projectPosComp.x =
            //     projMovComp.curVelocityX = pltMovComp.curVelocityX * 1.1
            //     projMovComp.curVelocityY = pltMovComp.curVelocityY * 1.1
            // }

        }

        return
    }
}

export default new PhaserOutputPlayerProjectCollision(PhaserOutputPlayerProjectCollisionName)
