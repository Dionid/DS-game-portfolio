import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import {ICountState} from "models/count"

interface IProps {
    compiler: string,
    framework: string,
    bundler: string,
    count: ICountState,
    dispatch: Dispatch<Action>,
}

class HelloC extends React.Component<IProps, {}> {

    private add = () => {
        console.log("BEFORE")
        this.props.dispatch({ type: "count/addEffect" })
        console.log("AFTER")
    }

    public render() {
        return (
            <h1 onClick={ this.add }>
                {+this.props.count.value}
                <br/>
                This is a {this.props.framework} application using {this.props.compiler} with {this.props.bundler}
            </h1>
        )
    }
}

export default connect(({count}: IAppState) => {
    return {
        count,
    }
})(HelloC)
