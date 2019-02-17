import "@babel/polyfill"
import dva, { connect } from "dva"
import createLoading from "dva-loading"
import React from "react"
import MainLayout from "./layouts/Main"
import dvaApp from "dvaApp"
import "reset-css"
import "./index.scss"
// import dvaApp from "dvaApp"

// @ts-ignore
const modelsReq = require.context("./dvaApp/models", true, /\.ts$/)

// const dvaApp = dva()

modelsReq.keys().forEach((filename: string) => {
    const model = modelsReq(filename).default
    if (model) {
        dvaApp.model(model)
    }
})

dvaApp.use(createLoading())

dvaApp.router(() => <MainLayout />)

dvaApp.start("#root")
