
export class Chest extends Phaser.GameObjects.Sprite {
    public body!: Phaser.Physics.Arcade.Body
    public id: string

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "mainatlas", "objects/chests/chestDefault.psd")

        this.id = "id" + (new Date()).getTime()
        this.initPhysics()
    }

    private initPhysics(): void {
        this.scene.physics.world.enable(this, Phaser.Physics.Arcade.STATIC_BODY)

        // this.setOrigin(0, 0)
        // this.body.setOffset(-this.body.width / 2, 0)
        this.body.setOffset(0, this.body.height / 2)
        this.body.setSize(this.body.width, this.body.height / 2)
        this.setDepth(this.body.y)
    }
}
