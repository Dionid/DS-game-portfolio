import React from 'react';
import * as ReactDOM from 'react-dom';

interface IProps {
    compiler: string,
    framework: string,
    bundler: string
}


class Hello extends React.Component<IProps, {}> {
    render() {
        return <h1>This is a {this.props.framework} application using    {this.props.compiler} with {this.props.bundler}</h1>
    }
}


ReactDOM.render(<Hello compiler="Typescript" framework="React" bundler="Webpack" />, document.getElementById('root'));