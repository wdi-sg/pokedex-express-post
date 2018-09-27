var React = require('react');

class Eachpoke extends React.Component {
  render() {


       const pokeName = this.props.pokemon.map(item => {
           return item.name;
        });

       const pokePic = this.props.pokemon.map(item => {
         return item.img;
       })

       const pokeId = this.props.pokemon.map(item => {
          return item.id;
       });

       const pokeHeight = this.props.pokemon.map(item => {
          return item.height;
       })
    console.log("THIS PROPS:",this.props.params.redirectParam);


    return (

      <div>
        <p>{pokeName}</p>
      </div>
    );
  }
};

module.exports = Eachpoke;