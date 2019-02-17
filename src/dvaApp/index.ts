import dva, {DvaInstance} from "dva"
import rImS from "redux-immutable-state-invariant"
import {Store} from "redux"
import IAppState from "models"

const middlewares = process.env.NODE_ENV !== "production" ?
    [rImS()] :
    []

interface IDvaInstanceWidthStore extends DvaInstance {
    _store: Store<IAppState>,
}

const dvaApp = dva({
    onAction: middlewares,
}) as IDvaInstanceWidthStore

export default dvaApp
