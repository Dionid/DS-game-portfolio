
export class Chest extends Phaser.GameObjects.Sprite {
    public body!: Phaser.Physics.Arcade.Body
    public speed: number = 300

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "mainatlas", "objects/chests/chestDefault.psd")

        this.initPhysics()
    }

    private initPhysics(): void {
        this.scene.physics.world.enable(this, Phaser.Physics.Arcade.STATIC_BODY)

        this.body.setOffset(0, this.body.height / 2)
        this.body.setSize(this.body.width, this.body.height / 2)
        this.setDepth(this.body.y)
    }
}
