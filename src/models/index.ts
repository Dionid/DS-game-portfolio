import {ICountState} from "./count"
import {IRoomsState} from "models/rooms"

export interface IAppStateLoading {
    global: boolean,
    models: {
        count: boolean,
        rooms: boolean,
    },
    effects: {
        "count/add": boolean,
    }
}

export default interface IAppState {
    rooms: IRoomsState,
    count: ICountState,
    loading: IAppStateLoading,
}
