import {IComponentFactory} from "game/ECS/types"

interface IDashComponentState {
    dashRange: number
    dashInProcess: boolean
}

export const DASH_COMPONENT_NAME = "DashComponent"

const DashComponentFactory: IComponentFactory<IDashComponentState> = (dashRange: number, dashInProcess: boolean) => {
    return {
        name: DASH_COMPONENT_NAME,
        state: {
            dashRange: dashRange || 1000,
            dashInProcess: dashInProcess || false,
        },
    }
}

export default DashComponentFactory
