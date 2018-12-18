import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./Main.scss"
import classnamesBind from "classnames/bind"
import TopMenu from "components/TopMenu/TopMenu"

const cx = classnamesBind.bind(styles)

interface IProps {
    dispatch: Dispatch<Action>,
}

interface IState {}

console.log(styles)

class MainLayout extends React.Component<IProps, IState> {
    public render() {
        return (
            <div className={ cx("wrapper") }>
                <div className={ cx("container") }>
                    <TopMenu/>
                    <div className={ cx("content") }>
                        <div className={ cx("leftMenu") }>

                        </div>
                        <div className={ cx("gameContainer") }>

                        </div>
                        <div className={ cx("rightMenu") }>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(({}: IAppState) => {
    return {}
})(MainLayout)
