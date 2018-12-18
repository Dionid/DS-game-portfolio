import {Action, Dispatch} from "redux"
import React, {RefObject} from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./PhaserGame.scss"
import classnamesBind from "classnames/bind"
import {createGameConfig, Game, gameConfig} from "game"

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

    private createGame = (): void => {
        if (this.gameEl && this.gameEl.current) {
            console.log(this.gameEl.current.clientWidth, this.gameEl.current.clientHeight)
            if (this.gameEl.current.clientHeight === 0) {
                setTimeout(this.createGame, 1000)
                return
            }
            console.log(this.gameEl.current.clientWidth, this.gameEl.current.clientHeight)
            this.game = new Game(createGameConfig({
                width: this.gameEl.current.clientWidth,
                height: this.gameEl.current.clientHeight,
            }))
        }
    }

    public componentDidMount(): void {
        setTimeout(this.createGame, 1000)
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
