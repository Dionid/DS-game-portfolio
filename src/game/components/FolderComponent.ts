import {IComponentFactory} from "game/ECS/types"
import {EFoldersType} from "game/models/Portfolio"

export interface IFolderComponentState {
    folderType: EFoldersType
    projectsDataIds: string[]
    isOpened: boolean
    isTouched: boolean
}

export const FOLDER_COMPONENT_NAME = "FolderComponent"

const FolderComponentFactory: IComponentFactory<IFolderComponentState> = (
    folderType: EFoldersType,
    projectsDataIds: string[],
) => {
    return {
        name: FOLDER_COMPONENT_NAME,
        state: {
            folderType,
            projectsDataIds,
            isOpened: false,
            isTouched: false,
        },
    }
}

export default FolderComponentFactory
