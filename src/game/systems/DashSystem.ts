import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"
import {DASH_COMPONENT_NAME, IDashComponentState} from "game/components/DashComponent"
import {IMovementComponentState, MOVEMENT_COMPONENT_NAME} from "game/components/MovementComponent"
import {BODY_COMPONENT_NAME, IBodyComponentState} from "game/components/BodyComponent"
import {GO_COMPONENT_NAME} from "game/components/GOComponent"
import {GOSprite} from "game/GOManager"
const Vector2 = Phaser.Math.Vector2

const DashSystemName = "DashSystem"

class DashSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    private line!: Phaser.GameObjects.Graphics
    private playerShadow!: Phaser.GameObjects.Sprite

    public init(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        injectable: ISystemPhaserInjectable,
    ): undefined {
        this.line = injectable.scene.add.graphics({
            x: 0,
            y: 0,
            lineStyle: {
                width: 2,
                color: 0xffffff,
                alpha: 1,
            },
            fillStyle: {
                color: 0xffffff,
                alpha: 1,
            },
        })
        this.playerShadow = new Phaser.GameObjects.Sprite(
            injectable.scene,
            0,
            0,
            "mainatlas",
            "player/player.psd",
        )
        this.playerShadow.setPosition(this.playerShadow.x * -2, this.playerShadow.height * -2)
        this.playerShadow.setScale(0.85, 0.85)
        this.playerShadow.setAlpha(0.5)
        injectable.scene.add.existing(this.playerShadow)
        return
    }

    private zoomValue = 1

    public update(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {

        const entities = entityManager.queryByComponentsName([
            DASH_COMPONENT_NAME,
            MOVEMENT_COMPONENT_NAME,
        ])

        for (let i = 0; i < entities.length; i++) {
            const ent = entities[i]
            const dashComp = ent.componentsByName[DASH_COMPONENT_NAME].state as IDashComponentState
            const bodyComp = ent.componentsByName[BODY_COMPONENT_NAME].state as IBodyComponentState
            const movComp = ent.componentsByName[MOVEMENT_COMPONENT_NAME].state as IMovementComponentState
            const go = inj.goManager.getGOById(ent.componentsByName[GO_COMPONENT_NAME].state.id) as GOSprite

            if (dashComp.dashInProcess) {
                inj.timeSpeedScale.value = Math.min(1, inj.timeSpeedScale.value * 1.3)
                movComp.active = false
                const destVector = new Vector2(
                    dashComp.dashDestX - dashComp.dashStartingPosX,
                    dashComp.dashDestY - dashComp.dashStartingPosY,
                )
                    .scale(((dashComp.dashDistancePassed / dashComp.dashDistanceCur) + 0.6) * dashComp.dashSpeed)

                movComp.curVelocityX = destVector.x
                movComp.curVelocityY = destVector.y

                // Formula from distanceFromVelocity * timePassed
                dashComp.dashDistancePassed +=
                    Math.sqrt(Math.pow(movComp.curVelocityX, 2) + Math.pow(movComp.curVelocityY, 2))
                    *
                    (inj.deltaTimeScaled / 1000)

                inj.scene.cameras.main.setZoom(inj.scene.cameras.main.zoom * 0.999)

                if (
                    dashComp.dashDistancePassed > dashComp.dashDistanceCur
                ) {
                    movComp.curVelocityX = 0
                    movComp.curVelocityY = 0
                    inj.timeSpeedScale.value = 1
                    dashComp.dashInProcess = false
                    inj.scene.cameras.main.setZoom(1)
                }
            } else {
                if (inj.scene.input.mousePointer.isDown) {
                    if (dashComp.dashInProcess) {
                        return
                    }

                    inj.scene.cameras.main.setZoom(Math.min(1.2, inj.scene.cameras.main.zoom * 1.001))
                    inj.timeSpeedScale.value = Math.max(0.2, inj.timeSpeedScale.value * .975)

                    dashComp.dashAiming = true
                    this.line.clear()
                    const bodyXCPos = bodyComp.x + bodyComp.width / 2
                    const bodyYCPos = bodyComp.y + bodyComp.height / 2
                    this.line.moveTo(bodyXCPos, bodyYCPos)
                    dashComp.dashDistanceCur = Math.min(
                        dashComp.dashDistanceMax,
                        new Vector2(
                            inj.scene.input.mousePointer.position.x + inj.scene.cameras.main.scrollX,
                            inj.scene.input.mousePointer.position.y + inj.scene.cameras.main.scrollY,
                        ).distance(
                            new Vector2(
                                bodyXCPos,
                                bodyYCPos,
                            ),
                        ),
                    )
                    const camVector = new Vector2(
                        inj.scene.input.mousePointer.position.x + inj.scene.cameras.main.scrollX - bodyXCPos,
                        inj.scene.input.mousePointer.position.y + inj.scene.cameras.main.scrollY - bodyYCPos,
                    ).normalize().scale(dashComp.dashDistanceCur)
                    this.line.lineTo(
                        bodyXCPos + camVector.x,
                        bodyYCPos + camVector.y,
                    )
                    this.line.strokePath()
                    inj.scene.add.existing(this.line)
                    this.playerShadow.setPosition(
                        bodyXCPos + camVector.x,
                        bodyYCPos + camVector.y - this.playerShadow.height / 2 + 10,
                    )
                } else {
                    this.line.clear()
                    if (dashComp.dashAiming) {
                        this.playerShadow.setPosition(
                            this.playerShadow.x * -2,
                            this.playerShadow.height * -2,
                        )
                        const bodyXCPos = bodyComp.x + bodyComp.width / 2
                        const bodyYCPos = bodyComp.y + bodyComp.height / 2
                        dashComp.dashAiming = false
                        dashComp.dashInProcess = true
                        dashComp.dashDistancePassed = 0
                        dashComp.dashStartingPosX = bodyComp.x
                        dashComp.dashStartingPosY = bodyComp.y
                        const camVector = new Vector2(
                            inj.scene.input.mousePointer.position.x + inj.scene.cameras.main.scrollX - bodyXCPos,
                            inj.scene.input.mousePointer.position.y + inj.scene.cameras.main.scrollY - bodyYCPos,
                        )
                            .normalize()
                            .scale(dashComp.dashDistanceCur)
                        dashComp.dashDestX = camVector.x + bodyXCPos
                        dashComp.dashDestY = camVector.y + bodyYCPos
                    } else {
                        movComp.active = true
                    }
                }
            }
        }

        return
    }
}

export default new DashSystem(DashSystemName)
