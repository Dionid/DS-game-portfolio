import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import Hello from "components/Hello"

interface IProps {
    dispatch: Dispatch<Action>,
}

interface IState {}

class MainLayout extends React.Component<IProps, IState> {
    public render() {
        return (
            <div>
                <h1>MainLayout</h1>
                <Hello/>
            </div>
        )
    }
}

export default connect(({}: IAppState) => {
    return {}
})(MainLayout)
