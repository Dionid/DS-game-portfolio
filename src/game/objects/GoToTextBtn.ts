
export class GoToTextBtn extends Phaser.GameObjects.Container {
    public id: string
    public btnText: Phaser.GameObjects.Text
    public rect: Phaser.GameObjects.Rectangle

    constructor(scene: Phaser.Scene, x: number, y: number, depth: number) {
        super(scene, x, y)

        this.id = "id" + (new Date()).getTime()

        const rectWidth = 170
        const rectHeight = 40

        this.rect = scene.add.rectangle(
            x,
            y,
            rectWidth,
            rectHeight,
            0x080808,
        )

        this.rect.setStrokeStyle(3, 0xd4d4d4)
        this.rect.setOrigin(0, 0)
        this.rect.setDepth(depth)

        this.rect.setInteractive({
            useHandCursor: true,
        })

        this.rect.on("pointerover", this.pointerOver)

        this.rect.on("pointerout", this.pointerOut)

        this.btnText = scene.add.text(
            x,
            y,
            "GO TO TEXT VERSION",
            {
                fontFamily: "Connection",
                fontSize: 14,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#fff",
            },
        )

        this.btnText.setInteractive({
            useHandCursor: true,
        })

        this.btnText.on("pointerover", this.pointerOver)

        this.btnText.on("pointerout", this.pointerOut)

        const link = "https://docs.google.com/document/d/" +
            "1oRlYkKEH-9g2wk6Aiiu_-K1tYsw7BHF3OeuCPhi_Aes/edit#heading=h.sgsvqiccdupn"

        this.btnText.setPadding(10, 10, 20, 10)
        this.btnText.setInteractive().on("pointerdown", () => {
            window.open(link, "_self")
        })
        this.btnText.setDepth(depth + 1)
    }

    public pointerOver = () => {
        this.rect.setStrokeStyle(3, 0xeb41ff)
        this.rect.setFillStyle(0xffffff)
        this.btnText.setFill("#000")
        this.btnText.setStroke("#fff", 5)
    }

    public pointerOut = () => {
        this.rect.setStrokeStyle(3, 0xd4d4d4)
        this.rect.setFillStyle(0x080808)
        this.btnText.setFill("#fff")
        this.btnText.setStroke("#000", 5)
    }
}
