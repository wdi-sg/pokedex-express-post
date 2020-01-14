var React = require('react');
class PokemonByID extends React.Component {
render() {
return (
<html>
<body>
    <div style={{width: "30%", textAlign: "left", margin: "10px auto 5px auto"}}>ID: {this.props.id}</div>
    <div style={{width: "30%", textAlign: "left", margin: "10px auto 5px auto"}}>Number: {this.props.num}</div>
    <div style={{width: "30%", textAlign: "left", margin: "10px auto 5px auto"}}>Name: {this.props.name}</div>
    <div style={{width: "30%", textAlign: "left", margin: "10px auto 5px auto"}}>IMG: {this.props.img}</div>
    <div style={{width: "30%", textAlign: "left", margin: "10px auto 5px auto"}}>Height: {this.props.height}</div>
    <div style={{width: "30%", textAlign: "left", margin: "10px auto 5px auto"}}>Weight: {this.props.weight}</div>
</body>
</html>
);
}
}

module.exports = PokemonByID;