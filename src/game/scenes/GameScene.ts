import {Player} from "game/objects/Player"
import {Chest} from "game/objects/Chest"

class Room {
    public numberOfScreens: number = 0
    public offsetY: number = 0
}

export class GameScene extends Phaser.Scene {
    private helloText?: Phaser.GameObjects.Text = undefined
    private fullstackText?: Phaser.GameObjects.Text = undefined
    private freelancerText?: Phaser.GameObjects.Text = undefined
    private btnText?: Phaser.GameObjects.Text = undefined
    private cursors?: Phaser.Input.Keyboard.CursorKeys = undefined
    private player!: Player

    // UTILS
    private gameHeight: number = 0
    private gameWidth: number = 0
    private spawnPosition: {x: number, y: number} = {x: 0, y: 0}

    // Rooms
    private rooms: { [key: string]: Room } = {
        firstRoom: {
            numberOfScreens: 1,
            offsetY: 0,
        },
        secondRoom: {
            numberOfScreens: 1,
            offsetY: 0,
        },
        thirdRoom: {
            numberOfScreens: 3,
            offsetY: 0,
        },
        fourthRoom: {
            numberOfScreens: 1,
            offsetY: 0,
        },
    }
    private roomScreensTotalNumber: number = 0

    constructor() {
        super({
            key: "GameScene",
        })
    }

    // private secondPageCamera = false
    //
    // private setSecondPageCamera() {
    //     this.secondPageCamera = true
    //     this.cameras.main.setScroll(0, this.sys.canvas.height)
    // }

    private calculateRooms() {
        this.gameWidth = this.sys.canvas.width
        Object.keys(this.rooms).forEach((roomName: string) => {
            const room = this.rooms[roomName]
            room.offsetY = this.roomScreensTotalNumber * this.sys.canvas.height
            this.roomScreensTotalNumber += room.numberOfScreens
            this.gameHeight += room.numberOfScreens * this.sys.canvas.height
        })
        this.spawnPosition = {
            x: this.gameWidth - 100,
            y: this.rooms.secondRoom.offsetY + this.sys.canvas.height / 2,
        }
    }

    private createBackground() {
        const background = this.add.tileSprite(0, 0, this.sys.canvas.width, this.gameHeight, "mainatlas", "bg/bg.psd")
        background.setOrigin(0, 0)
    }

    private createSecondRoomTriggerArea() {
        const triggerWidth = this.sys.canvas.width - 20
        const triggerHeight = 1
        const triggerX = 0
        const triggerY = this.sys.canvas.height - 20

        const trigger = this.add.rectangle(
            triggerX,
            triggerY,
            triggerWidth,
            triggerHeight,
            0x080808,
        )

        trigger.setStrokeStyle(3, 0xd4d4d4)
        trigger.setOrigin(0, 0)

        this.physics.world.enable(trigger, Phaser.Physics.Arcade.STATIC_BODY)
        this.physics.add.overlap(this.player, trigger, () => {
            // if (!this.secondPageCamera) {
            //     console.log("Triggered")
            //     this.setSecondPageCamera()
            // }
        }, undefined, this)
    }

    private createPlayer() {
        this.player = new Player(
            this,
            this.spawnPosition.x,
            this.spawnPosition.y,
            "mainatlas",
            "player/player.psd",
        )
        this.add.existing(this.player)
    }

    private createInputs() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    private leftTextStartOffsetX: number = 100
    private firstScreenOffsetY: number = 0

    private createFirstRoom() {
        this.firstScreenOffsetY = 0

        const helloTextY = this.firstScreenOffsetY + this.sys.canvas.height / 2 - 150

        this.helloText = this.add.text(
            this.leftTextStartOffsetX,
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
            this.leftTextStartOffsetX,
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
            this.leftTextStartOffsetX,
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
        const rectX = this.leftTextStartOffsetX
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

        this.physics.world.enable(rect, Phaser.Physics.Arcade.STATIC_BODY)

        if (this.player) {
            this.physics.add.collider(this.player, rect)
        }

        const btnTextY = freelancerTextY + this.freelancerText.height + 20

        this.btnText = this.add.text(
            this.leftTextStartOffsetX,
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

    private createSecondRoom() {
        const secondScreenOffsetY = this.rooms.secondRoom.offsetY

        const titleY = secondScreenOffsetY + 50

        const title = this.add.text(
            this.leftTextStartOffsetX,
            titleY,
            "Services",
            {
                fontFamily: "Connection",
                fontSize: 60,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#fff",
            },
        )

        const subtitleText = this.add.text(
            this.leftTextStartOffsetX,
            titleY + title.height,
            "I can offer you",
            {
                fontFamily: "Connection",
                fontSize: 25,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#bdbdbd",
            },
        )

        // const chests = this.add.group()

        const firstChest = new Chest(this, this.gameWidth - 150, secondScreenOffsetY + 150)
        this.add.existing(firstChest)

        this.physics.add.collider(this.player, firstChest)
    }

    private createMainCamera() {
        this.cameras.main.setBounds(0, 0, this.sys.canvas.width, this.gameHeight)
        // make the camera follow the player
        this.cameras.main.startFollow(this.player, false, 0.05, 0.05)
    }

    public create(): void {
        // Utils
        this.calculateRooms()

        this.createBackground()

        // Inputs
        this.createInputs()

        // Player
        this.createPlayer()

        // First room
        this.createFirstRoom()

        // Second room
        this.createSecondRoom()

        // Third room

        // Fourth room

        // Main camera
        this.createMainCamera()
    }

    public movementSystem() {

    }

    public update(): void {
        if (this.player) {
            this.player.body.setVelocity(0)

            if (this.cursors && this.cursors.left && this.cursors.right && this.cursors.up && this.cursors.down) {
                if (this.cursors.left.isDown) {
                    this.player.flipX = true
                }
                if (this.cursors.right.isDown) {
                    this.player.flipX = false
                }
                if (this.cursors.left.isDown && !this.cursors.right.isDown) {
                    if (this.player.x - this.player.width / 2 > 0) {
                        this.player.body.setVelocityX(-this.player.speed)
                    }
                }
                if (this.cursors.right.isDown && !this.cursors.left.isDown) {
                    if (this.player.x + this.player.width / 2 < this.gameWidth) {
                        this.player.body.setVelocityX(this.player.speed)
                    }
                }
                if (this.cursors.up.isDown && !this.cursors.down.isDown) {
                    if (this.player.y - this.player.height / 2 > 0) {
                        this.player.body.setVelocityY(-this.player.speed)
                    }
                }
                if (this.cursors.down.isDown && !this.cursors.up.isDown) {
                    if (this.player.y + this.player.height / 2 < this.gameHeight) {
                        this.player.body.setVelocityY(this.player.speed)
                    }
                }
            }
        }
    }
}
