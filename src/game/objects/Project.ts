export class Project extends Phaser.GameObjects.Container {
    public body!: Phaser.Physics.Arcade.Body
    public id: string
    public logo: Phaser.GameObjects.Sprite

    constructor(scene: Phaser.Scene, name: string, x: number, y: number) {
        super(scene, x, y)

        this.id = "id" + (new Date()).getTime()

        this.logo = new Phaser.GameObjects.Sprite(
            scene,
            0,
            0,
            "mainatlas",
            `objects/projects/logo${name}.psd`,
        )

        this.add(this.logo)

        this.initPhysics(this.logo.width, this.logo.height / 3)

        this.createName(this.logo.x, this.logo.y + this.logo.height / 2, name)
    }

    public setFrame(name: string) {
        this.logo.setFrame(name)
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
