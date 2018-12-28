import {IComponentFactory} from "game/ECS/types"

export interface IBodyComponentState {
    x: number
    y: number
    width: number
    height: number
}

export const BODY_COMPONENT_NAME = "BodyComponent"

const BodyComponentFactory: IComponentFactory<IBodyComponentState> = (
    x: number,
    y: number,
    width: number,
    height: number,
) => {
    return {
        name: BODY_COMPONENT_NAME,
        state: {
            x,
            y,
            width,
            height,
        },
    }
}

export default BodyComponentFactory
