var React = require('react');

class Delete extends React.Component {
  render() {
    // const pokemonLis = this.props.map((pokemon) => {
    //     return <List data={pokemon}/>
    // })

    return (
      <html>
        <body>
          <div>
            <h1>It's working!</h1>
            <h2>Delete target: {this.props.name}</h2>
            <p>{this.props.weight}</p>
          </div>
        </body>
      </html>
    );
  }
}
// ?_method=PUT
module.exports = Delete;