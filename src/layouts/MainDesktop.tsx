import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./MainDesktop.scss"
import classnamesBind from "classnames/bind"
import Button from "components/Button/Button"
import chest from "assets/images/playerAvatar.png"
import {E_ROOMS_NAMES} from "src/common/RoomsNames"
import {IRoomsState} from "src/dvaApp/models/rooms"

const cx = classnamesBind.bind(styles)

interface IProps {
    dispatch: Dispatch<Action>,
    rooms: IRoomsState,
}

enum E_CHESTS_TYPES {
    FRONTEND = "FRONTEND",
    BACKEND = "BACKEND",
    OUTPM = "OUTPM",
}

interface IState {
    contentHeight: number,
    chestsOpened: {[key in E_CHESTS_TYPES]: boolean}
}

class MainDesktop extends React.Component<IProps, IState> {

    public state = {
        contentHeight: 0,
        chestsOpened: {
            [E_CHESTS_TYPES.FRONTEND]: false,
            [E_CHESTS_TYPES.BACKEND]: false,
            [E_CHESTS_TYPES.OUTPM]: false,
        },
    }

    private scrolling = false
    private scrollStoppedTimeoutId!: NodeJS.Timeout
    private prevScrollTop: number = 0

    private outer: HTMLDivElement | null = null
    private wrapper: HTMLDivElement | null = null

    private rooms: {[key: string]: HTMLDivElement | null} = {
        [E_ROOMS_NAMES.Intro]: null,
        [E_ROOMS_NAMES.Services]: null,
        [E_ROOMS_NAMES.Portfolio]: null,
        [E_ROOMS_NAMES.Contacts]: null,
    }

    public componentDidMount(): void {
        if (this.outer && this.state.contentHeight === 0) {
            this.setState({
                contentHeight: this.outer.clientHeight,
            })
        }
        if (this.wrapper) {
            const topPadding = this.wrapper.offsetTop
            const seq = [
                E_ROOMS_NAMES.Intro,
                E_ROOMS_NAMES.Services,
                E_ROOMS_NAMES.Portfolio,
                E_ROOMS_NAMES.Contacts,
            ]
            this.wrapper.addEventListener("scroll", this.onScroll(seq, topPadding))
        }
    }

