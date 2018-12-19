
export class Player extends Phaser.GameObjects.Sprite {
    public body!: Phaser.Physics.Arcade.Body
    public speed: number = 300

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "mainatlas", "player/player.psd")

        this.initPhysics()
    }

    private initPhysics(): void {
        this.scene.physics.world.enable(this)

        this.setDepth(3)
        this.body.setOffset(0, this.body.height - 10)
        this.body.setSize(this.body.width, 10, false)
    }
}
