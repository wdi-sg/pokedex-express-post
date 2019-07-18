
var React = require('react');

class Form extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Edit Details of Pokemon</h1>
            <form method="POST" action={"/pokemon/" + this.props.index + "?_method=PUT"} >

                <p>Pokemon ID</p>
                <input name="id" defaultValue={this.props.pokemonData.id}/>

                <p>Pokemon Number</p>
                <input name="num" defaultValue={this.props.pokemonData.num}/>

                <p>Pokemon Name</p>
                <input name="name" defaultValue={this.props.pokemonData.name}/>

                <p>Image URL</p>
                <input name="imgURL" defaultValue={this.props.pokemonData.img}/>

                <p>Height (m)</p>
                <input name="height" defaultValue={this.props.pokemonData.height}/>

                <p>Weight (kg)</p>
                <input name="weight" defaultValue={this.props.pokemonData.weight}/>

                <br /> <br />
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}


module.exports = Form;