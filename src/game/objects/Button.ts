
export default class Button extends Phaser.GameObjects.Container {
    public id: string
    public btnText: Phaser.GameObjects.Text
    public rect: Phaser.GameObjects.Rectangle
    private btnClicked: boolean = false

    constructor(
        scene: Phaser.Scene,
        text: string,
        cb: () => void,
        x: number,
        y: number,
        depth: number,
        center: boolean = false,
    ) {
        super(scene, x, y)

        this.id = "id" + (new Date()).getTime()

        const rectWidth = 170
        const rectHeight = 40
        if (center) {
            x = x - rectWidth / 2
        }

        this.btnText = scene.add.text(
            x + 13,
            y + 10,
            text,
            {
                fontFamily: "Connection",
                fontSize: 14,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#fff",
            },
        )

        this.rect = scene.add.rectangle(
            x,
            y,
            this.btnText.width + 30,
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

        this.rect.on("pointerdown", () => {
            this.btnClicked = true
        })

        this.btnText.setInteractive({
            useHandCursor: true,
        })

        this.btnText.on("pointerover", this.pointerOver)

        this.btnText.on("pointerout", this.pointerOut)

        this.btnText.on("pointerdown", () => {
            this.btnClicked = true
        })

        scene.input.addUpCallback(() => {
            if (this.btnClicked) {
                cb()
                this.btnClicked = false
            }
        }, false)

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
