var React = require('react');

class Home extends React.Component {

  render() {

    let pokemonRequested = this.props;
    pokemonRequested = pokemonRequested.pokemon;
    const objectKeysArray = Object.keys(pokemonRequested);
    console.log(pokemonRequested);
    console.log(objectKeysArray);
    const arrayIndex = pokemonRequested.id;
    console.log("arrayIndex:"+arrayIndex);

    const inputArray = objectKeysArray.map(key => {
        return <li>{key}: <input type="text" name={key} value={pokemonRequested[key]}/></li>;
    });

    return (
        <html>
            <body>
                <form method="POST" action="/pokemon/arrayIndex">
                        {inputArray}
                    <input type="submit" value="Submit"/>
                </form>
            </body>
        </html>
    );
  }


}

module.exports = Home;