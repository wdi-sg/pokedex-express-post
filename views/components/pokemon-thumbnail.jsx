var React = require('react');

class PokemonThumbnail extends React.Component {
	render() {
		let link = "/pokemon/" + this.props.pokemon.id;
		return (
			<div className="col col-2">
				<a href={link}>
					<div className="card">
						<div className="card-header">{this.props.pokemon.id}. {this.props.pokemon.name}</div>
						<img src={this.props.pokemon.img} className="card-img-top" alt={this.props.pokemon.name}/>
					</div>
				</a>
			</div>
		);
	}
}

module.exports = PokemonThumbnail;