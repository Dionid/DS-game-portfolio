import dva from "dva"
import rImS from "redux-immutable-state-invariant"

const middlewares = process.env.NODE_ENV !== "production" ?
    [rImS()] :
    []

const dvaApp = dva({
    onAction: middlewares,
})

export default dvaApp
