var React = require('react');

class Delete extends React.Component {
  render() {
    console.log("gonna delete this")
    // var url = "/pokemon";
    return (
      <html>
        <body>
          <div>
            <h1>Delete this pokemon</h1>
            <p>Pokemon: {this.props.deletedPokemon.name}</p>
            
            <form method="POST" action="/pokemon/'+pokemon.id+'?_method=DELETE">
                <p>Name</p>
               <input name="id" type ="hidden" value={this.props.deletedPokemon.name}/>
          
                <input type="submit" value = "delete this"/>
            </form>
            

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;