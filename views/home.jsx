var React = require('react');

class Home extends React.Component {
  render() {

    let message = "welcome!";

    if( name.length > 5 ){
      messgae = "welcome! What a long name you have!";
    }

    return (
      <div>
        <h1>Hello,!</h1>
        <h1>{ message }</h1>
      </div>
    );
  }
}

module.exports = Home;
