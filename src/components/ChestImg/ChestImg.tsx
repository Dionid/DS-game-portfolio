import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./ChestImg.scss"
import classnamesBind from "classnames/bind"
import PhaserImage from "components/PhaserImage/PhaserImage"

const cx = classnamesBind.bind(styles)

interface IProps {
    dispatch: Dispatch<Action>,
    itemClassName: string,
    name: string,
    subname: string,
    info: string,
    weaponImg: string,
    opened?: boolean,
}

interface IState {
    hovered: boolean,
    opened: boolean,
}

class ChestImg extends React.Component<IProps, IState> {

    public static defaultProps = {
        opened: false,
    }

    public state = {
        hovered: false,
        opened: this.props.opened,
    }

    private onMouseEnter = () => {
        this.setState({
            hovered: true,
        })
    }

    private onMouseLeave = () => {
        this.setState({
            hovered: false,
        })
    }

    private onClick = () => {
        this.setState({
            opened: true,
        })
    }

    public render() {
        const {
            opened,
            hovered,
        } = this.state
        const {
            itemClassName,
            name,
            subname,
            info,
            weaponImg,
        } = this.props

        const filename = opened ? "objects/chests/chestOpened.psd" : hovered ? "objects/chests/chestTouched.psd" : "objects/chests/chestDefault.psd"

        return (
            <div
                className={ cx("item", itemClassName, {
                    opened,
                }) }>
                <div
                    onMouseEnter={ this.onMouseEnter }
                    onMouseLeave={ this.onMouseLeave }
                    className={ cx("imageWr") }>
                    <div className={ cx("weaponImg") }>
                        <PhaserImage
                            onClick={ this.onClick }
                            filename={ `objects/chests/${weaponImg}.psd` }/>
                    </div>
                    <PhaserImage
                        onClick={ this.onClick }
                        filename={ filename }/>
                </div>
                <div className={ cx("desc-wr") }>
                    <div className={ cx("desc") }>
                        <div className={ cx("name") }>
                            { name }
                        </div>
                        <div className={ cx("subname") }>
                            { subname }
                        </div>
                        <div className={ cx("info") }>
                            { info }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(({}: IAppState) => {
    return {}
})(ChestImg)
