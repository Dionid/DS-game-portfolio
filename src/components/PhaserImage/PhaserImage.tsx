import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
// import styles from "./PhaserImage.scss"
import classnamesBind from "classnames/bind"
import mainAtlasConfig from "assets/mainatlas.json"
import mainAtlasImage from "assets/mainatlas.png"

// const cx = classnamesBind.bind(styles)

interface IProps {
    filename: string,
    onClick: () => void,
}

interface IFrame {
    filename: string
}

const mainConf = mainAtlasConfig.textures[0]

const PhaserImage = (props: IProps) => {

    const data = mainConf.frames.filter((fr: IFrame) => fr.filename === props.filename)[0]

    if (!data) {
        return null
    }

    const { frame } = data

    return (
        <div
            onClick={ props.onClick }
            style={{
                width: frame.w,
                height: frame.h,
                background: `url(${mainAtlasImage}) -${frame.x}px -${frame.y}px no-repeat`,
            }}/>
    )
}

export default PhaserImage
