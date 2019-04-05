var React = require('react');

class Delete extends React.Component {

  render() {

    const pokemonRequested = this.props.pokemon;
    const id = pokemonRequested["id"];
    const name = pokemonRequested["name"];

    const idInputTag = <div>ID: {id}</div>;
    const nameInputTag = <div>Pokemon: {name}</div>;


    let formAttribute = `/pokemon/${id}?_method=DELETE`;

    return (
        <html>
            <body>
                <h1>Delete Pokemon</h1>
                <form method="POST" action={formAttribute}>
                    {idInputTag}
                    {nameInputTag}
                    <p>Delete this Pokemon?</p>
                    <button type="submit" value="delete">Yes</button>
                </form>
            </body>
        </html>
    );
  }


}

module.exports = Delete;