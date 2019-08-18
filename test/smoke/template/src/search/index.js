"use strict"

import React from 'react';
import ReactDOM from 'react-dom';

import { common } from '../../common';
import logo from './img/logo.png';
import './css/search.less';

class Search extends React.Component {

  constructor() {
    super(...arguments);

    this.state = {
      Text: null
    }
  }

  loadComponent() {
    import('./test.js').then((Text) => {
      console.log(Text);
      this.setState({
        Text: Text.default
      })
    })
  }

  render() {
    const { Text } = this.state;
    // debugger
    return <div className='text_size'>
      { Text ? <Text /> : null }
      Search Text
      <img src={ logo } onClick={ this.loadComponent.bind(this) }></img>
      <div>{{common}}</div>
      </div>;
  }
}

ReactDOM.render (<Search />, document.getElementById('root'))