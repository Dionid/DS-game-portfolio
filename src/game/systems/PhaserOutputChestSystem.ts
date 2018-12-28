import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {CHEST_COMPONENT_NAME, IChestComponentState} from "game/components/ChestComponent"
import {Loot} from "game/objects/Loot"
import ServiceDescription from "game/objects/ServiceDescription"
import {PLAYER_COMPONENT_NAME} from "game/components/PlayerComponent"
import {BODY_COMPONENT_NAME, IBodyComponentState} from "game/components/BodyComponent"
import {GO_COMPONENT_NAME, IGOComponentState} from "game/components/GOComponent"
import {GOSprite} from "game/GOManager"
import {DEPTH_COMPONENT_NAME, IDepthComponentComponentState} from "game/components/DepthComponent"
const Vector2 = Phaser.Math.Vector2

const PhaserOutputChestSystemName = "PhaserOutputChestSystem"

class PhaserOutputChestSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    private chestsOpened = 0

    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {
        if (this.chestsOpened >= 3) {
            return
        }

        const chests = entityManager.queryByComponentsName([
            CHEST_COMPONENT_NAME,
        ])

        const playerEnt = entityManager.queryByComponentsName([
            PLAYER_COMPONENT_NAME,
        ])[0]

        for (let i = 0; i < chests.length; i++) {
            const chest = chests[i]
            const chestChestComp = chest.componentsByName[CHEST_COMPONENT_NAME].state as IChestComponentState
            const chestBodyComp = chest.componentsByName[BODY_COMPONENT_NAME].state as IBodyComponentState
            const chestDepthComp = chest.componentsByName[DEPTH_COMPONENT_NAME].state as IDepthComponentComponentState
            const goIdComp = chest.componentsByName[GO_COMPONENT_NAME].state as IGOComponentState
            const playerBodyComp = playerEnt.componentsByName[BODY_COMPONENT_NAME].state as IBodyComponentState
            const chestGO = inj.goManager.getGOById(goIdComp.id) as GOSprite

            if (!chestChestComp.isOpened) {
                const plDist = new Vector2(
                    playerBodyComp.x,
                    playerBodyComp.y,
                ).distance(new Vector2(chestBodyComp.x, chestBodyComp.y))
                if (
                    plDist < 100
                ) {
                    if (!chestChestComp.isTouched) {
                        chestGO.setFrame("objects/chests/chestTouched.psd")
                        chestChestComp.isTouched = true
                    }
                } else {
                    if (chestChestComp.isTouched) {
                        chestGO.setFrame("objects/chests/chestDefault.psd")
                        chestChestComp.isTouched = false
                    }
                }
                if (chestChestComp.isTouched) {
                    if (inj.cursors.action.isDown) {
                        chestChestComp.isOpened = true
                        chestGO.setFrame("objects/chests/chestOpened.psd")
                        const lootData = chestChestComp.loot
                        if (lootData) {
                            const loot = new Loot(
                                inj.scene,
                                chestBodyComp.x + chestBodyComp.width / 2,
                                chestBodyComp.y - chestBodyComp.height,
                                lootData.img,
                                chestDepthComp.depth,
                            )
                            inj.scene.add.existing(loot)
                            const sd = new ServiceDescription(
                                inj.scene,
                                chestBodyComp.x + chestBodyComp.width / 2,
                                chestBodyComp.y,
                                chestDepthComp.depth - 1,
                                35,
                                lootData.title,
                                lootData.subtitle,
                                lootData.desc,
                            )
                        }
                        this.chestsOpened++
                    }
                }
            }
        }

        return
    }
}

export default new PhaserOutputChestSystem(PhaserOutputChestSystemName)
