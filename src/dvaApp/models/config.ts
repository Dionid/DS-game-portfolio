import { Model } from "dva"
import { AnyAction} from "redux"
import { delay } from "dva/saga"
import {mobilecheck} from "src/utils"

export interface IConfigState {
    isMobile: boolean,
    isGame: boolean,
    isCuttingCornersVersion: boolean,
    CVLink: string,
}

interface IConfigModel extends Model {
    state: IConfigState,
}

const model: IConfigModel = {
    namespace: "config",
    state: {
        isMobile: mobilecheck(),
        isGame: false,
        isCuttingCornersVersion: true,
        CVLink: "https://docs.google.com/document/d/1Bpl0x5JgN4qT7fYqO255gRk-LViu18pVEZKYMD-Dmkw/edit?usp=sharing",
    },
    reducers: {
        setIsGame: (state: IConfigState, action: AnyAction) => {
            return {
                ...state,
                isGame: action.payload,
            }
        },
    },
    effects: {},
}

export default model
