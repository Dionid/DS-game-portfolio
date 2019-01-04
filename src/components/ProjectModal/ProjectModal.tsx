import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./ProjectModal.scss"
import classnamesBind from "classnames/bind"

const cx = classnamesBind.bind(styles)

interface IProps {
    dispatch: Dispatch<Action>,
    closeModal: () => void,
}

interface IState {

}

class ProjectModal extends React.Component<IProps, IState> {
    public render() {
        return (
            <div className={ cx("wrapper") }>
            	<div className={ cx("panel-wr") }>
            		<div className={ cx("panel") }>
            			<div className={ cx("panel-body") }>
                            <div className={ cx("window-wr") }>
                            	<div className={ cx("window") }>
                            		<div className={ cx("head") }>
                                        Prostor.exe
                                        <div className={ cx("close-btn") }>

                                        </div>
                            		</div>
                                    <div className={ cx("body") }>

                                    </div>
                            	</div>
                            </div>
                            <div onClick={ this.props.closeModal } className={ cx("close-btn-wr") }>
                                <div className={ cx("text") }>
                                	Close
                                </div>
                            	<div className={ cx("btn") }>

                            	</div>
                            </div>
            				<div className={ cx("content") }>
            					<div className={ cx("row") }>
                                    <div className={ cx("col-6") }>
                                        <div className={ cx("text-wr") }>
                                            <div className={ cx("text") }>
                                                <div className={ cx("title") }>
                                                    Prostor Telecom
                                                </div>
                                                <div className={ cx("paragraph") }>
                                                    <div className={ cx("p") }>
                                                        Client: <a href="https://ptl.ru" target="_blank">https://ptl.ru</a>
                                                    </div>
                                                    <div className={ cx("p") }>
                                                        Type: personal area SPA
                                                    </div>
                                                    <div className={ cx("p") }>
                                                        Task: SPA frontend
                                                    </div>
                                                    <div className={ cx("p") }>
                                                        Stack: React, Redux, Sass, Webpack
                                                    </div>
                                                    <div className={ cx("p") }>
                                                        Status: Done
                                                    </div>
                                                </div>
                                                <div className={ cx("special-link") }>
                                                    <a href="https://my.ptl.ru" target="_blank">
                                                        https://my.ptl.ru
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={ cx("col-6") }>
                                        <div className={ cx("image") }
                                             style={{backgroundImage: "url('assets/images/projects/prostor1.png')"}}/>
                                    </div>
            					</div>
                                <div className={ cx("row") }>
                                    <div className={ cx("col-6") }>
                                        <div className={ cx("image") }
                                             style={{backgroundImage: "url('assets/images/projects/prostor1.png')"}}/>
                                    </div>
                                    <div className={ cx("col-6", "center") }>
                                        <div className={ cx("list") }>
                                        	<div className={ cx("item") }>
                                                <div className={ cx("romb") }>
                                                    <div className={ cx("romb-inner") }/>
                                                </div>
                                                Money transactions
                                        	</div>
                                            <div className={ cx("item") }>
                                                <div className={ cx("romb") }>
                                                    <div className={ cx("romb-inner") }/>
                                                </div>
                                                Chat support
                                            </div>
                                            <div className={ cx("item") }>
                                                <div className={ cx("romb") }>
                                                    <div className={ cx("romb-inner") }/>
                                                </div>
                                                Multilayer tariff system
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={ cx("row") }>
                                	<div className={ cx("col-6", "center") }>
                                        <div className={ cx("list") }>
                                            <div className={ cx("item") }>
                                                <div className={ cx("romb") }>
                                                    <div className={ cx("romb-inner") }/>
                                                </div>
                                                Money transactions
                                            </div>
                                        </div>
                                	</div>
                                    <div className={ cx("col-6", "center") }>
                                        <div className={ cx("list") }>
                                            <div className={ cx("item") }>
                                                <div className={ cx("romb") }>
                                                    <div className={ cx("romb-inner") }/>
                                                </div>
                                                Money transactions
                                            </div>
                                        </div>
                                    </div>
                                </div>
            				</div>
            			</div>
            		</div>
            	</div>
            </div>
        )
    }
}

export default connect(({}: IAppState) => {
    return {}
})(ProjectModal)
