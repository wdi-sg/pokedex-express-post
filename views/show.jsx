var React = require('react');
class Show extends React.Component {
    render() {
        return (
            <html>

<body>
    <div>
        <h1>{this.props.pokemon.name}</h1>
        <p>
            ID : {this.props.pokemon.id}<br />
            No. : {this.props.pokemon.num}<br />
            Name : {this.props.pokemon.name}<br />
            Height : {this.props.pokemon.height}<br />
            Weight : {this.props.pokemon.weight}<br />
        </p>
        <img src={this.props.pokemon.img}></img>
    </div>
</body>

</html>
        );
    }
}
module.exports = Show;