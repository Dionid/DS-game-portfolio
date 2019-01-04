import {IComponentFactory} from "game/ECS/types"

export interface IPositionComponentState {
    x: number
    y: number
    width: number
    height: number
}

export const POSITION_COMPONENT_NAME = "PositionComponent"

const PositionComponentFactory: IComponentFactory<IPositionComponentState> = (
    x: number,
    y: number,
    width: number,
    height: number,
) => {
    return {
        name: POSITION_COMPONENT_NAME,
        state: {
            x,
            y,
            width,
            height,
        },
    }
}

export default PositionComponentFactory
