import Player from "game/objects/Player"
import {Chest} from "game/objects/Chest"
import Room from "game/models/Room"
import Cursors from "game/models/Cursors"
import {Loot} from "game/objects/Loot"
import ServiceDescription from "game/objects/ServiceDescription"
import {Folder} from "game/objects/Folder"
import ECSManager from "game/ECS"
import DashComponentFactory from "game/components/DashComponent"
import PlayerComponentFactory from "game/components/PlayerComponent"
import GOComponentFactory from "game/components/GOComponent"
import MovementComponentFactory from "game/components/MovementComponent"
import PlayerMovementSystem from "game/systems/PlayerMovementSystem"
import WorldBorderCollisionSystem from "game/systems/WorldBorderCollisionSystem"
import PhaserOutputPlayerMovementSystem from "game/systems/PhaserOutputPlayerMovementSystem"
import PhaserOutputPlayerAnimationSystem from "game/systems/PhaserOutputPlayerAnimationSystem"
import PositionComponentFactory from "game/components/PositionComponent"
import PhaserInputPositionSystem from "game/systems/PhaserInputPositionSystem"
import DepthComponentComponentFactory from "game/components/DepthComponent"
import PhaserOutputDynamicDepthSystem from "game/systems/PhaserOutputDynamicDepthSystem"
import GOManager from "game/GOManager"
import BodyComponentComponentFactory from "game/components/BodyComponent"
import PhaserInputBodySystem from "game/systems/PhaserInputBodySystem"
import DynamicDepthSystem from "game/systems/DynamicDepthSystem"

