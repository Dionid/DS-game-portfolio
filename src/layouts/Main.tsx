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
                            <div className={ cx("leftMenuContent") }>
                                <div className={ cx("contacts") }>
                                    <div className={ cx("item") }>
                                        C
                                    </div>
                                    <div className={ cx("item") }>
                                        C
                                    </div>
                                    <div className={ cx("item") }>
                                        C
                                    </div>
                                </div>
                                <nav className={ cx("nav") }>
                                    <div className={ cx("item") }>
                                        Contacts
                                    </div>
                                    <div className={ cx("item") }>
                                        Projects
                                    </div>
                                    <div className={ cx("item", "active") }>
                                        Services
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <div className={ cx("gameContainer") }>

                        </div>
                        <div className={ cx("rightMenu") }>
                            <div className={ cx("rightMenuContent") }>
                                <a href="" className={ cx("textVersionLink") }>
                                    TEXT Version
                                </a>
                                <div className={ cx("copyright") }>
                                	copyright @2019
                                </div>
                            </div>
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
