import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./MainMobile.scss"
import classnamesBind from "classnames/bind"

const cx = classnamesBind.bind(styles)

interface IProps {
    dispatch: Dispatch<Action>,
}

interface IState {

}

class MainMobile extends React.Component<IProps, IState> {
    public render() {
        return (
            <div className={ cx("wrapper") }>
                <div className={ cx("container", "first") }>
                    <h1 className={ cx("title", "bordered") }>Hi, my name is</h1>
                    <h1 className={ cx("title", "bordered") }>David Shekunts</h1>
                    <h2 className={ cx("subtitle", "bordered") }>I'm fullstack web developer</h2>
                    <h3 className={ cx("subtitle2", "bordered") }>(Freelancer)</h3>
                </div>
                <div className={ cx("tooltip-wr", "shown") }>
                    <div className={ cx("tooltip") }>
                        <h2 className={ cx("subtitle2", "bordered") }>
                            To get full experience from this site visit desktop version
                            (because it's not just portfolio, it's a online game)
                        </h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(({}: IAppState) => {
    return {}
})(MainMobile)
