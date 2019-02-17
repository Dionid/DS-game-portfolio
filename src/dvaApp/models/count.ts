import { Model } from "dva"
import { delay } from "dva/saga"

export interface ICountState {
    value: number,
}

interface ICountModel extends Model {
    state: ICountState,
}

const model: ICountModel = {
    namespace: "count",
    state: {
        value: 0,
    },
    reducers: {
        add(count: ICountState) {
            console.log("ADD RED")
            console.log(count)
            return { value: count.value + 1 }
        },
        minus(count: ICountState) {
            console.log(count)
            return { value: count.value - 1 }
        },
    },
    effects: {
        *addEffect(action, opts) {
            console.log("INSIDE BEFORE")
            const { call, put } = opts
            yield put({ type: "add" })
            console.log("INSIDE AFTER")
        },
    },
}

export default model
