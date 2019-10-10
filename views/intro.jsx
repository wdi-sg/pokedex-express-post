var React = require('react');
var HomeNav = require('./navigation');

class Home extends React.Component {

render() {

    const commands = [
        "View All Pokemons",
        "Edit Pokemon",
        "Create Pokemon",
        "Delete Pokemon"
      ];

        return (
          <HomeNav items={commands}/>
        );
    }
}

module.exports = Home;