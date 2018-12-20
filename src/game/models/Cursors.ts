
export default class Cursors {
    public up: Phaser.Input.Keyboard.Key = new Phaser.Input.Keyboard.Key(Phaser.Input.Keyboard.KeyCodes.W)
    public down: Phaser.Input.Keyboard.Key = new Phaser.Input.Keyboard.Key(Phaser.Input.Keyboard.KeyCodes.S)
    public left: Phaser.Input.Keyboard.Key = new Phaser.Input.Keyboard.Key(Phaser.Input.Keyboard.KeyCodes.A)
    public right: Phaser.Input.Keyboard.Key = new Phaser.Input.Keyboard.Key(Phaser.Input.Keyboard.KeyCodes.D)
    public space: Phaser.Input.Keyboard.Key = new Phaser.Input.Keyboard.Key(Phaser.Input.Keyboard.KeyCodes.SPACE)
    public shift: Phaser.Input.Keyboard.Key = new Phaser.Input.Keyboard.Key(Phaser.Input.Keyboard.KeyCodes.SHIFT)

    constructor(scene: Phaser.Scene) {
        this.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.shift = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
    }
}
