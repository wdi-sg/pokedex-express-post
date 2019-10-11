const React = require('react');

class Index extends React.Component {
  render() {
    let list = this.props.pokedex.map(poke => {
      return (
      <div>
        <p>id: {poke.id}</p>
        <p>name : {poke.name}</p>
        <p>num : {poke.num}</p> 
        <img src={poke.img}></img>
        <p>height: {poke.height}</p>
        <p>weight: {poke.weight}</p><br/><br/>
      </div>
      );
    })
    return ( 
      <html>
        <body>
          <marquee><h1>Index of all pokemon</h1></marquee>
          {list}
        </body>
      </html>
    );
  }
}

module.exports = Index;