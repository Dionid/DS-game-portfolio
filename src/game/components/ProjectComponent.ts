import {IComponentFactory} from "game/ECS/types"

interface IProjectComponentState {
    
}

export const PROJECT_COMPONENT_NAME = "ProjectComponent"

const ProjectComponentFactory: IComponentFactory<IProjectComponentState> = () => {
    return {
        name: PROJECT_COMPONENT_NAME,
        state: {},
    }
}

export default ProjectComponentFactory
