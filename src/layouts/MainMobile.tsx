import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./MainMobile.scss"
import classnamesBind from "classnames/bind"
import chest from "assets/images/playerAvatar.png"
import Button from "components/Button/Button"
import ChestImg from "components/ChestImg/ChestImg"

const cx = classnamesBind.bind(styles)

interface IProps {
    dispatch: Dispatch<Action>,
}

interface IState {
    tooltipOpened: boolean
}

class MainMobile extends React.Component<IProps, IState> {

    public state = {
        tooltipOpened: false,
    }

    private closeTooltip = () => {
        this.setState({
            tooltipOpened: false,
        })
    }

    public render() {
        const { tooltipOpened } = this.state

        return (
            <div className={ cx("wrapper") }>
                <div className={ cx("container", "first", "mainSec") }>
                    <h1 className={ cx("title", "bordered") }>Hi, my name is</h1>
                    <h1 className={ cx("title", "bordered") }>David Shekunts</h1>
                    <h2 className={ cx("subtitle", "bordered") }>I'm fullstack web developer</h2>
                    {/*<h3 className={ cx("subtitle2", "bordered") }>(Freelancer)</h3>*/}
                    <div className={ cx("ctrl") }>
                        <Button text="GO TO PDF VERSION"/>
                    </div>
                </div>
                <div className={ cx("container", "second") }>
                    <h1 className={ cx("title", "bordered") }>Services</h1>
                    <h2 className={ cx("subtitle", "bordered") }>I offer you</h2>
                    <div className={ cx("services") }>
                        <div className={ cx("item", "frontend") }>
                            <ChestImg
                                opened={ true }
                                weaponImg={ "katana" }
                                name={ "Frontend" }
                                subname={ "React, Redux" }
                                info={ "and everything including modern stack" }
                                itemClassName={ "frontend" }
                            />
                        </div>
                        <div className={ cx("item", "backend") }>
                            <ChestImg
                                opened={ true }
                                weaponImg={ "energy" }
                                name={ "Backend" }
                                subname={ "NodeJS /Golang\n" +
                                "API's, microservices" }
                                info={ "everything needed for SPA backend" }
                                itemClassName={ "backend" }
                            />
                        </div>
                        <div className={ cx("item", "outsource") }>
                            <ChestImg
                                opened={ true }
                                weaponImg={ "opm" }
                                name={ "Outsource PM" }
                                subname={ "Write TechSpec\n" +
                                "Assemble Team\n" +
                                "Lead the Project" }
                                info={ "like outsource CTO" }
                                itemClassName={ "outsource" }
                            />
                        </div>
                        {/*<div className={ cx("item") }>
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
                        <div className={ cx("item") }>
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
                        </div>*/}
                    </div>
                </div>
                <div className={ cx("container", "second") }>
                    <h1 className={ cx("title", "bordered") }>Projects</h1>
                    <h2 className={ cx("subtitle", "bordered") }>What have I done...</h2>
                    <div className={ cx("projects") }>
                        <h1 style={{marginBottom: 15}} className={ cx("subtitle", "bordered") }>comming soon</h1>
                        <Button text="GO TO PDF VERSION"/>
                    </div>
                </div>
                <div className={ cx("container", "second") }>
                    <h1 className={ cx("title", "bordered") }>Contacts</h1>
                    <h2 className={ cx("subtitle", "bordered") }>Just call me maybe</h2>
                    <div className={ cx("contacts") }>
                        <div className={ cx("item") }>
                            <img className={ cx("image") } src={ chest } alt=""/>
                            <div className={ cx("desc") }>
                                <div className={ cx("name") }>
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
                                <div className={ cx("name") }>
                                    Facebook
                                </div>
                                <a className={ cx("link") }>
                                    @davidshekunts
                                </a>
                            </div>
                        </div>
                        <div className={ cx("item") }>
                            <img className={ cx("image") } src={ chest } alt=""/>
                            <div className={ cx("desc") }>
                                <div className={ cx("name") }>
                                    LinkedIn
                                </div>
                                <a className={ cx("link") }>
                                    @davidshekunts
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={ cx("tooltip-wr", tooltipOpened && "shown") }>
                    <div className={ cx("tooltip") }>
                        <div className={ cx("close-btn") } onClick={ this.closeTooltip }>
                            x
                        </div>
                        <h2 className={ cx("subtitle2", "bordered") }>
                            To get full experience from this site visit desktop version
                            (because it's not just portfolio, it's a online game)
                        </h2>
                    </div>
                </div>
                {/*<ProjectModal closeModal={ () => {} }/>*/}
            </div>
        )
    }
}

export default connect(({}: IAppState) => {
    return {}
})(MainMobile)
