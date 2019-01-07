import { Model } from "dva"
import { AnyAction} from "redux"
import { delay } from "dva/saga"
import {E_ROOMS_NAMES} from "../common/RoomsNames"

export interface IRoomsState {
    activeRoom: E_ROOMS_NAMES,
}

interface IRoomsModel extends Model {
    state: IRoomsState,
}

interface ISetActiveRoomAction extends AnyAction {
    payload: E_ROOMS_NAMES
}

const model: IRoomsModel = {
    namespace: "rooms",
    state: {
        activeRoom: E_ROOMS_NAMES.Intro,
    },
    reducers: {
        setActiveRoom(state: IRoomsState, action: AnyAction) {
            return {
                ...state,
                activeRoom: action.payload,
            }
        },
    },
    effects: {},
}

export default model
