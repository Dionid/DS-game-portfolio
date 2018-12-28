import {IComponentFactory} from "game/ECS/types"

// interface IPlayerComponentState {}

export const PLAYER_COMPONENT_NAME = "PlayerComponent"

const PlayerComponentFactory: IComponentFactory<{}> = () => {
    return {
        name: PLAYER_COMPONENT_NAME,
        state: {},
    }
}

export default PlayerComponentFactory
