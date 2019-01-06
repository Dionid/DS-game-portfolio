import System from "game/ECS/system"
import {ISystemAdditional, ISystemPhaserInjectable} from "game/systems/index"
import EntitiesManager from "game/ECS/entitiesmanager"

const PhaserOutputContactRoomCreationSystemName = "PhaserOutputContactRoomCreationSystem"

class PhaserOutputContactRoomCreationSystem extends System<ISystemAdditional, ISystemPhaserInjectable> {
    public init(
        entityManager: EntitiesManager,
        additional: ISystemAdditional,
        inj: ISystemPhaserInjectable,
    ): undefined {

        const thirdScreenOffsetY = inj.rooms.fourthRoom.offsetY

        const titleY = thirdScreenOffsetY + 50

        const title = inj.scene.add.text(
            inj.leftTextStartOffsetX,
            titleY,
            "Contacts",
            {
                fontFamily: "Connection",
                fontSize: 60,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#fff",
            },
        )

        title.setDepth(inj.gameHeight)

        const subtitleText = inj.scene.add.text(
            inj.leftTextStartOffsetX,
            titleY + title.height,
            "Just call me maybe",
            {
                fontFamily: "Connection",
                fontSize: 25,
                stroke: "#000",
                strokeThickness: 5,
                fill: "#bdbdbd",
            },
        )

        subtitleText.setDepth(inj.gameHeight)

        const emailIcon = inj.scene.add.sprite(
            inj.leftTextStartOffsetX,
            thirdScreenOffsetY + inj.screenHeight / 2 - 20,
            "mainatlas",
            "objects/contacts/EmailIcon.psd",
        )

        const emailText = inj.scene.add.text(
            emailIcon.x + emailIcon.width + 30,
            emailIcon.y + 2,
            "Email",
            {
                fontFamily: "Connection",
                fontSize: 20,
                fill: "#fff",
                stroke: "#000",
                strokeThickness: 3,
            },
        )

        emailText.setDepth(inj.gameHeight)

        const emailValueText = inj.scene.add.text(
            emailText.x + emailText.width + 100,
            emailIcon.y + 2,
            "ditreyw@gmail.com",
            {
                fontFamily: "Connection",
                fontSize: 20,
                fill: "#e4910f",
                stroke: "#000",
                strokeThickness: 3,
            },
        )

        emailValueText.setDepth(inj.gameHeight)
        emailValueText.setInteractive({
            useHandCursor: true,
        })
        emailValueText.on("pointerover", () => {
            emailValueText.setFill("#eb41ff")
        })
        emailValueText.on("pointerout", () => {
            emailValueText.setFill("#e4910f")
        })

        let emailValueTextClicked = false

        emailValueText.on("pointerdown", () => {
            emailValueTextClicked = true
        })

        const facebookIcon = inj.scene.add.sprite(
            inj.leftTextStartOffsetX,
            emailValueText.y + 50,
            "mainatlas",
            "objects/contacts/EmailIcon.psd",
        )

        const facebookText = inj.scene.add.text(
            facebookIcon.x + facebookIcon.width + 30,
            facebookIcon.y + 2,
            "Facebook",
            {
                fontFamily: "Connection",
                fontSize: 20,
                fill: "#fff",
                stroke: "#000",
                strokeThickness: 3,
            },
        )

        facebookText.setDepth(inj.gameHeight)

        const facebookValueText = inj.scene.add.text(
            facebookText.x + facebookText.width + 60,
            facebookIcon.y + 2,
            "@davidshekunts",
            {
                fontFamily: "Connection",
                fontSize: 20,
                fill: "#e4910f",
                stroke: "#000",
                strokeThickness: 3,
            },
        )

        facebookValueText.setDepth(inj.gameHeight)
        facebookValueText.setInteractive({
            useHandCursor: true,
        })
        facebookValueText.on("pointerover", () => {
            facebookValueText.setFill("#eb41ff")
        })
        facebookValueText.on("pointerout", () => {
            facebookValueText.setFill("#e4910f")
        })

        let facebookValueTextClicked = false

        facebookValueText.on("pointerdown", () => {
            facebookValueTextClicked = true
        })

        const linkedInIcon = inj.scene.add.sprite(
            inj.leftTextStartOffsetX,
            facebookValueText.y + 50,
            "mainatlas",
            "objects/contacts/EmailIcon.psd",
        )

        const linkedInText = inj.scene.add.text(
            linkedInIcon.x + linkedInIcon.width + 30,
            linkedInIcon.y + 2,
            "LinkedIn",
            {
                fontFamily: "Connection",
                fontSize: 20,
                fill: "#fff",
                stroke: "#000",
                strokeThickness: 3,
            },
        )

        linkedInText.setDepth(inj.gameHeight)

        const linkedInValueText = inj.scene.add.text(
            linkedInText.x + linkedInText.width + 80,
            linkedInIcon.y + 2,
            "@davidshekunts",
            {
                fontFamily: "Connection",
                fontSize: 20,
                fill: "#e4910f",
                stroke: "#000",
                strokeThickness: 3,
            },
        )

        linkedInValueText.setDepth(inj.gameHeight)
        linkedInValueText.setInteractive({
            useHandCursor: true,
        })
        linkedInValueText.on("pointerover", () => {
            linkedInValueText.setFill("#eb41ff")
        })
        linkedInValueText.on("pointerout", () => {
            linkedInValueText.setFill("#e4910f")
        })

        let linkedInValueTextClicked = false

        linkedInValueText.on("pointerdown", () => {
            facebookValueTextClicked = true
        })

        inj.scene.input.addUpCallback(() => {
            if (emailValueTextClicked) {
                window.prompt("Copy to clipboard: Ctrl+C, Enter", "ditreyw@gmail.com")
                emailValueTextClicked = false
            }
            if (facebookValueTextClicked) {
                window.open("https://www.facebook.com/davidshekunts", "_blank")
                facebookValueTextClicked = false
            }
            if (linkedInValueTextClicked) {
                window.open("https://www.facebook.com/davidshekunts", "_blank")
                linkedInValueTextClicked = false
            }
        }, false)

        return
    }
}

export default new PhaserOutputContactRoomCreationSystem(PhaserOutputContactRoomCreationSystemName)
