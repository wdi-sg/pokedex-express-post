var React = require('react');

const cardStyle = {
  backgroundColor: 'darkgray',
    display: 'inline-block',
    margin: '5px',

  flexFlow: 'column nowrap',
  width: '200px',
  height: '250px',
  border: '10px double snow',
  borderRadius: '25px',
  textAlign: 'center',
  // fontWeight: 'bold',
  // fontFamily: 'Arial, Helvetica, sans-serif'
};
const imgConStyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '190px',
  height: '190px',
  border: '5px double snow',
  borderRadius: '25px'
};
const imgStyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '175px',
  height: '175px'
};

const numStyle = {
  margin: '0 auto 10px auto',
  padding: '10px 20px 5px 20px',
  display: 'inline-block',
  fontWeight: 'bold',
  fontSize: '25px',
  borderRight: '5px double snow',
  borderLeft: '5px double snow',
  borderBottom: '5px double snow',
  borderRadius: '25px'
};

class Card extends React.Component {
  render() {

    var url = "/pokemon/"+this.props.name;


    return (
        <div style={cardStyle} >
            <p style={numStyle}>#{this.props.num}</p>
            <div style={imgConStyle}>
                <a href={url}>
                  <img src={this.props.img} style={imgStyle}></img>
                </a>
            </div>
        </div>
      );
  }
}

module.exports = Card;