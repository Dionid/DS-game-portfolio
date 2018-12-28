import {IComponentFactory} from "game/ECS/types"

export interface IDashComponentState {
    dashDistanceMax: number
    dashDistancePassed: number
    dashDistanceCur: number
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
            dashDistanceMax: dashRange || 300,
            dashDistanceCur: 0,
            dashDistancePassed: 0,
            dashSpeed: dashSpeed || 10,
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
