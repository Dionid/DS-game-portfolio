import {IComponentFactory} from "game/ECS/types"

interface IGOComponentState {
    id: string
}

export const GO_COMPONENT_NAME = "GOComponent"

const GOComponentFactory: IComponentFactory<IGOComponentState> = (id: string) => {
    return {
        name: GO_COMPONENT_NAME,
        state: {
            id,
        },
    }
}

export default GOComponentFactory
