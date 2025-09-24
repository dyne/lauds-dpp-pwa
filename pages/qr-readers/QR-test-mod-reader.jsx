// Test of QR code reader available at https://github.com/KhaosArbiter/modern-react-qr-reader
import React, { Component } from 'react'
import { Block, Button, List, ListInput, Navbar, NavbarBackLink, Page, Preloader } from 'konsta/react';
import QrReader from 'modern-react-qr-reader'

class Test extends Component {
  constructor(props) {
        super(props);

        this.state = {
            result: 'No result'
        }

        this.handleError = this.handleError.bind(this);
        this.handleScan = this.handleScan.bind(this);
    }

  handleScan = data => {
    if (data) {
      this.state.result = data;
        console.log(this.state.result);
        this.setState({result: data});
    }
  }
  
  handleError = err => {
    console.error(err)
  }
  
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          facingMode={"environment"}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '10%' }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

var mytest = new Test();
export default function Testmod(){

  return (
    <Page>
      {mytest.render()}
    </Page>
  );
};