import {IComponentFactory} from "game/ECS/types"

export interface IDepthComponentComponentState {
    depth: number
}

export const DEPTH_COMPONENT_NAME = "DepthComponentComponent"

const DepthComponentComponentFactory: IComponentFactory<IDepthComponentComponentState> = (depth: number) => {
    return {
        name: DEPTH_COMPONENT_NAME,
        state: {
            depth,
        },
    }
}

export default DepthComponentComponentFactory
