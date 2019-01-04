import {IComponentFactory} from "game/ECS/types"

export interface IProjectComponentState {
    id: string
    isOpened: boolean
    isTouched: boolean
}

export const PROJECT_COMPONENT_NAME = "ProjectComponent"

const ProjectComponentFactory: IComponentFactory<IProjectComponentState> = (id: string) => {
    return {
        name: PROJECT_COMPONENT_NAME,
        state: {
            id,
            isOpened: false,
            isTouched: false,
        },
    }
}

export default ProjectComponentFactory
