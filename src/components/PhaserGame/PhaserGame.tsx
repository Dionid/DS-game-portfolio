import {Action, Dispatch} from "redux"
import React, {RefObject} from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./PhaserGame.scss"
import classnamesBind from "classnames/bind"
import {Game, gameConfig} from "game"

const cx = classnamesBind.bind(styles)

interface IProps {
    dispatch: Dispatch<Action>,
}

interface IState {

}

class PhaserGame extends React.Component<IProps, IState> {

    private gameEl: RefObject<HTMLDivElement> = React.createRef()
    private game?: Game = undefined

    public shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        return false;
    }

    public componentDidMount(): void {
        this.game = new Game(gameConfig)
    }

    public render() {
        return (
            <div ref={ this.gameEl } id="game"></div>
        )
    }
}

export default connect(({}: IAppState) => {
    return {}
})(PhaserGame)
