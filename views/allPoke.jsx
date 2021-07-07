var React = require('react');
class allPoke extends React.Component {
  render() {

    var everything = this.props.pokemon.map(x=>{
        var num = x.num;
        var name = x.name;
        var img = x.img;
        return <div><h2>{num}</h2><h2>{name}</h2><img src={img} style={{width: 15 + '%'}}/></div>
    })




    return (
      <html>
        <body>
          <div>
          <h1>This Is All The Pokemon In Your Pokedex!</h1>
          {everything}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = allPoke;