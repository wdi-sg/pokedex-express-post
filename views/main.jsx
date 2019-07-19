var React = require('react');

var Card = require('./components/card');
var Nav = require('./components/nav');

const bodyStyle = {
    backgroundColor: 'lightgray'
};
const divConStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
};




class Main extends React.Component {
  render() {

    console.log("im here")


    let monCards = this.props.pokemon.map(pokemon=>{

        return <Card name = {pokemon.name} num = {pokemon.num} img = {pokemon.img} />
    })


    return (
      <html>
      <head>
      </head>
      <body style={bodyStyle}>
      <Nav/>
      <div style={divConStyle} >
      {monCards}
      </div>
      </body>
      </html>
      );
}
}

module.exports = Main;