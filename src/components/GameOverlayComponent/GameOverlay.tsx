import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./GameOverlay.scss"
import classnamesBind from "classnames/bind"
import {IRoomsState} from "dvaApp/models/rooms"
import {E_ROOMS_NAMES} from "../../common/RoomsNames"
import keysImg from "assets/images/keys.png"
import actionKey from "assets/images/actionKey.png"

const cx = classnamesBind.bind(styles)

interface IProps {
    dispatch: Dispatch<Action>,
    rooms: IRoomsState,
}

interface IState {
    mainTooltipMustBeShown: boolean,
    mainTooltipIsShown: boolean,
}

class GameOverlay extends React.PureComponent<IProps, IState> {

    public state = {
        mainTooltipMustBeShown: this.props.rooms.activeRoom === E_ROOMS_NAMES.Intro,
        mainTooltipIsShown: false,
    }

    public componentDidMount(): void {
        setTimeout(() => {
            if (this.state.mainTooltipMustBeShown) {
                this.setState({
                    mainTooltipIsShown: this.props.rooms.activeRoom === E_ROOMS_NAMES.Intro,
                })
            }
        }, 2000)
    }

    public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (!prevProps.rooms.hasChanged
            && this.props.rooms.hasChanged
            && prevState.mainTooltipMustBeShown) {
            this.setState({
                mainTooltipIsShown: false,
            })
            if (this.state.mainTooltipIsShown) {
                setTimeout(() => {
                    this.setState({
                        mainTooltipMustBeShown: false,
                    })
                }, 1000)
            } else {
                this.setState({
                    mainTooltipMustBeShown: false,
                })
            }
        }
    }

    public render() {
        const { mainTooltipIsShown, mainTooltipMustBeShown } = this.state

        return (
            <div className={ cx("wrapper") }>
                {
                    mainTooltipMustBeShown
                    && <div className={ cx("tooltip-wr", mainTooltipIsShown && "shown") }>
                      <div className={ cx("tooltip", "main") }>
                            <div className={ cx("item") }>
                              <img style={{width: 96}} src={ keysImg } alt=""/>
                                <div className={ cx("text") }>
                                    Movement
                                </div>
                            </div>
                          <div className={ cx("item") }>
                            <img style={{width: 30, margin: 15}} src={ actionKey } alt=""/>
                            <div className={ cx("text") }>
                              Action
                            </div>
                          </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default connect(({ rooms }: IAppState) => {
    return {
        rooms,
    }
})(GameOverlay)
