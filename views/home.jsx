var React = require('react');

class Home extends React.Component {
	render() {
		let pokemonList = this.props.pokedex.map(pokemon => {
			let link = "pokemon/" + pokemon.id;
			return <li><a href={link}>{pokemon.name}</a></li>
		});
		return (
			<html>
			<head>
				<link rel="stylesheet" type="text/css" href="css/style.css"/>
			</head>
			<body>
			<h2>List of Pokemon</h2>
			<form>
				<select name="sortby">
					<option disabled selected>Select an option</option>
					<option value="id">ID</option>
					<option value="name">Name</option>
					<option value="weight">Weight</option>
					<option value="height">Height</option>
				</select>
				<button>Sort by</button>
			</form>
			<a href="../pokemon/new">Add new Pokemon</a>
			<ul>
				{pokemonList}
			</ul>
			</body>
			</html>
		);
	}
}

module.exports = Home;