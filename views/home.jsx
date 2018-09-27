var React = require('react');

class Home extends React.Component {
  render() {


    // let message = "welcome!";

    //    const pokeName = this.props.pokemon.map(item => {
    //        return item.name;
    //     });

    //    const pokeId = this.props.pokemon.map(item => {
    //       return item.id;
    //    });

    //    const pokeHeight = this.props.pokemon.map(item => {
    //       return item.height;
    //    })
    // console.log("THIS PROPS:",this.props);

        let actionUrl = '/pokemon/'+ this.props["0"];
        const pokeName = this.props["0"].charAt(0).toUpperCase() + this.props["0"].substr(1);

    return (

      <div>
        <h1>Poke Customising for {pokeName}</h1>
        <p>Fill in the following fields:</p>
        <form method="POST" action={actionUrl}>
          <label>Name:&nbsp</label>
          <input name="name" placeholder='Type in name'/> <br />
          <label>ID:&nbsp</label>
          <input name="ID" placeholder='Type in ID' /><br />
          <label>Height:&nbsp</label>
          <input name="height" placeholder='Type in height' />
          <input type="submit" />
        </form>
      </div>
    );
  }
};

module.exports = Home;
