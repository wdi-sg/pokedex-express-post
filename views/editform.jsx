var React = require('react');

class Editform extends React.Component {
    render() {
        return (
            <html>
        <body>
          <div>
            <h1>Edit the details of {this.props.pokemon.name}</h1>
                <form method="POST" action="/pokemon">
                <h2>{this.props.pokemon.name} :<br/></h2>

              ID : <input type="number" name="id" value={this.props.pokemon.id} required/><br/>
              No. : <input type="number" name="num" value={this.props.pokemon.num} required/><br/>
              Name : <input type="text" name="name" value={this.props.pokemon.name} required/><br/>
              Image URL : <input type="text" name="img" value={this.props.pokemon.img} required/><br/>
              Height : <input type="string" name="height" value={this.props.pokemon.height} required/><br/>
              Weight : <input type="string" name="weight" value={this.props.pokemon.weight} required/><br/>
              <input type="submit" value="Submit"/>
            </form>
            <img src = {this.props.pokemon.img}></img>
          </div>
        </body>
      </html>
        );
    }
}

module.exports = Editform;