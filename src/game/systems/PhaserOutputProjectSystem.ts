import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {IProjectComponentState, PROJECT_COMPONENT_NAME} from "game/components/ProjectComponent"
import {BODY_COMPONENT_NAME, IBodyComponentState} from "game/components/BodyComponent"
import {GO_COMPONENT_NAME, IGOComponentState} from "game/components/GOComponent"
import {GOSprite} from "game/GOManager"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"
import {Project} from "game/objects/Project"
const Vector2 = Phaser.Math.Vector2

const PhaserOutputProjectSystemName = "PhaserOutputProjectSystem"

class PhaserOutputProjectSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {

        const entities = entityManager.queryByComponentsName([
            PROJECT_COMPONENT_NAME,
        ])

        const playerEnt = entityManager.queryByComponentsName([
            PLAYER_COMPONENT_NAME,
        ])[0]

        for (let i = 0; i < entities.length; i++) {
            const project = entities[i]
            const projectProjectComp = project.componentsByName[PROJECT_COMPONENT_NAME].state as IProjectComponentState
            const projectBodyComp = project.componentsByName[BODY_COMPONENT_NAME].state as IBodyComponentState
            const goIdComp = project.componentsByName[GO_COMPONENT_NAME].state as IGOComponentState
            const projectGO = inj.goManager.getGOById(goIdComp.id) as Project
            const playerBodyComp = playerEnt.componentsByName[BODY_COMPONENT_NAME].state as IBodyComponentState

            if (!projectProjectComp.isOpened) {
                const prData = inj.projectsById[projectProjectComp.id]
                const plDist = new Vector2(
                    playerBodyComp.x,
                    playerBodyComp.y,
                ).distance(new Vector2(projectBodyComp.x, projectBodyComp.y))
                if (
                    plDist < 100
                ) {
                    console.log(prData.name)
                    if (!projectProjectComp.isTouched) {
                        projectGO.setFrame(`objects/projects/logo${prData.name}Touched.psd`)
                        projectProjectComp.isTouched = true
                    }
                } else {
                    if (projectProjectComp.isTouched) {
                        projectGO.setFrame(`objects/projects/logo${prData.name}.psd`)
                        projectProjectComp.isTouched = false
                    }
                }
                // if (projectProjectComp.isTouched) {
                //     if (inj.cursors.action.isDown) {
                //         projectProjectComp.isOpened = true
                //     }
                // }
            }
        }

        return
    }
}

export default new PhaserOutputProjectSystem(PhaserOutputProjectSystemName)
