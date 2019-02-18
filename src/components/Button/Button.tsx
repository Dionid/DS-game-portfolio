import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./Button.scss"
import classnamesBind from "classnames/bind"

const cx = classnamesBind.bind(styles)

interface IProps {
    text: string,
    onClick?: () => void,
    style?: {[key: string]: any},
}

const Button = (props: IProps) => {
    return (
        <div onClick={ props.onClick } style={ props.style } className={ cx("button", "pulse") }>
            <div className={ cx("text") }>
                { props.text }
            </div>
        </div>
    )
}

export default Button