import {Component} from "React";
export const Enhance = (ComposedComponent) => class extends Component {
    constructor() {
        this.state = {data: null}
    }

    componentDidMount() {
        this.setState({data: 'hello'});
    }

    render() {
        return <ComposedComponent {...this.props} data = {this.state.data} />;
    }
};