var React = require('react');

class Home extends React.Component {

  render() {

    const pokemonRequested = this.props.pokemon;
    const objectKeysArray = Object.keys(pokemonRequested);
    const id = pokemonRequested.id;

    const inputArray = objectKeysArray.map(key => {
        return <div>{key}:&nbsp;<input type="text" name={key} value={pokemonRequested[key]} /><br></br></div>;
    });

    let formAttribute = `/pokemon/${id}?_method=PUT`;

    return (
        <html>
            <body>
                <h1>Edit Pokemon</h1>
                <form method="POST" action={formAttribute}>
                        {inputArray}
                    <input type="submit" value="submit"/>
                </form>
            </body>
        </html>
    );
  }


}

module.exports = Home;