var React = require('react');

class Pokemon extends React.Component {

	render() {
		let pokemon = this.props.pokemon;
		let editLink = "../pokemon/"+pokemon.id+"/edit";
		let deleteLink = "../pokemon/"+pokemon.id+"/delete";

		return (
			<html>
			<head>
				<link rel="stylesheet" type="text/css" href="css/style.css"/>
			</head>
			<body>
				<h2>{pokemon.name}</h2>
				<img src={pokemon.img}/>
				<p>Height: {pokemon.height}</p>
				<p>Weight: {pokemon.weight}</p>
				<p><a href={editLink}>Edit Pokemon</a></p>
				<p><a href={deleteLink}>Delete Pokemon</a></p>
				<p><a href="/">View all Pokemon</a></p>
			</body>
			</html>
		);
	}
}

module.exports = Pokemon;