    public componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
        if (nextProps.rooms.activeRoom !== this.props.rooms.activeRoom && this.wrapper) {
            this.scrolling = true
            this.wrapper.style.overflowY = "hidden"
            this.scrollTo(nextProps.rooms.activeRoom)
        }
    }

    private setActiveRoom = (roomName: E_ROOMS_NAMES) => {
        this.props.dispatch({
            type: "rooms/setActiveRoom",
            payload: roomName,
        })
    }

    private scrollTo = (roomName: E_ROOMS_NAMES) => {
        if (!this.wrapper) {
            return
        }

        const roomEl = this.rooms[roomName]

        if (roomEl) {
            this.wrapper.scrollTo({
                behavior: "smooth",
                left: 0,
                top: roomEl.offsetTop - this.wrapper.offsetTop,
            })
        }
    }

    private openChest = (type: E_CHESTS_TYPES) => {
        this.setState({
            chestsOpened: {
                ...this.state.chestsOpened,
                [type]: true,
            },
        })
    }

    private onScroll = (seq: string[], topPadding: number) => () => {
        if (this.scrolling) {
            if (this.scrollStoppedTimeoutId) {
                clearTimeout(this.scrollStoppedTimeoutId)
            }
            this.scrollStoppedTimeoutId = setTimeout(() => {
                if (this.wrapper) {
                    this.wrapper.style.overflowY = ""
                }
                this.scrolling = false
            }, 100)
        } else if (this.wrapper) {
            const activeRoomI = seq.indexOf(this.props.rooms.activeRoom)
            const scrollTop = this.wrapper.scrollTop
            const scrollTopWithBottom = scrollTop + this.wrapper.clientHeight
            const nextRoomName = seq[activeRoomI + 1]
            const nextRoom: HTMLDivElement | null = this.rooms[nextRoomName]
            const prevRoomName = seq[activeRoomI - 1]
            const prevRoom: HTMLDivElement | null = this.rooms[prevRoomName]
            if (
                this.prevScrollTop < scrollTop
                &&
                nextRoom
                &&
                scrollTopWithBottom > nextRoom.offsetTop - topPadding + 50
            ) {
                this.wrapper.style.overflowY = "hidden"
                this.scrolling = true

                this.setActiveRoom(nextRoomName)
            } else if (
                this.prevScrollTop > scrollTop
                &&
                prevRoom
                &&
                scrollTop < prevRoom.offsetTop - topPadding + prevRoom.clientHeight - 50
            ) {
                this.wrapper.style.overflowY = "hidden"
                this.scrolling = true

                this.setActiveRoom(prevRoomName)
            }
            this.prevScrollTop = scrollTop
        }
    }

    private setIsGame = () => {
        this.props.dispatch({
            type: "config/setIsGame",
            payload: true,
        })
    }

    public render() {
        const {
            contentHeight,
            chestsOpened,
        } = this.state

        return (
            <div ref={ (ref) => this.outer = ref } className={ cx("outer") }>
                <div ref={ (ref) => this.wrapper = ref } className={ cx("wrapper") }>
                    <div className={ cx("content") }>
                        <div
                            style={{minHeight: contentHeight}}
                            ref={ (ref) => this.rooms[E_ROOMS_NAMES.Intro] = ref }
                            className={ cx("container", "first", "introContainer") }
                        >
                            <h1 className={ cx("title", "bordered") }>Hi, my name is</h1>
                            <h1 className={ cx("title", "bordered") }>David Shekunts</h1>
                            <h2 className={ cx("subtitle", "bordered") }>I'm fullstack web developer</h2>
                            <h3 className={ cx("subtitle2", "bordered") }>(Freelancer)</h3>
                            <div className={ cx("ctrl") }>
                                <a
                                    target="_blank"
                                    href="https://docs.google.com/document/d/1oRlYkKEH-9g2wk6Aiiu_-K1tYsw7BHF3OeuCPhi_Aes/edit#heading=h.sgsvqiccdupn">
                                    <Button style={{marginRight: 15}} text="GO TO TEXT VERSION"/>
                                </a>
                                <Button text="GO TO GAME VERSION" onClick={ this.setIsGame }/>
                            </div>
                        </div>
                        <div
                            ref={ (ref) => this.rooms[E_ROOMS_NAMES.Services] = ref }
                            className={ cx("container", "servicesContainer") }
                        >
                            <h1 className={ cx("title2", "bordered") }>Services</h1>
                            <h2 className={ cx("subtitle", "bordered") }>I can offer you</h2>
                            <div className={ cx("services") }>
                                <div
                                    className={ cx("item", "frontend", {
                                        opened: chestsOpened[E_CHESTS_TYPES.FRONTEND],
                                    }) }>
                                    <img
                                        onClick={ () => this.openChest(E_CHESTS_TYPES.FRONTEND) }
                                        className={ cx("image") }
                                        src={ chest }
                                        alt=""/>
                                    <div className={ cx("desc-wr") }>
                                        <div className={ cx("desc") }>
                                            <div className={ cx("name") }>
                                                Frontend
                                            </div>
                                            <div className={ cx("subname") }>
                                                React, Redux
                                            </div>
                                            <div className={ cx("info") }>
                                                and  everything including modern stack
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={ cx("item", "backend", {
                                    opened: chestsOpened[E_CHESTS_TYPES.BACKEND],
                                }) }>
                                    <img
                                        onClick={ () => this.openChest(E_CHESTS_TYPES.BACKEND) }
                                        className={ cx("image") }
                                        src={ chest }
                                        alt=""/>
                                    <div className={ cx("desc-wr") }>
                                        <div className={ cx("desc") }>
                                            <div className={ cx("name") }>
                                                Backend
                                            </div>
                                            <div className={ cx("subname") }>
                                                NodeJS /Golang
                                                API's, microservices
                                            </div>
                                            <div className={ cx("info") }>
                                                everything needed for SPA backend
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={ cx("item", "outsource", {
                                    opened: chestsOpened[E_CHESTS_TYPES.OUTPM],
                                }) }>
                                    <img
                                        onClick={ () => this.openChest(E_CHESTS_TYPES.OUTPM) }
                                        className={ cx("image") }
                                        src={ chest }
                                        alt=""/>
                                    <div className={ cx("desc-wr") }>
                                        <div className={ cx("desc") }>
                                            <div className={ cx("name") }>
                                                Outsource PM
                                            </div>
                                            <div className={ cx("subname") }>
                                                Write TechSpec
                                                Assemble Team
                                                Lead the Project
                                            </div>
                                            <div className={ cx("info") }>
                                                like outsource CTO
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            ref={ (ref) => this.rooms[E_ROOMS_NAMES.Portfolio] = ref }
                            style={{minHeight: contentHeight * 2}}
                            className={ cx("container", "portfolio") }
                        >
                            <h1 className={ cx("title2", "bordered") }>Projects</h1>
                            <h2 className={ cx("subtitle", "bordered") }>What have I done...</h2>
                            <div className={ cx("projects") }>
                                <h1 style={{marginBottom: 15}} className={ cx("subtitle", "bordered") }>
                                    comming soon
                                </h1>
                                <a
                                    target="_blank"
                                    href="https://docs.google.com/document/d/1oRlYkKEH-9g2wk6Aiiu_-K1tYsw7BHF3OeuCPhi_Aes/edit#heading=h.sgsvqiccdupn">
                                    <Button text="GO TO TEXT VERSION"/>
                                </a>
                            </div>
                        </div>
                        <div
                            ref={ (ref) => this.rooms[E_ROOMS_NAMES.Contacts] = ref }
                            style={{minHeight: contentHeight}}
                            className={ cx("container", "second") }>
                            <h1 className={ cx("title2", "bordered") }>Contacts</h1>
                            <h2 className={ cx("subtitle", "bordered") }>Just call me maybe</h2>
                            <div className={ cx("contacts") }>
                                <div className={ cx("item") }>
                                    <img className={ cx("image") } src={ chest } alt=""/>
                                    <div className={ cx("desc") }>
                                        <div style={{marginRight: 71}} className={ cx("name") }>
                                            Email
                                        </div>
                                        <a className={ cx("link") }>
                                            ditreyw@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className={ cx("item") }>
                                    <img className={ cx("image") } src={ chest } alt=""/>
                                    <div className={ cx("desc") }>
                                        <div style={{marginRight: 30}} className={ cx("name") }>
                                            Facebook
                                        </div>
                                        <a
                                            href={"https://www.facebook.com/davidshekunts"}
                                            target={"_blank"}
                                            className={ cx("link") }
                                        >
                                            @davidshekunts
                                        </a>
                                    </div>
                                </div>
                                <div className={ cx("item") }>
                                    <img className={ cx("image") } src={ chest } alt=""/>
                                    <div className={ cx("desc") }>
                                        <div style={{marginRight: 49}} className={ cx("name") }>
                                            LinkedIn
                                        </div>
                                        <a className={ cx("link") }>
                                            @davidshekunts
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<ProjectModal closeModal={ () => {} }/>*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(({ rooms }: IAppState) => {
    return {
        rooms,
    }
})(MainDesktop)