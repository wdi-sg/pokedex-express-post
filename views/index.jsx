const React = require('react');
const ReactDom = 'react-dom';

class Index extends React.Component {
  render() {
    let list = this.props.pokedex.map(poke => {
      return (
      <ul>
        <li>id: {poke.id}</li>
        <li>name : {poke.name}</li>
        <li>num : {poke.num}</li> 
        <img src={poke.img}></img>
        <li>height: {poke.height}</li>
        <li>weight: {poke.weight}</li>
      </ul>
      );
    })
    return(
      <html>
        <body>
          <h1>Index</h1>
            {list}

        </body>
      </html>
    );
  }
}

module.exports = Index;