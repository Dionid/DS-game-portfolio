import Player from "game/objects/Player"

export default class RoomTrigger {
    constructor(
        scene: Phaser.Scene,
        activeFirstRoom: () => void,
        activeSecRoom: () => void,
        playerGO: Player,
        width: number,
        height: number,
        x: number,
        y: number,
        debug: boolean = false,
    ) {
        let triggerActive = false

        const triggerWidth = width
        const triggerHeight = height
        const triggerX = x
        const triggerY = y

        const trigger = scene.add.rectangle(
            triggerX,
            triggerY,
            triggerWidth,
            triggerHeight,
            0x080808,
            debug ? 1 : 0,
        )

        if (debug) {
            trigger.setStrokeStyle(3, 0xd4d4d4)
        }
        trigger.setOrigin(0, 0)

        let triggerActiveFromTop = false
        let triggerActiveFromBottom = false
        const triggerBottomY = trigger.y + triggerHeight
        let timeoutId: NodeJS.Timeout

        const timeoutFn = () => {
            // console.log("CLEAR")
            if (triggerActiveFromTop) {
                if (playerGO.body.y > triggerBottomY) {
                    activeSecRoom()
                }
            }

            if (triggerActiveFromBottom) {
                if (playerGO.body.y < triggerY) {
                    activeFirstRoom()
                }
            }
            triggerActiveFromBottom = false
            triggerActiveFromTop = false
            triggerActive = false
        }

        scene.physics.world.enable(trigger, Phaser.Physics.Arcade.STATIC_BODY)
        scene.physics.add.overlap(playerGO, trigger, () => {
            if (!triggerActive) {
                if (Math.abs(triggerY - playerGO.body.y) < Math.abs(triggerBottomY - playerGO.body.y)) {
                    // console.log("TOP")
                    triggerActiveFromTop = true
                    triggerActive = true
                } else {
                    // console.log("BOTTOM")
                    triggerActiveFromBottom = true
                    triggerActive = true
                }
            }
            clearTimeout(timeoutId)
            timeoutId = setTimeout(timeoutFn, 100, this)
        })
    }
}
