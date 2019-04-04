var React = require('react');

class Pokedestroy extends React.Component {
  render() {
    return (
        <div>
          <h2 style={{color: 'red'}}> Destroy Pokemon</h2>
          <h2 style={{color: 'red'}}> Warning, this will permanently remove the pokemon from the records!</h2>
        </div>
    );
  }
}

module.exports = Pokedestroy;