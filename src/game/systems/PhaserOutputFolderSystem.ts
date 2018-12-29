import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {FOLDER_COMPONENT_NAME, IFolderComponentState} from "game/components/FolderComponent"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"
import {GO_COMPONENT_NAME, IGOComponentState} from "game/components/GOComponent"
import {BODY_COMPONENT_NAME, IBodyComponentState} from "game/components/BodyComponent"
import {GOSprite} from "game/GOManager"
import {Loot} from "game/objects/Loot"
import ServiceDescription from "game/objects/ServiceDescription"
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
                    }
                }
            }
        }

        return
    }
}

export default new PhaserOutputFolderSystem(PhaserOutputFolderSystemName)
