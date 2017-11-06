import {Component} from "React";

export const Enhance = (ComposedComponent) => class extends Component {
    constructor() {
        super();
        this.setState({data: null});
    }
    componentDidMount() {

    }
    render() {
        return <ComposedComponent {...this.props} data = {this.state.data} />
    }
}