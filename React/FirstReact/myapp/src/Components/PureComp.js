import React, { Component } from 'react'

class PureComp extends Component {
      render() {
            return (
                  <div>
                        I'm the pure Component {this.props.name}
                  </div>
            )
      }
}

export default PureComp