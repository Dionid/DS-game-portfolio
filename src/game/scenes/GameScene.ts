
export class GameScene extends Phaser.Scene {

    private helloText?: Phaser.GameObjects.Text = undefined
    private fullstackText?: Phaser.GameObjects.Text = undefined
    private freelancerText?: Phaser.GameObjects.Text = undefined

    constructor() {
        super({
            key: "GameScene",
        })
    }

    public create(): void {
        console.log("CREATED")

        const firstScreenOffsetY = 0;

        const helloTextX = 100
        const helloTextY = firstScreenOffsetY + this.sys.canvas.height / 2 - 100

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
    }
}
