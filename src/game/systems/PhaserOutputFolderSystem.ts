import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {FOLDER_COMPONENT_NAME, IFolderComponentState} from "game/components/FolderComponent"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"
import GOComponentFactory, {GO_COMPONENT_NAME, IGOComponentState} from "game/components/GOComponent"
import BodyComponentFactory, {BODY_COMPONENT_NAME, IBodyComponentState} from "game/components/BodyComponent"
import {GOSprite} from "game/GOManager"
import {Project} from "game/objects/Project"
import ProjectComponentFactory from "game/components/ProjectComponent"
import MovementComponentFactory from "game/components/MovementComponent"
import PositionComponentFactory from "game/components/PositionComponent"
import DepthComponentComponentFactory from "game/components/DepthComponent"
const Vector2 = Phaser.Math.Vector2

const PhaserOutputFolderSystemName = "PhaserOutputFolderSystem"

class PhaserOutputFolderSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {

        const entities = entityManager.queryByComponentsName([
            FOLDER_COMPONENT_NAME,
        ])

        const playerEnt = entityManager.queryByComponentsName([
            PLAYER_COMPONENT_NAME,
        ])[0]

        for (let i = 0; i < entities.length; i++) {
            const folder = entities[i]
            const folderFolderComp = folder.componentsByName[FOLDER_COMPONENT_NAME].state as IFolderComponentState
            const folderBodyComp = folder.componentsByName[BODY_COMPONENT_NAME].state as IBodyComponentState
            const goIdComp = folder.componentsByName[GO_COMPONENT_NAME].state as IGOComponentState
            const folderGO = inj.goManager.getGOById(goIdComp.id) as GOSprite
            const playerBodyComp = playerEnt.componentsByName[BODY_COMPONENT_NAME].state as IBodyComponentState

            if (!folderFolderComp.isOpened) {
                const plDist = new Vector2(
                    playerBodyComp.x,
                    playerBodyComp.y,
                ).distance(new Vector2(folderBodyComp.x, folderBodyComp.y))
                if (
                    plDist < 100
                ) {
                    if (!folderFolderComp.isTouched) {
                        folderGO.setFrame("objects/projects/folderClosedTouched.psd")
                        folderFolderComp.isTouched = true
                    }
                } else {
                    if (folderFolderComp.isTouched) {
                        folderGO.setFrame("objects/projects/folderClosed.psd")
                        folderFolderComp.isTouched = false
                    }
                }
                if (folderFolderComp.isTouched) {
                    if (inj.cursors.action.isDown) {
                        folderFolderComp.isOpened = true
                        folderGO.setFrame("objects/projects/folderOpened.psd")

                        const angleDeg = 360 / folderFolderComp.projectsDataIds.length

                        folderFolderComp.projectsDataIds.forEach((prId, index) => {
                            const prData = inj.projectsById[prId]
                            const projectGO = new Project(
                                inj.scene,
                                prData.name,
                                folderBodyComp.x,
                                folderBodyComp.y,
                            )
                            inj.projectsGOGroup.add(projectGO, true)
                            inj.goManager.addGO(projectGO)

                            const angleRad = angleDeg * (index + 1) * Math.PI / 180
                            const pushDistance = Math.random() * 200 + 800
                            projectGO.body.setVelocity(
                                Math.cos(angleRad) * pushDistance,
                                Math.sin(angleRad) * pushDistance,
                            )

                            entityManager.createEntity([
                                ProjectComponentFactory(
                                    prId,
                                ),
                                MovementComponentFactory(
                                    9999,
                                    0,
                                    0,
                                    0,
                                    projectGO.body.velocity.x,
                                    projectGO.body.velocity.y,
                                ),
                                PositionComponentFactory(
                                    projectGO.x,
                                    projectGO.y,
                                    projectGO.width,
                                    projectGO.height,
                                ),
                                BodyComponentFactory(
                                    projectGO.body.x,
                                    projectGO.body.y,
                                    projectGO.body.width,
                                    projectGO.body.height,
                                ),
                                DepthComponentComponentFactory(projectGO.depth),
                                GOComponentFactory(projectGO.id),
                            ])
                        })
                    }
                }
            }
        }

        return
    }
}

export default new PhaserOutputFolderSystem(PhaserOutputFolderSystemName)
