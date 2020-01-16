var React = require('react');
class PokemonByID extends React.Component {
render() {
return (
<html>
<body>


      <div>
        <h2 style={{color: 'green', width: "30%", textAlign: "center", margin: "80px auto 5px auto"}}>The Pokemon is: { this.props.name}</h2>
      </div>

          <div style={{textAlign: "center"}}><img src={ this.props.img } />
          </div>

     <div>
        <h4 style={{color: 'grey', width: "30%", textAlign: "center", margin: "10px auto 5px auto"}}>ID: { this.props.id}</h4>
      </div>

    <div>
        <h4 style={{color: 'grey', width: "30%", textAlign: "center", margin: "10px auto 5px auto"}}>Number: { this.props.num}</h4>
      </div>

        <div>
          <h4 style={{color: 'grey', width: "30%", textAlign: "center", margin: "10px auto 5px auto"}}>Height: {this.props.height}</h4>
          </div>

    <div>
        <h4 style={{color: 'grey', width: "30%", textAlign: "center", margin: "10px auto 5px auto"}}>Weight: {this.props.weight}</h4>
    </div>

</body>
</html>
);
}
}

module.exports = PokemonByID;