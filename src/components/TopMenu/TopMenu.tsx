import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./TopMenu.scss"
import classnamesBind from "classnames/bind"

const cx = classnamesBind.bind(styles)

interface IProps {
    dispatch: Dispatch<Action>,
}

interface IState {

}

class TopMenu extends React.Component<IProps, IState> {
    public render() {
        return (
            <div className={ cx("topMenu") }>
                <div className={ cx("logo") }>
                    <h1 className={ cx("name") }>
                        <span className={ cx("main-letter") }>D</span><span className={ cx("rest") }>avid</span>
                    </h1>
                    <h1 className={ cx("surname") }>
                        <span className={ cx("main-letter") }>S</span><span className={ cx("rest") }>hekunts</span>
                    </h1>
                </div>
                <div className={ cx("stats") }>
                    <div className={ cx("inventory") }>
                        <div className={ cx("row") }>
                            <div className={ cx("item") }>

                            </div>
                            <div className={ cx("item") }>

                            </div>
                            <div className={ cx("item") }>

                            </div>
                        </div>
                        <div className={ cx("row") }>
                            <div className={ cx("item") }>

                            </div>
                            <div className={ cx("item") }>

                            </div>
                            <div className={ cx("item") }>

                            </div>
                        </div>
                    </div>
                    <div className={ cx("bars") }>
                        <div className={ cx("health-wr") }>
                            <div className={ cx("health-bar") }>
                                <div className={ cx("health-text") }>
                                    100%
                                </div>
                            </div>
                        </div>
                        <div className={ cx("energy-wr") }>
                            <div className={ cx("energy-bar") }>
                                <div className={ cx("energy-item") }>

                                </div>
                                <div className={ cx("energy-item") }>

                                </div>
                                <div className={ cx("energy-item") }>

                                </div>
                                <div className={ cx("energy-item") }>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={ cx("avatar-wr") }>
                        <div className={ cx("avatar-container") }>

                        </div>
                        <div className={ cx("avatar-nickname") }>
                            Player 1
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(({}: IAppState) => {
    return {}
})(TopMenu)
