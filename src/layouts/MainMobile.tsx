import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./MainMobile.scss"
import classnamesBind from "classnames/bind"
import Button from "components/Button/Button"
import ChestImg from "components/ChestImg/ChestImg"
import PhaserImage from "components/PhaserImage/PhaserImage"

const cx = classnamesBind.bind(styles)

interface IProps {
    dispatch: Dispatch<Action>,
    CVLink: string,
}

interface IState {
    tooltipOpened: boolean
}

class MainMobile extends React.PureComponent<IProps, IState> {

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
        const { CVLink } = this.props

        return (
            <div className={ cx("wrapper") }>
                <div className={ cx("container", "first", "mainSec") }>
                    <h1 className={ cx("title", "bordered") }>Hi, my name is</h1>
                    <h1 className={ cx("title", "bordered") }>David Shekunts</h1>
                    <h2 className={ cx("subtitle", "bordered") }>I'm fullstack web developer</h2>
                    <h3 className={ cx("subtitle2", "bordered") }>(Freelance / Outsource)</h3>
                    <div className={ cx("ctrl") }>
                        <a
                            target="_blank"
                            href={ CVLink }>
                            <Button text="GO TO TEXT VERSION"/>
                        </a>
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
                    </div>
                </div>
                <div className={ cx("container", "second") }>
                    <h1 className={ cx("title", "bordered") }>Projects</h1>
                    <h2 className={ cx("subtitle", "bordered") }>What have I done...</h2>
                    <div className={ cx("projects") }>
                        <h1 style={{marginBottom: 15}} className={ cx("subtitle", "bordered") }>comming soon</h1>
                        <a
                            target="_blank"
                            href={ CVLink }>
                            <Button text="GO TO TEXT VERSION"/>
                        </a>
                    </div>
                </div>
                <div className={ cx("container", "second") }>
                    <h1 className={ cx("title", "bordered") }>Contacts</h1>
                    <h2 className={ cx("subtitle", "bordered") }>Just call me maybe</h2>
                    <div className={ cx("contacts") }>
                        <div className={ cx("item") }>
                            <div className={ cx("image") }>
                                <PhaserImage
                                    filename={ "objects/contacts/EmailIcon.psd" }/>
                            </div>
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
                            <div className={ cx("image") } style={{transform: `scale(0.75)`}}>
                                <PhaserImage
                                    filename={ "objects/contacts/FacebookIcon.psd" }/>
                            </div>
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
                            <div className={ cx("image") } style={{transform: `scale(0.75)`}}>
                                <PhaserImage
                                    filename={ "objects/contacts/LinkedInIcon.psd" }/>
                            </div>
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

export default connect(({ config }: IAppState) => {
    return {
        CVLink: config.CVLink,
    }
})(MainMobile)
