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

class GameOverlay extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            mainTooltipMustBeShown: props.rooms.activeRoom === E_ROOMS_NAMES.Intro,
            mainTooltipIsShown: false,
        }
    }

    public componentDidMount(): void {
        setTimeout(() => {
            this.setState({
                mainTooltipIsShown: this.props.rooms.activeRoom === E_ROOMS_NAMES.Intro,
            })
        }, 2000)
    }

    public componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
        if (nextProps.rooms.hasChanged && this.state.mainTooltipMustBeShown) {
            this.setState({
                mainTooltipIsShown: false,
            })
            setTimeout(() => {
                this.setState({
                    mainTooltipMustBeShown: false,
                })
            }, 1000)
        } else {
            if (nextProps.rooms.activeRoom === E_ROOMS_NAMES.Intro) {
                this.setState({
                    mainTooltipMustBeShown: true,
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
