var React = require('react');

var Form = require('./components/newform');
var Nav = require('./components/nav');

const bodyStyle = {
    backgroundColor: 'lightgray'
};
const divConStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
};




class New extends React.Component {
  render() {

    console.log("im here")


    return (
      <html>
      <head>
      </head>
      <body style={bodyStyle}>
      <Nav/>
      <div style={divConStyle} >
      <Form/>
      </div>
      </body>
      </html>
      );
}
}

module.exports = New;