import React from "react"
import mainAtlasConfig from "assets/mainatlas.json"
import mainAtlasImage from "assets/mainatlas.png"

interface IProps {
    filename: string,
    width?: number,
    height?: number,
    onClick?: () => void,
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

    const { width, height, onClick } = props
    const { frame } = data
    const style = {
        width: frame.w,
        height: frame.h,
        background: `url(${mainAtlasImage}) -${frame.x}px -${frame.y}px no-repeat`,
        transform: "",
    }

    if (width && height) {
        style.transform = `scale(${width / frame.w}, ${height / frame.h})`
    }

    return (
        <div
            onClick={ onClick }
            style={ style }/>
    )
}

export default PhaserImage
