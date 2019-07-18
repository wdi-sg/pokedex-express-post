var React = require('react');

// const cardStyle = {
//   backgroundColor: 'darkgray',
//     display: 'inline-block',

//   flexFlow: 'column nowrap',
//   width: '200px',
//   height: '250px',
//   border: '10px double snow',
//   borderRadius: '25px',
//   textAlign: 'center',
//   // fontWeight: 'bold',
//   // fontFamily: 'Arial, Helvetica, sans-serif'
// };
// const imgConStyle = {
//   display: 'block',
//   marginLeft: 'auto',
//   marginRight: 'auto',
//   width: '175px',
//   height: '175px',
//   border: '5px double snow',
//   borderRadius: '25px'
// };
// const imgStyle = {
//   display: 'block',
//   marginLeft: 'auto',
//   marginRight: 'auto',
//   width: '150px',
//   height: '150px'
// };

// const numStyle = {
//   margin: '0 auto 10px auto',
//   padding: '10px 20px 5px 20px',
//   display: 'inline-block',

//   borderRight: '5px double snow',
//   borderLeft: '5px double snow',
//   borderBottom: '5px double snow',
//   borderRadius: '25px'
// };

class Card extends React.Component {
  render(){

    var url = "/pokemon/"+this.props.name;
    return (
        <div>
            <p>#{this.props.num}</p>
            <div>
                <a>
                  <img src={this.props.img}></img>
                </a>
            </div>
        </div>
      );
  }
}


module.exports = Card;