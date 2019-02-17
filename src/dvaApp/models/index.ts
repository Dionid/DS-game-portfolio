import {ICountState} from "./count"
import {IRoomsState} from "models/rooms"
import {IConfigState} from "models/config"
import {IPlayerState} from "src/dvaApp/models/player"

export interface IAppStateLoading {
    global: boolean,
    models: {
        count: boolean,
        rooms: boolean,
        config: boolean,
    },
    effects: {
        "count/add": () => void,
        "rooms/setActiveRoom": () => void,
    }
}

export default interface IAppState {
    rooms: IRoomsState,
    count: ICountState,
    loading: IAppStateLoading,
    config: IConfigState,
    player: IPlayerState,
}
