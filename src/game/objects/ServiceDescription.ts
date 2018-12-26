
export default class ServiceDescription {
    constructor(
        private scene: Phaser.Scene,
        x: number,
        y: number,
        depth: number,
        textTopOffset: number,
        private title: string,
        private subtitle: string,
        private desc: string,
    ) {
        const rectWidth = 190
        const rectHeight = 160
        const rectX = x - rectWidth / 2
        const rectY = y

        const rect = scene.add.rectangle(
            rectX,
            rectY,
            rectWidth,
            rectHeight,
            0x080808,
        )

        rect.setStrokeStyle(3, 0xd4d4d4)
        rect.setOrigin(0, 0)
        rect.setDepth(depth - 1)

        const btnTextY = y + textTopOffset

        const titleGO = scene.add.text(
            0,
            0,
            this.title,
            {
                fontFamily: "Connection",
                fontSize: 20,
                // stroke: "#000",
                // strokeThickness: 5,
                fill: "#fff",
            },
        )
        titleGO.setPosition(rectX + rect.width / 2 - titleGO.width / 2, btnTextY)
        titleGO.setDepth(depth + 1)

        const subtitleGO = scene.add.text(
            0,
            0,
            this.subtitle,
            {
                fontFamily: "Connection",
                fontSize: 15,
                fill: "#fff",
                align: "center",
            },
        )
        subtitleGO.setPosition(rectX + rect.width / 2 - subtitleGO.width / 2, titleGO.y + titleGO.height + 5)
        subtitleGO.setDepth(depth + 1)

        const descGO = scene.add.text(
            0,
            0,
            this.desc,
            {
                fontFamily: "Connection",
                fontSize: 13,
                fill: "#fff",
                align: "center",
            },
        )
        descGO.alpha = .5
        descGO.setPosition(rectX + rect.width / 2 - descGO.width / 2, subtitleGO.y + subtitleGO.height + 5)
        descGO.setDepth(depth + 1)
    }
}
