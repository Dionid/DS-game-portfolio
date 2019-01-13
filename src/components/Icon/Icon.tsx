import React, { Component } from "react"
import cn from "classnames"
import styles from "./Icon.scss"

interface IProps {
    name: string,
    size: number[],
    className?: string
}

class Icon extends Component<IProps, {}> {

    private useEl: SVGUseElement | null = null

    public componentDidMount() {
        // let baseUrl = window.location.href.replace(window.location.hash, "")
        // this.useEl.setAttribute("xlink:href", baseUrl + this.useEl.getAttribute("xlink:href"))
    }

    public render() {
        const { name, size, className, ...rest } = this.props

        if (!name) {
            return null
        }

        const cns = cn(`${styles.icon}`, className)

        const style = size
            ? { width: size[0], height: size[1], lineHeight: size[1] }
            : {}

        const i = require(`assets/icons/${name}.svg`).default
        const baseUrl = window.location.href.replace(window.location.hash, "")

        return (
            <span { ...rest } className={ cns } style={ style }>
                <svg className={ styles.svg }>
                    <use ref={ (el) => {
                        this.useEl = el
                    } } xlinkHref={ `#${i.id}` }/>
                </svg>
            </span>
        )
    }
}

export default Icon
