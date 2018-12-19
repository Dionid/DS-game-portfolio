
export class Player extends Phaser.GameObjects.Sprite {
    public body!: Phaser.Physics.Arcade.Body
    public speed: number = 300

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | integer) {
        super(scene, x, y, texture, frame)

        this.initPhysics()
    }

    private initPhysics(): void {
        this.scene.physics.world.enable(this)
    }
}
