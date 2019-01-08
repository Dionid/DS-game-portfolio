import Player from "game/objects/Player"
import {Chest} from "game/objects/Chest"
import Room from "game/models/Room"
import Cursors from "game/models/Cursors"
import {Folder} from "game/objects/Folder"
import ECSManager from "game/ECS"
import DashComponentFactory from "game/components/DashComponent"
import PlayerComponentFactory from "game/components/PlayerComponent"
import GOComponentFactory from "game/components/GOComponent"
import MovementComponentFactory from "game/components/MovementComponent"
import PlayerMovementSystem from "game/systems/PlayerMovementSystem"
import WorldBorderCollisionSystem from "game/systems/WorldBorderCollisionSystem"
import PhaserOutputMovementSystem from "game/systems/PhaserOutputMovementSystem"
import PhaserOutputPlayerAnimationSystem from "game/systems/PhaserOutputPlayerAnimationSystem"
import PositionComponentFactory from "game/components/PositionComponent"
import PhaserInputPositionSystem from "game/systems/PhaserInputPositionSystem"
import DepthComponentFactory from "game/components/DepthComponent"
import PhaserOutputDynamicDepthSystem from "game/systems/PhaserOutputDynamicDepthSystem"
import GOManager from "game/GOManager"
import BodyComponentFactory from "game/components/BodyComponent"
import PhaserInputBodySystem from "game/systems/PhaserInputBodySystem"
import DynamicDepthSystem from "game/systems/DynamicDepthSystem"
import ChestComponentFactory from "game/components/ChestComponent"
import PhaserOutputChestSystem from "game/systems/PhaserOutputChestSystem"
import FolderComponentFactory from "game/components/FolderComponent"
import PhaserOutputFolderSystem from "game/systems/PhaserOutputFolderSystem"
import {Project} from "game/objects/Project"
import {EFoldersType, projectsByFoldersType, projectsById} from "game/models/Portfolio"
import PhaserInputVelocitySystem from "game/systems/PhaserInputVelocitySystem"
import PhaserOutputProjectSystem from "game/systems/PhaserOutputProjectSystem"
import GoToTextBtn from "game/objects/GoToTextBtn"
import PhaserOutputContactRoomCreationSystem from "game/systems/PhaserOutputContactRoomCreationSystem"
import RoomTrigger from "game/objects/RoomTrigger"
import {E_ROOMS_NAMES} from "../../common/RoomsNames"
import dvaApp from "dvaApp"

const ECS = new ECSManager([
    PhaserInputPositionSystem,
    PhaserInputBodySystem,
    PhaserInputVelocitySystem,
    PlayerMovementSystem,
    // DashSystem,
    WorldBorderCollisionSystem,
    DynamicDepthSystem,
    PhaserOutputContactRoomCreationSystem,
    PhaserOutputChestSystem,
    PhaserOutputFolderSystem,
    PhaserOutputProjectSystem,
    PhaserOutputPlayerAnimationSystem,
    PhaserOutputDynamicDepthSystem,
    PhaserOutputMovementSystem,
])

const cuttingCornersVersion = true

type IRoomsObj = {
    [name in E_ROOMS_NAMES]: Room
}

export class GameScene extends Phaser.Scene {
    private helloText?: Phaser.GameObjects.Text = undefined
    private fullstackText?: Phaser.GameObjects.Text = undefined
    private freelancerText?: Phaser.GameObjects.Text = undefined
    private cursors!: Cursors
    private player!: Player

    // UTILS
    private gameHeight: number = 0
    private gameWidth: number = 0
    private spawnPosition: {x: number, y: number} = {x: 0, y: 0}
    private screenHeight: number = 0
    private screenWidth: number = 0

