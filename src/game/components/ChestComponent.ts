import {IComponentFactory} from "game/ECS/types"

export interface IChestLootData {
    title: string
    subtitle: string
    desc: string
    img: string
}

export interface IChestComponentState {
    isTouched: boolean
    loot: IChestLootData
    isOpened: boolean
}

export const CHEST_COMPONENT_NAME = "ChestComponent"

const ChestComponentFactory: IComponentFactory<IChestComponentState> = (
    loot: IChestLootData,
) => {
    return {
        name: CHEST_COMPONENT_NAME,
        state: {
            isTouched: false,
            isOpened: false,
            loot,
        },
    }
}

export default ChestComponentFactory
