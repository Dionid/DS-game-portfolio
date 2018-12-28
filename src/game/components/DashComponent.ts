import {IComponentFactory} from "game/ECS/types"

export interface IDashComponentState {
    dashRange: number
    dashRangePassed: number
    dashDestX: number
    dashDestY: number
    dashSpeed: number
    dashInProcess: boolean
    dashAiming: boolean
    dashStartingPosX: number
    dashStartingPosY: number
}

export const DASH_COMPONENT_NAME = "DashComponent"

const DashComponentFactory: IComponentFactory<IDashComponentState> = (dashRange: number, dashSpeed: number) => {
    return {
        name: DASH_COMPONENT_NAME,
        state: {
            dashRange: dashRange || 200,
            dashSpeed: dashSpeed || 10,
            dashRangePassed: 0,
            dashInProcess: false,
            dashAiming: false,
            dashStartingPosX: 0,
            dashStartingPosY: 0,
            dashDestX: 0,
            dashDestY: 0,
        },
    }
}

export default DashComponentFactory
