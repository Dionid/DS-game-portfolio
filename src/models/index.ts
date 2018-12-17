import {ICountState} from "./test"

export interface IAppStateLoading {
    global: boolean,
    models: {
        count: boolean,
    },
    effects: {
        "count/add": boolean,
    }
}

export default interface IAppState {
    count: ICountState,
    loading: IAppStateLoading,
}
