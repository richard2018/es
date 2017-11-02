import React, { Component } from 'react';

const simpleHoc = (WrappedComponent) => {
  console.log('simpleHoc');
  return class extends Component {
    render() {
        console.info('enhance....');
      return <WrappedComponent {...this.props}/>
    }
  }
}
export default simpleHoc;