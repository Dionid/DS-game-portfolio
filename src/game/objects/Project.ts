export class Project extends Phaser.GameObjects.Container {
    public body!: Phaser.Physics.Arcade.Body
    public id: string

    constructor(scene: Phaser.Scene, name: string, x: number, y: number) {
        super(scene, x, y)

        this.id = "id" + (new Date()).getTime()

        const logo = new Phaser.GameObjects.Sprite(
            scene,
            0,
            0,
            "mainatlas",
            `objects/projects/logo${name}.psd`,
        )

        this.add(logo)

        this.initPhysics(logo.width, logo.height / 3)

        this.createName(logo.x, logo.y + logo.height / 2, name)
    }

    private createName(x: number, y: number, name: string) {
        const titleGO = this.scene.add.text(
            0,
            0,
            name,
            {
                fontFamily: "Connection",
                fontSize: 16,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#fff",
            },
        )
        titleGO.setPosition(x - titleGO.width / 2,  y + 10)
        titleGO.setDepth(titleGO.y)

        this.add(titleGO)

        // this.scene.add.existing(titleGO)
    }

    private initPhysics(width: number, height: number): void {
        this.scene.physics.world.enable(this, Phaser.Physics.Arcade.DYNAMIC_BODY)

        // this.body.setCollideWorldBounds(true)

        // this.body.setMass(100)
        // this.body.setFriction(100, 100)
        this.body.setAllowDrag()
        this.body.setDrag(175, 175)
        // this.body.useDamping = true
        this.body.setMaxVelocity(200, 200)
        this.body.setOffset(-width / 2, height / 2)
        this.body.setSize(width, height)
        this.setDepth(this.body.y + this.body.height)
    }
}