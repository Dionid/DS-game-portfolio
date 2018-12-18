const STATIC_BODY = Phaser.Physics.Arcade.STATIC_BODY

export class GameScene extends Phaser.Scene {

    private helloText?: Phaser.GameObjects.Text = undefined
    private fullstackText?: Phaser.GameObjects.Text = undefined
    private freelancerText?: Phaser.GameObjects.Text = undefined
    private btnText?: Phaser.GameObjects.Text = undefined
    private cursors?: Phaser.Input.Keyboard.CursorKeys = undefined
    private player?: Phaser.GameObjects.Sprite = undefined

    constructor() {
        super({
            key: "GameScene",
        })
    }

    public create(): void {
        // const background = this.add.tileSprite(0, 0, this.game, this.sys.canvas.height, "background")
        // background.setOrigin(0, 0)

        this.player = this.add.sprite(this.sys.canvas.width - 100, this.sys.canvas.height / 2, "block")
        this.physics.world.enable(this.player)
        this.cursors = this.input.keyboard.createCursorKeys()

        const firstScreenOffsetY = 0

        const helloTextX = 100
        const helloTextY = firstScreenOffsetY + this.sys.canvas.height / 2 - 150

        this.helloText = this.add.text(
            helloTextX,
            helloTextY,
            "Hi, my name is\nDavid Shekunts",
            {
                fontFamily: "Connection",
                fontSize: 70,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#fff",
            },
        )

        const fullstackTextY = helloTextY + this.helloText.height

        this.fullstackText = this.add.text(
            helloTextX,
            fullstackTextY,
            "I’m Fullstack Web Developer",
            {
                fontFamily: "Connection",
                fontSize: 26,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#fff",
            },
        )

        const freelancerTextY = fullstackTextY + this.fullstackText.height

        this.freelancerText = this.add.text(
            helloTextX,
            freelancerTextY,
            "(Freelancer)",
            {
                fontFamily: "Connection",
                fontSize: 17,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#fff",
            },
        )

        const rectWidth = 170
        const rectHeight = 40
        const rectX = helloTextX
        const rectY = freelancerTextY + this.freelancerText.height + 20

        const rect = this.add.rectangle(
            rectX,
            rectY,
            rectWidth,
            rectHeight,
            0x080808,
        )

        rect.setStrokeStyle(3, 0xd4d4d4)
        rect.setOrigin(0, 0)

        this.physics.world.enable(rect, STATIC_BODY)
        this.physics.add.collider(this.player, rect)

        const btnTextY = freelancerTextY + this.freelancerText.height + 20

        this.btnText = this.add.text(
            helloTextX,
            btnTextY,
            "GO TO TEXT VERSION",
            {
                fontFamily: "Connection",
                fontSize: 14,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#fff",
            },
        )

        const link = "https://docs.google.com/document/d/" +
            "1oRlYkKEH-9g2wk6Aiiu_-K1tYsw7BHF3OeuCPhi_Aes/edit#heading=h.sgsvqiccdupn"

        this.btnText.setPadding(10, 10, 20, 10)
        this.btnText.setInteractive().on("pointerdown", () => {
            window.open(link, "_self")
        })
    }

    public update(): void {
        if (this.player) {
            this.player.body.setVelocity(0);

            if (this.cursors && this.cursors.left && this.cursors.right && this.cursors.up && this.cursors.down) {
                if (this.cursors.left.isDown && !this.cursors.right.isDown) {
                    this.player.body.setVelocityX(-150)
                }
                if (this.cursors.right.isDown && !this.cursors.left.isDown) {
                    this.player.body.setVelocityX(150)
                }
                if (this.cursors.up.isDown && !this.cursors.down.isDown) {
                    this.player.body.setVelocityY(-150)
                }
                if (this.cursors.down.isDown && !this.cursors.up.isDown) {
                    this.player.body.setVelocityY(150)
                }
            }
        }
    }
}
