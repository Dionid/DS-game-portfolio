import {GOSprite} from "game/GOManager"

class Player extends GOSprite {
    public body!: Phaser.Physics.Arcade.Body
    // public speed: number = 375
    public speed: number = 250

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "mainatlas", "player/player.psd")

        // this.id = "id" + (new Date()).getTime()
        this.setScale(0.85, 0.85)

        this.initPhysics()
    }

    private initPhysics(): void {
        this.scene.physics.world.enable(this)

        this.setDepth(3)
        this.body.setOffset(0, this.body.height - 10)
        this.body.setSize(this.body.width, 10, false)
    }

    public setLeftMovementPose() {
        this.setFrame("player/player.psd")
        this.flipX = true
    }

    public setRightMovementPose() {
        this.setFrame("player/player.psd")
        this.flipX = false
    }

    public setDownMovementPose() {
        this.setFrame("player/playerDown.psd")
    }
}

// const Player = GODecorator(PlayerCl)

export default Player
