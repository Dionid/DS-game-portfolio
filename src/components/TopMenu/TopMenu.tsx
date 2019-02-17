import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./TopMenu.scss"
import classnamesBind from "classnames/bind"
import {IConfigState} from "../../dvaApp/models/config"
import {IPlayerState} from "src/dvaApp/models/player"
import Icon from "components/Icon/Icon"

const cx = classnamesBind.bind(styles)

interface IProps {
    dispatch: Dispatch<Action>,
    config: IConfigState,
    player: IPlayerState,
}

interface IState {

}

class TopMenu extends React.Component<IProps, IState> {

    private renderHealthItems() {
        const { currentHealth, maxHealth } = this.props.player
        const res = []

        for (let i = 0; i < maxHealth; i++) {
            res.push(
                <div key={ i } className={ cx("item", currentHealth >= maxHealth - i && "full") }>
                    {
                        i === maxHealth - 1 && <p className={cx("number")}>{ currentHealth }</p>
                    }
                </div>,
            )
        }

        return res
    }

    private renderMedsItems() {
        const { currentMeds, maxMeds } = this.props.player
        const res = []

        for (let i = 0; i < maxMeds; i++) {
            res.push(
                <div key={ i } className={ cx("item", currentMeds >= maxMeds - i && "full") }>
                    <Icon name="flash" size={ [10, 10] }/>
                </div>,
            )
        }

        return res
    }

    public render() {
        const { isCuttingCornersVersion } = this.props.config
        const { currentHealth, maxHealth, currentMeds } = this.props.player
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
                    {
                        !isCuttingCornersVersion &&
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
                    }
                    <div className={ cx("bars") }>
                        <div className={ cx("health-wr") }>
                            <div className={ cx("health-bar") }>
                                {
                                    this.renderHealthItems()
                                }
                                {/*<div className={ cx("item") }/>*/}
                                {/*<div className={ cx("item") }/>*/}
                                {/*<div className={ cx("item") }/>*/}
                                {/*<div className={ cx("item") }/>*/}
                                {/*<div className={ cx("item") }>*/}
                                    {/*{ currentHealth }*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className={ cx("energy-wr") }>
                            <div className={ cx("energy-bar") }>
                                {
                                    this.renderMedsItems()
                                }
                                {/*<div className={ cx("energy-item") }>*/}

                                {/*</div>*/}
                                {/*<div className={ cx("energy-item") }>*/}

                                {/*</div>*/}
                                {/*<div className={ cx("energy-item") }>*/}

                                {/*</div>*/}
                                {/*<div className={ cx("energy-item") }>*/}

                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className={ cx("avatar-wr") }>
                        <div className={ cx("avatar-container") }>
                            <img className={ cx("avatar-img") } src={ require("assets/images/playerAvatar.png") } alt=""/>
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

export default connect(({ config, player }: IAppState) => {
    return {
        config,
        player,
    }
})(TopMenu)
