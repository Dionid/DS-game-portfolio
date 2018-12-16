import dva from "dva"
import React from "react"

interface IProps {
    compiler: string,
    framework: string,
    bundler: string,
}

class Hello extends React.Component<IProps, {}> {
    public render() {
        return (
            <h1>
                This is a {this.props.framework} application using    {this.props.compiler} with {this.props.bundler}
            </h1>
        )
    }
}

const app = dva()

app.router(() => <Hello compiler="Typescript DVA" framework="React" bundler="Webpack" />)

app.start("#root")