    // Rooms
    private rooms: IRoomsObj = {
        [E_ROOMS_NAMES.Intro]: {
            numberOfScreens: 1,
            offsetY: 0,
        },
        [E_ROOMS_NAMES.Services]: {
            numberOfScreens: 1,
            offsetY: 0,
        },
        [E_ROOMS_NAMES.Portfolio]: {
            numberOfScreens: cuttingCornersVersion ? 1 : 3,
            offsetY: 0,
        },
        [E_ROOMS_NAMES.Contacts]: {
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

    private calculateRooms() {
        this.gameWidth = this.sys.canvas.width
        this.screenHeight = this.sys.canvas.height
        this.screenWidth = this.sys.canvas.width
        Object.keys(this.rooms).forEach((roomName: string) => {
            const room: Room = this.rooms[roomName as E_ROOMS_NAMES]
            room.offsetY = this.roomScreensTotalNumber * this.screenHeight
            this.roomScreensTotalNumber += room.numberOfScreens
            this.gameHeight += room.numberOfScreens * this.screenHeight
        })
        const activeRoomName = E_ROOMS_NAMES.Intro
        this.spawnPosition = {
            x: this.gameWidth - 100,
            y: this.rooms[activeRoomName].offsetY + this.screenHeight / 2,
        }
        this.setActiveRoom(activeRoomName)
    }

    public setActiveRoom = (activeRoomName: E_ROOMS_NAMES) => {
        dvaApp._store.dispatch({
            type: "rooms/setActiveRoom",
            payload: activeRoomName,
        })
    }

    private createBackground() {
        const background = this.add.tileSprite(0, 0, this.sys.canvas.width, this.gameHeight, "mainatlas", "bg/bg.psd")
        background.setOrigin(0, 0)
    }

    private createSecondRoomTriggerArea() {
        const trigger1 = new RoomTrigger(
            this,
            () => {
                this.setActiveRoom(E_ROOMS_NAMES.Intro)
            },
            () => {
                this.setActiveRoom(E_ROOMS_NAMES.Services)
            },
            this.player,
            this.gameWidth,
            20,
            0,
            this.rooms.Services.offsetY - 10,
            false,
        )

        const trigger2 = new RoomTrigger(
            this,
            () => {
                this.setActiveRoom(E_ROOMS_NAMES.Services)
            },
            () => {
                this.setActiveRoom(E_ROOMS_NAMES.Portfolio)
            },
            this.player,
            this.gameWidth,
            20,
            0,
            this.rooms.Portfolio.offsetY - 10,
            false,
        )

        const trigger3 = new RoomTrigger(
            this,
            () => {
                this.setActiveRoom(E_ROOMS_NAMES.Portfolio)
            },
            () => {
                this.setActiveRoom(E_ROOMS_NAMES.Contacts)
            },
            this.player,
            this.gameWidth,
            20,
            0,
            this.rooms.Contacts.offsetY - 10,
            false,
        )
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
            DashComponentFactory(),
            GOComponentFactory(this.player.id),
            BodyComponentFactory(
                this.player.body.x,
                this.player.body.y,
                this.player.body.width,
                this.player.body.height,
            ),
            MovementComponentFactory(this.player.speed, 200, 300, 1.5),
            PositionComponentFactory(
                this.player.x,
                this.player.y,
                this.player.width,
                this.player.height,
            ),
            DepthComponentFactory(this.player.depth),
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

        const btn = new GoToTextBtn(
            this,
            this.leftTextStartOffsetX,
            freelancerTextY + this.freelancerText.height + 20,
            this.gameHeight,
        )

        const continueText = this.add.text(
            this.gameWidth - 200,
            this.screenHeight - 60,
            "continue your journey",
            {
                fontFamily: "Connection",
                fontSize: 12,
                stroke: "#000",
                strokeThickness: 2,
                fill: "#fff",
            },
        )
        continueText.setAlpha(0.7)
        continueText.setDepth(this.gameHeight)

        const triangle = this.add.triangle(
            continueText.x + continueText.width / 2 - 12,
            continueText.y + 25,
            0,
            0,
            10,
            12,
            20,
            0,
            0xffffff,
        )
        triangle.setAlpha(0.7)
        triangle.setStrokeStyle(1, 0x000000)
        triangle.setOrigin(0, 0)
        triangle.setDepth(this.gameHeight)

        // ToDo: make animation for triangle
        // ToDO: delete continue on Player pass by
    }

    private createSecondRoom() {
        const secondScreenOffsetY = this.rooms[E_ROOMS_NAMES.Services].offsetY

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
        ECS.entitiesManager.createEntity([
            ChestComponentFactory(
                this.chestLoot[0],
            ),
            GOComponentFactory(fChest.id),
            BodyComponentFactory(
                fChest.body.x,
                fChest.body.y,
                fChest.body.width,
                fChest.body.height,
            ),
            PositionComponentFactory(
                fChest.x,
                fChest.y,
                fChest.width,
                fChest.height,
            ),
            DepthComponentFactory(fChest.depth),
        ])
        const sChest = new Chest(this, 200, secondScreenOffsetY + this.screenHeight / 3 * 2)
        ECS.entitiesManager.createEntity([
            ChestComponentFactory(
                this.chestLoot[1],
            ),
            GOComponentFactory(sChest.id),
            BodyComponentFactory(
                sChest.body.x,
                sChest.body.y,
                sChest.body.width,
                sChest.body.height,
            ),
            PositionComponentFactory(
                sChest.x,
                sChest.y,
                sChest.width,
                sChest.height,
            ),
            DepthComponentFactory(sChest.depth),
        ])
        const thChest = new Chest(this, this.gameWidth - 200, secondScreenOffsetY + this.screenHeight / 3 * 2.3)
        ECS.entitiesManager.createEntity([
            ChestComponentFactory(
                this.chestLoot[2],
            ),
            GOComponentFactory(thChest.id),
            BodyComponentFactory(
                thChest.body.x,
                thChest.body.y,
                thChest.body.width,
                thChest.body.height,
            ),
            PositionComponentFactory(
                thChest.x,
                thChest.y,
                thChest.width,
                thChest.height,
            ),
            DepthComponentFactory(thChest.depth),
        ])

        this.goManager.addGO(fChest)
        this.goManager.addGO(sChest)
        this.goManager.addGO(thChest)

        this.chests.add(fChest, true)
        this.chests.add(sChest, true)
        this.chests.add(thChest, true)

        this.physics.add.collider(this.player, this.chests)
    }

    private createThirdRoomCCVersion() {
        const thirdScreenOffsetY = this.rooms[E_ROOMS_NAMES.Portfolio].offsetY

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

        const comingSoonY = thirdScreenOffsetY + this.screenHeight / 2

        const comingSoon = this.add.text(
            this.gameWidth / 2,
            comingSoonY,
            "coming soon...",
            {
                fontFamily: "Connection",
                fontSize: 40,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#fff",
            },
        )

        comingSoon.setX(this.gameWidth / 2 - comingSoon.width / 2)
        comingSoon.setDepth(this.gameHeight)

        const btn = new GoToTextBtn(
            this,
            this.gameWidth / 2,
            comingSoon.y + comingSoon.height + 20,
            this.gameHeight,
            true,
        )
    }

    private createThirdRoom() {
        const thirdScreenOffsetY = this.rooms[E_ROOMS_NAMES.Portfolio].offsetY

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
        this.goManager.addGO(fFolder)
        ECS.entitiesManager.createEntity([
            GOComponentFactory(fFolder.id),
            FolderComponentFactory(
                EFoldersType.SPA,
                projectsByFoldersType[EFoldersType.SPA],
            ),
            BodyComponentFactory(
                fFolder.body.x,
                fFolder.body.y,
                fFolder.body.width,
                fFolder.body.height,
            ),
            PositionComponentFactory(
                fFolder.x,
                fFolder.y,
                fFolder.width,
                fFolder.height,
            ),
        ])

        this.folders.add(fFolder, true)

        this.physics.add.collider(this.player, this.folders)

        this.physics.add.collider(this.projects, this.projects)
        this.physics.add.collider(this.projects, this.folders)
        this.physics.add.collider(this.player, this.projects)
    }

    private createMainCamera() {
        this.cameras.main.setBounds(0, 0, this.sys.canvas.width, this.gameHeight)
        // make the camera follow the player
        this.cameras.main.startFollow(this.player, false, 0.2, 0.2)

        // this.cameras.main.followOffset.y = 200
    }

    private chests!: Phaser.GameObjects.Group
    private folders!: Phaser.GameObjects.Group
    private projects!: Phaser.GameObjects.Group

    private createObjectsAndGroups() {
        this.chests = this.add.group({ classType: Chest })
        this.folders = this.add.group({ classType: Folder})
        this.projects = this.add.group({ classType: Project})
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
        if (cuttingCornersVersion) {
            this.createThirdRoomCCVersion()
        } else {
            this.createThirdRoom()
        }

        // Fourth room

        // Main camera
        this.createMainCamera()

        this.createSecondRoomTriggerArea()

        ECS.onInit({
            time: 0,
            delta: 0,
        }, {
            cursors: this.cursors,
            scene: this,
            goManager: this.goManager,
            gameWidth: this.gameWidth,
            gameHeight: this.gameHeight,
            timeSpeedScale: this.timeSpeedScale,
            deltaTimeScaled: 0,
            projectsById,
            projectsGOGroup: this.projects,
            rooms: this.rooms,
            leftTextStartOffsetX: this.leftTextStartOffsetX,
            screenHeight: this.screenHeight,
        })
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

    public timeSpeedScale = {
        value: 1,
    }

    public update(time: number, delta: number): void {

        this.cameraMousePointerFollorSystem()

        // if (this.player.y > this.rooms[prevRoom].offsetY && !this.rooms[nextRoom].active) {
        //     this.rooms[activeRoom].active = false
        //     this.rooms.secondRoom.active = true
        // }

        ECS.exec({
            time,
            delta,
        }, {
            cursors: this.cursors,
            scene: this,
            goManager: this.goManager,
            gameWidth: this.gameWidth,
            gameHeight: this.gameHeight,
            timeSpeedScale: this.timeSpeedScale,
            deltaTimeScaled: delta * this.timeSpeedScale.value,
            projectsById,
            projectsGOGroup: this.projects,
            rooms: this.rooms,
            leftTextStartOffsetX: this.leftTextStartOffsetX,
            screenHeight: this.screenHeight,
        })
    }
}
