import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import Hello from "components/Hello"
import styles from "./Main.scss"

interface IProps {
    dispatch: Dispatch<Action>,
}

interface IState {}

console.log(styles)

class MainLayout extends React.Component<IProps, IState> {
    public render() {
        return (
            <div>
                <h1 className={ styles.test }>MainLayout</h1>
                <Hello/>
            </div>
        )
    }
}

export default connect(({}: IAppState) => {
    return {}
})(MainLayout)
