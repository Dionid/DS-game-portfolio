import {Action, Dispatch} from "redux"
import React, {Ref, RefObject} from "react"
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

interface IState {
    contentHeight: number,
}

const IntroElName = Symbol(E_ROOMS_NAMES.Intro)
const ServicesElName = Symbol(E_ROOMS_NAMES.Services)
const PortfolioElName = Symbol(E_ROOMS_NAMES.Portfolio)
const ContactsElName = Symbol(E_ROOMS_NAMES.Contacts)

const eq = {
    [E_ROOMS_NAMES.Intro]: IntroElName,
    [E_ROOMS_NAMES.Services]: ServicesElName,
    [E_ROOMS_NAMES.Portfolio]: PortfolioElName,
    [E_ROOMS_NAMES.Contacts]: ContactsElName,
}

class MainDesktop extends React.Component<IProps, IState> {

    public state = {
        contentHeight: 0,
    }

    public componentDidMount(): void {
        if (this.outer && this.state.contentHeight === 0) {
            this.setState({
                contentHeight: this.outer.clientHeight,
            })
        }
        if (this.wrapper) {
            const topPadding = this.wrapper.offsetTop
            let seq = [
                IntroElName,
                ServicesElName,
                PortfolioElName,
                ContactsElName,
            ]
            console.log(topPadding)
            this.wrapper.addEventListener("scroll", this.onScroll(seq, topPadding))
        }
    }

    private scrolling = false

    public componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
        if (nextProps.rooms.activeRoom !== this.props.rooms.activeRoom) {
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
        this.wrapper.scrollTo({
            behavior: "smooth",
            left: 0,
            top: this[eq[roomName]].offsetTop - this.wrapper.offsetTop,
        })
        // setTimeout(() => {
        //     this.scrolling = false
        // }, 500)
    }

    private scrollStoppedTimeoutId!: NodeJS.Timeout
    private prevScrollTop: number = 0

    private onScroll = (seq: symbol[], topPadding: number) => () => {
        if (this.scrolling) {
            if (this.scrollStoppedTimeoutId) clearTimeout(this.scrollStoppedTimeoutId)
            this.scrollStoppedTimeoutId = setTimeout(() => {
                this.wrapper.style.overflowY = ""
                this.scrolling = false
            }, 100)
        } else if (this.wrapper) {
            const activeRoomI = seq.indexOf(eq[this.props.rooms.activeRoom])
            const scrollTop = this.wrapper.scrollTop
            const scrollTopWithBottom = scrollTop + this.wrapper.clientHeight
            const nextRoomName = seq[activeRoomI + 1]
            const nextRoom = this[nextRoomName]
            const prevRoomName = seq[activeRoomI - 1]
            const prevRoom: HTMLDivElement = this[prevRoomName]
            if (
                this.prevScrollTop < scrollTop
                &&
                nextRoom
                &&
                scrollTopWithBottom > nextRoom.offsetTop - topPadding + 50
            ) {
                this.wrapper.style.overflowY = "hidden"
                this.scrolling = true

                this.setActiveRoom(Object.keys(eq).find((key: E_ROOMS_NAMES) => eq[key] === nextRoomName))

                // this.wrapper.scrollTo({
                //     behavior: "smooth",
                //     left: 0,
                //     top: nextRoom.offsetTop - topPadding,
                // })
                // setTimeout(() => {
                //     scrolling = false
                // }, 500)
            } else if (
                this.prevScrollTop > scrollTop
                &&
                prevRoom
                &&
                scrollTop < prevRoom.offsetTop - topPadding + prevRoom.clientHeight - 50
            ) {
                // console.log(prevRoom.clientHeight)
                this.wrapper.style.overflowY = "hidden"
                this.scrolling = true

                this.setActiveRoom(Object.keys(eq).find((key: E_ROOMS_NAMES) => eq[key] === prevRoomName))

                // this.wrapper.scrollTo({
                //     behavior: "smooth",
                //     left: 0,
                //     top: prevRoom.offsetTop - topPadding,
                // })

                // setTimeout(() => {
                //     scrolling = false
                // }, 500)
            }
            this.prevScrollTop = scrollTop
        }
    }

    private outer: HTMLDivElement | null = null
    private wrapper: HTMLDivElement | null = null

    private [IntroElName]: HTMLDivElement | null = null
    private [ServicesElName]: HTMLDivElement | null = null
    private [PortfolioElName]: HTMLDivElement | null = null
    private [ContactsElName]: HTMLDivElement | null = null

    public render() {
        const { contentHeight } = this.state

        return (
            <div ref={ (ref) => this.outer = ref } className={ cx("outer") }>
                <div ref={ (ref) => this.wrapper = ref } className={ cx("wrapper") }>
                    <div className={ cx("content") }>
                        <div
                            style={{minHeight: contentHeight}}
                            ref={ (ref) => this[IntroElName] = ref }
                            className={ cx("container", "first") }
                        >
                            <h1 className={ cx("title", "bordered") }>Hi, my name is</h1>
                            <h1 className={ cx("title", "bordered") }>David Shekunts</h1>
                            <h2 className={ cx("subtitle", "bordered") }>I'm fullstack web developer</h2>
                            <h3 className={ cx("subtitle2", "bordered") }>(Freelancer)</h3>
                            <div style={{marginTop: 15}}>
                                <Button text="GO TO PDF VERSION"/>
                            </div>
                        </div>
                        <div
                            ref={ (ref) => this[ServicesElName] = ref }
                            className={ cx("container", "servicesContainer") }
                        >
                            <h1 className={ cx("title2", "bordered") }>Services</h1>
                            <h2 className={ cx("subtitle", "bordered") }>I offer you</h2>
                            <div className={ cx("services") }>
                                <div className={ cx("item", "frontend") }>
                                    <img className={ cx("image") } src={ chest } alt=""/>
                                    <div className={ cx("desc-wr") }>
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
                                <div className={ cx("item", "backend") }>
                                    <img className={ cx("image") } src={ chest } alt=""/>
                                    <div className={ cx("desc-wr") }>
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
                                <div className={ cx("item", "outsource") }>
                                    <img className={ cx("image") } src={ chest } alt=""/>
                                    <div className={ cx("desc-wr") }>
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
                        <div
                            ref={ (ref) => this[PortfolioElName] = ref }
                            style={{minHeight: contentHeight * 2}}
                            className={ cx("container", "portfolio") }
                        >
                            <h1 className={ cx("title2", "bordered") }>Projects</h1>
                            <h2 className={ cx("subtitle", "bordered") }>What have I done...</h2>
                            <div className={ cx("projects") }>
                                <h1 style={{marginBottom: 15}} className={ cx("subtitle", "bordered") }>
                                    comming soon
                                </h1>
                                <Button text="GO TO PDF VERSION"/>
                            </div>
                        </div>
                        <div ref={ (ref) => this[ContactsElName] = ref } style={{minHeight: contentHeight}} className={ cx("container", "second") }>
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
