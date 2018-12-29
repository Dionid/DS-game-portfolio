import {IComponentFactory} from "game/ECS/types"

export interface IFolderComponentState {
    isOpened: boolean
    isTouched: boolean
}

export const FOLDER_COMPONENT_NAME = "FolderComponent"

const FolderComponentFactory: IComponentFactory<IFolderComponentState> = () => {
    return {
        name: FOLDER_COMPONENT_NAME,
        state: {
            isOpened: false,
            isTouched: false,
        },
    }
}

export default FolderComponentFactory
