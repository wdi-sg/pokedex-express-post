var React = require('react');

var Card = require('./components/card');

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
      <div style={divConStyle} >
      {monCards}
      </div>
      </body>
      </html>
      );
}
}

module.exports = Main;