import { Model } from "dva"
import { AnyAction} from "redux"
import { delay } from "dva/saga"
import {mobilecheck} from "src/utils"

export interface IConfigState {
    isMobile: boolean,
    isGame: boolean,
    isCuttingCornersVersion: boolean,
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