const ECS = new ECSManager([
    PhaserInputPositionSystem,
    PhaserInputBodySystem,
    PlayerMovementSystem,
    WorldBorderCollisionSystem,
    DynamicDepthSystem,
    PhaserOutputPlayerAnimationSystem,
    PhaserOutputPlayerMovementSystem,
    PhaserOutputDynamicDepthSystem,
])

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
    private screenHeight: number = 0

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
    private goManager = new GOManager()

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
        this.screenHeight = this.sys.canvas.height
        Object.keys(this.rooms).forEach((roomName: string) => {
            const room = this.rooms[roomName]
            room.offsetY = this.roomScreensTotalNumber * this.screenHeight
            this.roomScreensTotalNumber += room.numberOfScreens
            this.gameHeight += room.numberOfScreens * this.screenHeight
        })
        this.spawnPosition = {
            x: this.gameWidth - 100,
            y: this.rooms.firstRoom.offsetY + this.screenHeight / 2,
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
        this.goManager.addGO(this.player)
        ECS.entitiesManager.createEntity([
            PlayerComponentFactory(),
            MovementComponentFactory(this.player.speed, 200, 300, 1.5),
            DashComponentFactory(),
            GOComponentFactory(this.player.id),
            BodyComponentComponentFactory(
                this.player.body.x,
                this.player.body.y,
                this.player.body.width,
                this.player.body.height,
            ),
            PositionComponentFactory(
                this.player.x,
                this.player.y,
                this.player.width,
                this.player.height,
            ),
            DepthComponentComponentFactory(this.player.depth),
        ])
        // this.player.body.setCollideWorldBounds(true)
    }

    private createInputs() {
        this.cursors = new Cursors(this)
    }

    private leftTextStartOffsetX: number = 100
    private firstScreenOffsetY: number = 0

    private createFirstRoom() {
        this.firstScreenOffsetY = 0

        const helloTextY = this.firstScreenOffsetY + this.sys.canvas.height / 2 - 175

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

        const fChest = new Chest(this, this.gameWidth - 330, secondScreenOffsetY + this.screenHeight / 3 )
        const sChest = new Chest(this, 200, secondScreenOffsetY + this.screenHeight / 3 * 2)
        const thChest = new Chest(this, this.gameWidth - 200, secondScreenOffsetY + this.screenHeight / 3 * 2.3)

        this.chests.add(fChest, true)
        this.chests.add(sChest, true)
        this.chests.add(thChest, true)

        this.physics.add.collider(this.player, this.chests)
    }

    private createThirdRoom() {
        const thirdScreenOffsetY = this.rooms.thirdRoom.offsetY

        const titleY = thirdScreenOffsetY + 50

        const title = this.add.text(
            this.leftTextStartOffsetX,
            titleY,
            "Projects",
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
            "What have I done...",
            {
                fontFamily: "Connection",
                fontSize: 25,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#bdbdbd",
            },
        )

        subtitleText.setDepth(this.gameHeight)

        const fFolder = new Folder(this, "SPA", this.gameWidth / 2, thirdScreenOffsetY + this.screenHeight / 2 )
        this.add.existing(fFolder)
    }

    private createMainCamera() {
        this.cameras.main.setBounds(0, 0, this.sys.canvas.width, this.gameHeight)
        // make the camera follow the player
        this.cameras.main.startFollow(this.player, false, 0.2, 0.2)

        // this.cameras.main.followOffset.y = 200
    }

    private chests!: Phaser.GameObjects.Group

    private createObjectsAndGroups() {
        this.chests = this.add.group({ classType: Chest })
    }

    public create(): void {
        // Utils
        this.calculateRooms()

        this.createBackground()

        // Inputs
        this.createInputs()

        // Objects
        this.createObjectsAndGroups()

        // Player
        this.createPlayer()

        // First room
        this.createFirstRoom()

        // Second room
        this.createSecondRoom()

        // Third room
        this.createThirdRoom()

        // Fourth room

        // Main camera
        this.createMainCamera()
    }

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

    public dashBtnOnHold = false
    public dashInProcess = false
    public dashInProcessTimestamp = 0
    public dashInProcessTimelong = 150
    public dashEndedTimestamp = 0
    private dashRestTimelong = 500
    private dashSpeed = 3000
    public dashMoveVectorNormalized!: Phaser.Math.Vector2

    private playerDashSystem(time: number, delta: number) {
        if (this.dashInProcess) {
            if (time > this.dashInProcessTimestamp + this.dashInProcessTimelong) {
                this.dashInProcess = false
                this.dashEndedTimestamp = time
            }
        } else {
            if (
                !this.dashBtnOnHold
                && this.input.mousePointer.isDown
                && time > this.dashEndedTimestamp + this.dashRestTimelong
            ) {
                const mousePosVector = this.cameras.main.getWorldPoint(
                    this.input.mousePointer.position.x,
                    this.input.mousePointer.position.y,
                )
                this.dashMoveVectorNormalized = mousePosVector.subtract(this.player.body.position).normalize()
                this.dashInProcess = true
                this.dashInProcessTimestamp = time
            }
        }
    }

    private playerDepthSystem() {
        this.player.setDepth(this.player.body.y)
    }

    private playerSpaceHoldSystem() {
        this.dashBtnOnHold = this.input.mousePointer.isDown
    }

    private chestLoot = [
        {
            title: "Frontend",
            subtitle: "React, Redux",
            desc: "and  everything\nincluding modern stack",
            img: "objects/chests/katana.psd",
            opened: false,
        },
        {
            title: "Backend",
            subtitle: "NodeJS /Golang\nAPI's, microservices",
            desc: "everything needed\nfor SPA backend",
            img: "objects/chests/energy.psd",
            opened: false,
        },
        {
            title: "Outsource PM",
            subtitle: "Write TechSpec\n" +
                "Assemble Team\n" +
                "Lead the Project",
            desc: "like outsource CTO",
            img: "objects/chests/katana.psd",
            opened: false,
        },
    ]

    private nearByChests: Chest[] = []

    private chestTriggerSystem() {
        const chests = this.chests.getChildren() as Chest[]

        for (let i = 0; i < chests.length; i++) {
            const chest = chests[i]
            if (this.player.body.position.distance(chest.body.position) < 100) {
                // ToDo: Think of over check for changing Frame
                if (chest.frame.name === "objects/chests/chestDefault.psd") {
                    chest.setFrame("objects/chests/chestTouched.psd")
                    this.nearByChests.push(chest)
                }
            } else {
                if (chest.frame.name === "objects/chests/chestTouched.psd") {
                    chest.setFrame("objects/chests/chestDefault.psd")
                    this.nearByChests = this.nearByChests.filter((ch) => ch !== chest)
                }
            }
            if (this.nearByChests.indexOf(chest) > -1 && chest.frame.name !== "objects/chests/chestOpened.psd") {
                if (this.cursors.action.isDown) {
                    chest.setFrame("objects/chests/chestOpened.psd")
                    const lootData = this.chestLoot.find((l) => !l.opened)
                    if (lootData) {
                        const loot = new Loot(
                            this,
                            chest.body.x + chest.body.width / 2,
                            chest.body.y - chest.body.height,
                            lootData.img,
                            chest.depth,
                        )
                        this.add.existing(loot)
                        const sd = new ServiceDescription(
                            this,
                            chest.body.x + chest.body.width / 2,
                            chest.body.y,
                            chest.depth - 1,
                            35,
                            lootData.title,
                            lootData.subtitle,
                            lootData.desc,
                        )
                        lootData.opened = true
                    }
                }
            }
        }
    }

    public update(time: number, delta: number): void {

        this.cameraMousePointerFollorSystem()

        // Then we add Dash if it is needed
        this.playerDashSystem(time, delta)

        ECS.exec({
            time,
            delta,
        }, {
            cursors: this.cursors,
            goManager: this.goManager,
            playerGO: this.player,
            gameWidth: this.gameWidth,
            gameHeight: this.gameHeight,
        })

        this.chestTriggerSystem()

        // this.playerDepthSystem()

        this.playerSpaceHoldSystem()
    }
}
