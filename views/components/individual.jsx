var React = require('react');

const cardStyle = {
  backgroundColor: 'darkgray',
  display: 'flex',
  margin: '25px',
  flexFlow: 'row nowrap',
  width: '800px',
  height: '700x',
  border: '10px double snow',
  borderRadius: '25px',
  textAlign: 'center',
  justifyContent: 'space-evenly',
  alignItems: 'center'
  // fontWeight: 'bold',
  // fontFamily: 'Arial, Helvetica, sans-serif'
};
const imgConStyle = {
  display: 'block',
  marginLeft: '20px',
  marginRight: 'auto',
  width: '250px',
  height: '275px',
  border: '5px double snow',
  borderRadius: '25px'
};
const dataConStyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '475px',
  height: '275px',
  border: '5px double snow',
  borderRadius: '25px',
justifyContent: 'space-evenly',
fontSize: '25px'
};
const imgStyle = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '200px',
  height: '200px'
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

class IndividualCard extends React.Component {
  render() {

    var url = "/pokemon/"+this.props.name;


    return (
        <div style={cardStyle} >

            <div style={imgConStyle}>
            <p style={numStyle}>#{this.props.num}</p>
                <a href={url}>
                  <img src={this.props.img} style={imgStyle}></img>
                </a>
            </div>
            <div style={dataConStyle}>
            <p >Name: {this.props.name}</p>
            <p >Number: {this.props.num}</p>
            <p >Height: {this.props.height}</p>
            <p >Weight: {this.props.weight}</p>
            </div>
        </div>
      );
  }
}

module.exports = IndividualCard;