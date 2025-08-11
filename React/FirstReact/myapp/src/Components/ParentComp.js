import React, { Component } from 'react';
import PureComp from './PureComp';
import RegComp from './RegComp';

class ParentComp extends Component {
      constructor(props) {
            super(props)

            this.state = {
                  name: "Badu9"
            }
      }
      componentDidMount() {
            setInterval(() => {
                  this.setState({
                        name: 'Badu9'
                  })
            }, 3000)
      }
      render() {
            return (
                  <div>
                        I'm the ParentComp
                        <RegComp name={this.state.name} />
                        <PureComp name={this.state.name} />
                  </div>

            )
      }
}

export default ParentComp