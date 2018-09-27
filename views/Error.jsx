import React from 'react';

class Error extends React.Component {
  render() {
    return (
      <div>
        {this.props.message}
      </div>
    );
  }
}

export default Error;
