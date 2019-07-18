var React = require('react');

var IndiCard = require('./components/individual');
var Nav = require('./components/nav');
var EditButton = require('./components/editbutton');

const bodyStyle = {
    backgroundColor: 'lightgray'
};
const divConStyle = {
    height: '600px',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
};




class Single extends React.Component {
  render() {

    console.log("im here")
    return (
        <html>
            <head></head>
                <body style={bodyStyle}>
                    <Nav/>
                    <div style={divConStyle} >
                    <IndiCard name = {this.props.name} num = {this.props.num} img = {this.props.img} height = {this.props.height} weight = {this.props.weight}/>
                    <EditButton/>
                    </div>



                </body>
        </html>
      );
    }
}

module.exports = Single;