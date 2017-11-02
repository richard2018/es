import React, { Component } from 'react';
import simpleHoc from './simple-hoc';


@simpleHoc
export default class MyComponent extends Component {
  render() {
    console.log("aa : " + this.props, 'props');
    return (
      <div>
        MyComponent
      </div>
    )
  }
}