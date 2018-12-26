
export class Loot extends Phaser.GameObjects.Sprite {
    public id: string

    constructor(scene: Phaser.Scene, x: number, y: number, name: string, depth: number) {
        super(scene, x, y, "mainatlas", name)

        this.id = "id" + (new Date()).getTime()
        this.setDepth(depth)
        this.setPosition(this.x, this.y - this.height / 2)
    }
}
