import { Model } from "dva"
import { delay } from "dva/saga"
import {AnyAction} from "redux"

export interface IPlayerState {
    currentHealth: number,
    maxHealth: number,
    currentMeds: number,
    maxMeds: number,
}

interface IPlayerModel extends Model {
    state: IPlayerState,
}

const model: IPlayerModel = {
    namespace: "player",
    state: {
        currentHealth: 1,
        maxHealth: 5,
        currentMeds: 1,
        maxMeds: 4,
    },
    reducers: {
        changeHealth(state: IPlayerState, action: AnyAction) {
            return {
                ...state,
                currentHealth: action.payload,
            }
        },
        changeMeds(state: IPlayerState, action: AnyAction) {
            return {
                ...state,
                currentMeds: action.payload,
            }
        },
    },
    effects: {
        *fulfillStats(action, opts) {
            yield opts.put({ type: "changeHealth", payload: 5 })
            yield opts.put({ type: "changeMeds", payload: 4 })
        },
    },
}

export default model
