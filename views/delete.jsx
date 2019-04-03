var React = require('react');

class Home extends React.Component {
  render() {

    let actionAttribute = `/pokemon/${this.props.idKey}?_method=DELETE`;

    return (
        <body>
        <h1>DELETE pokemons</h1>
        <form method="POST" action={actionAttribute}>
        <div>Pokemon id: {this.props.recordKey.id}</div><br/>
        <div>Name: {this.props.recordKey.name}</div><br/>
        <img src={this.props.recordKey.img}/><br/>
        <div>Height: {this.props.recordKey.height}</div><br/>
        <div>Weight: {this.props.recordKey.weight}</div><br/>
        <input type="submit" value="Delete"/>
        </form>
        </body>
    );
  }
}

module.exports = Home;