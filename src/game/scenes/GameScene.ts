import {Player} from "game/objects/Player"
import {Chest} from "game/objects/Chest"
import Room from "game/models/Room"
import Cursors from "game/models/Cursors"

export class GameScene extends Phaser.Scene {
    private helloText?: Phaser.GameObjects.Text = undefined
    private fullstackText?: Phaser.GameObjects.Text = undefined
    private freelancerText?: Phaser.GameObjects.Text = undefined
    private btnText?: Phaser.GameObjects.Text = undefined
    private cursors!: Cursors
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
            y: this.rooms.firstRoom.offsetY + this.sys.canvas.height / 2,
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
        )
        this.add.existing(this.player)
        // this.player.body.setCollideWorldBounds(true)
    }

    private createInputs() {
        this.cursors = new Cursors(this)
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

        this.helloText.setDepth(this.gameHeight)

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

        this.fullstackText.setDepth(this.gameHeight)

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

        this.freelancerText.setDepth(this.gameHeight)

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
        rect.setDepth(this.gameHeight)

        // this.physics.world.enable(rect, Phaser.Physics.Arcade.STATIC_BODY)
        // if (this.player) {
        //     this.physics.add.collider(this.player, rect)
        // }

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
        this.btnText.setDepth(this.gameHeight + 1)
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

        title.setDepth(this.gameHeight)

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

        subtitleText.setDepth(this.gameHeight)

        // const chests = this.add.group()

        const firstChest = new Chest(this, this.gameWidth - 200, secondScreenOffsetY + 250)
        this.add.existing(firstChest)

        this.physics.add.collider(this.player, firstChest)
    }

    private createMainCamera() {
        this.cameras.main.setBounds(0, 0, this.sys.canvas.width, this.gameHeight)
        // make the camera follow the player
        this.cameras.main.startFollow(this.player, false, 0.2, 0.2)

        // this.cameras.main.followOffset.y = 200
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

    public spaceOnHold = false
    public dashInProcess = false
    public dashInProcessTimestamp = 0
    public dashInProcessTimelong = 100
    public dashEndedTimestamp = 0
    private dashRestTimelong = 200
    private dashSpeed = 3600
    public dashMoveVectorNormalized!: Phaser.Math.Vector2

    public cameraMousePointerFollorSystem() {
        const halsOfScreenY = this.sys.canvas.height / 2
        this.cameras.main.followOffset.y = (this.input.mousePointer.position.y - halsOfScreenY) * -1
        const minus = this.cameras.main.followOffset.y < 0
        this.cameras.main.followOffset.y = Phaser.Math.Linear(
            0,
            100,
            Math.abs(this.cameras.main.followOffset.y / halsOfScreenY),
        )
        if (minus) {
            this.cameras.main.followOffset.y *=  -1
        }
    }

    private playerDashSystem(time: number, delta: number) {
        if (this.dashInProcess) {
            if (time > this.dashInProcessTimestamp + this.dashInProcessTimelong) {
                console.log("dashEndedTimestamp")
                this.dashInProcess = false
                this.dashEndedTimestamp = time
            }
        } else {
            // console.log()
            if (
                !this.spaceOnHold
                && this.cursors.space.isDown
                && time > this.dashEndedTimestamp + this.dashRestTimelong
            ) {
                const mousePosVector = this.cameras.main.getWorldPoint(
                    this.input.mousePointer.position.x,
                    this.input.mousePointer.position.y,
                )
                this.dashMoveVectorNormalized = mousePosVector.subtract(this.player.body.position).normalize()
                console.log(this.dashMoveVectorNormalized)
                this.dashInProcess = true
                this.dashInProcessTimestamp = time
            }
        }
    }

    private playerMovesLeft = false
    private playerMovesRight = false
    private playerMovesUp = false
    private playerMovesDown = false
    private playerMovesVert = false
    private playerMovesHor = false

    public playerMovementSystem(time: number, delta: number) {
        let playerWasInMove = !!this.player.body.velocity

        this.player.body.setVelocity(0)

        if (this.dashInProcess) {
            const accelerationOverTime = (time - this.dashInProcessTimestamp) / this.dashInProcessTimelong + 0.3
            this.player.body.setVelocity(
                this.dashMoveVectorNormalized.x * this.dashSpeed * accelerationOverTime,
                this.dashMoveVectorNormalized.y * this.dashSpeed * accelerationOverTime,
            )
        } else {
            const playerSpeed = this.player.speed * (delta * 60 / 1000)

            const mousePosVector = this.cameras.main.getWorldPoint(
                this.input.mousePointer.position.x,
                this.input.mousePointer.position.y,
            )
            // const moveVector = mousePosVector.subtract(this.player.body.position).normalize()
            //
            // console.log(moveVector)
            //
            // if ((moveVector.x > 0.5 || moveVector.x < -0.5) && (moveVector.y < 0.5 || moveVector.y > -0.5)) {
            //     this.player.body.setVelocity(
            //         moveVector.x * playerSpeed,
            //         moveVector.y * playerSpeed,
            //     )
            // }

            console.log(
                this.player.body.position
                    .add(new Phaser.Math.Vector2(this.player.body.width / 2, this.player.body.height / 2))
                    .distance(mousePosVector),
            )

            if (
                (!playerWasInMove && this.player.body.position.distance(mousePosVector) > 150)
                ||
                (playerWasInMove && this.player.body.position.distance(mousePosVector) > 100)
            ) {
                this.physics.moveTo(this.player, mousePosVector.x, mousePosVector.y, this.player.speed)
            }

            // if (this.cursors.left.isDown && !this.cursors.right.isDown) {
            //     this.player.body.setVelocityX(-playerSpeed)
            // }
            // if (this.cursors.right.isDown && !this.cursors.left.isDown) {
            //     this.player.body.setVelocityX(playerSpeed)
            // }
            // if (this.cursors.up.isDown && !this.cursors.down.isDown) {
            //     this.player.body.setVelocityY(-playerSpeed)
            // }
            // if (this.cursors.down.isDown && !this.cursors.up.isDown) {
            //     this.player.body.setVelocityY(playerSpeed)
            // }
            // if (this.playerMovesVert && this.playerMovesHor) {
            //     this.player.body.velocity.x = this.player.body.velocity.x * 0.8
            //     this.player.body.velocity.y = this.player.body.velocity.y * 0.8
            // }
        }
    }

    private playerMovesDirectionSystem() {
        this.playerMovesLeft = false
        this.playerMovesRight = false
        this.playerMovesUp = false
        this.playerMovesDown = false
        this.playerMovesHor = false
        this.playerMovesVert = false

        if (this.player.body.velocity.x > 0) {
            this.playerMovesRight = true
            this.playerMovesHor = true
        } else if (this.player.body.velocity.x < 0) {
            this.playerMovesLeft = true
            this.playerMovesHor = true
        }

        if (this.player.body.velocity.y < 0) {
            this.playerMovesUp = true
            this.playerMovesVert = true
        } else if (this.player.body.velocity.y > 0) {
            this.playerMovesDown = true
            this.playerMovesVert = true
        }
    }

    private playerAnimationSystem(time: number, delta: number) {
        if (this.playerMovesLeft) {
            this.player.flipX = true
        }
        if (this.playerMovesRight) {
            this.player.flipX = false
        }
    }

    private playerBorderCollisionSystem() {
        if (
            this.player.x + this.player.width / 2 >= this.gameWidth && this.playerMovesRight
            ||
            this.player.x - this.player.width / 2 <= 0 && this.playerMovesLeft
        ) {
            this.player.body.velocity.x = 0
        }

        if (
            this.player.y - this.player.height / 2 <= 0 && this.playerMovesUp
            ||
            this.player.y + this.player.height / 2 > this.gameHeight && this.playerMovesDown
        ) {
            this.player.body.velocity.y = 0
        }
    }

    private playerDepthSystem() {
        this.player.setDepth(this.player.body.y)
    }

    private playerSpaceHoldSystem() {
        this.spaceOnHold = this.cursors.space.isDown
    }

    public update(time: number, delta: number): void {

        // this.cameraMousePointerFollorSystem()

        // Then we add Dash if it is needed
        this.playerDashSystem(time, delta)
        // First of all we move Player
        this.playerMovementSystem(time, delta)
        // After all Moves we determining Player Direction
        this.playerMovesDirectionSystem()
        // After Moves and Direction we adding animation
        this.playerAnimationSystem(time, delta)
        // After Moves and Direction we checking for world border collision
        this.playerBorderCollisionSystem()

        this.playerDepthSystem()

        this.playerSpaceHoldSystem()
    }
}
