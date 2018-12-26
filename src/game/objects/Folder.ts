
export class Folder extends Phaser.GameObjects.Sprite {
    public body!: Phaser.Physics.Arcade.Body
    public id: string

    constructor(scene: Phaser.Scene, name: string, x: number, y: number) {
        super(scene, x, y, "mainatlas", "objects/projects/folderClosed.psd")

        this.id = "id" + (new Date()).getTime()
        this.initPhysics()
        this.createName(name)
    }

    private createName(name: string) {
        const titleGO = this.scene.add.text(
            0,
            0,
            name,
            {
                fontFamily: "Connection",
                fontSize: 18,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#fff",
            },
        )
        titleGO.setPosition(this.x - titleGO.width / 2, this.y + this.height / 2 + 10)
        titleGO.setDepth(this.body.y)
    }

    private initPhysics(): void {
        this.scene.physics.world.enable(this, Phaser.Physics.Arcade.STATIC_BODY)

        this.body.setOffset(0, this.body.height / 2)
        this.body.setSize(this.body.width, this.body.height / 2)
        this.setDepth(this.body.y)
    }
}