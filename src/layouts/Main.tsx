import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./Main.scss"
import classnamesBind from "classnames/bind"
import TopMenu from "components/TopMenu/TopMenu"
import PhaserGame from "components/PhaserGame/PhaserGame"
import ProjectModal from "components/ProjectModal/ProjectModal"
import {IRoomsState} from "dvaApp/models/rooms"
import {E_ROOMS_NAMES} from "../common/RoomsNames"
import GameOverlay from "components/GameOverlayComponent/GameOverlay"
import {IConfigState} from "dvaApp/models/config"
import MainMobile from "./MainMobile"

const cx = classnamesBind.bind(styles)

interface IProps {
    dispatch: Dispatch<Action>,
    rooms: IRoomsState,
    config: IConfigState,
}

interface IState {
    projectModalIsOpened: boolean,
}

class MainLayout extends React.Component<IProps, IState> {

    public state = {
        projectModalIsOpened: false,
    }

    private closeModal = () => {
        this.setState({
            projectModalIsOpened: false,
        })
    }

    public render() {
        const { projectModalIsOpened } = this.state
        const { isMobile } = this.props.config
        const { activeRoom } = this.props.rooms

        if (isMobile) {
            return <MainMobile/>
        }

        return (
            <div className={ cx("wrapper") }>
                <div className={ cx("container") }>
                    <TopMenu/>
                    <div className={ cx("content") }>
                        <div className={ cx("leftMenu") }>
                            <div className={ cx("leftMenuContent") }>
                                <div className={ cx("contacts") }>
                                    <a
                                        href={ "https://vk.com/david_shekunts" }
                                        target={ "_blank" }
                                        id={ "contactEmailId" }
                                        className={ cx("item") }
                                    >
                                        C
                                    </a>
                                    <div className={ cx("item") }>
                                        C
                                    </div>
                                    <div className={ cx("item") }>
                                        C
                                    </div>
                                </div>
                                <nav className={ cx("nav") }>
                                    <div className={ cx("item", activeRoom === E_ROOMS_NAMES.Contacts && "active") }>
                                        Contacts
                                    </div>
                                    <div className={ cx("item", activeRoom === E_ROOMS_NAMES.Portfolio && "active") }>
                                        Projects
                                    </div>
                                    <div className={ cx("item", activeRoom === E_ROOMS_NAMES.Services && "active") }>
                                        Services
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <div className={ cx("gameContainer") }>
                            <PhaserGame />
                            <GameOverlay />
                        </div>
                        <div className={ cx("rightMenu") }>
                            <div className={ cx("rightMenuContent") }>
                                <a href="https://docs.google.com/document/d/1oRlYkKEH-9g2wk6Aiiu_-K1tYsw7BHF3OeuCPhi_Aes/edit#heading=h.sgsvqiccdupn" target="_blank" className={ cx("textVersionLink") }>
                                    LINK to TEXT Version
                                </a>
                                <div className={ cx("copyright") }>
                                    copyright @2019
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    projectModalIsOpened && <ProjectModal closeModal={ this.closeModal }/>
                }
            </div>
        )
    }
}

export default connect(({ rooms, config }: IAppState) => {
    return {
        config,
        rooms,
    }
})(MainLayout)
