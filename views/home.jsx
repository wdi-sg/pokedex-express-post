var React = require('react');
var Header = require('./components/header');
var PokemonThumbnail = require('./components/pokemon-thumbnail');

class Home extends React.Component {
	render() {
		let sortby = '';
		if (this.props.sortby) {
			 sortby = `Sorted by ${this.props.sortby}`;
		}
		let pokemonList = this.props.pokedex.map(pokemon => {
			return (
				<PokemonThumbnail pokemon={pokemon}/>
			);
		});
		return (
			<html>
			<head>
				<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
				      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
				      crossOrigin="anonymous"/>
				<link rel="stylesheet" type="text/css" href="../css/style.css"/>
			</head>
			<body>
			<div className="container">
				<Header/>
				<div className="row">
					<div className="col-12">
						<h2>List of Pokemon</h2>
						<form>
							<div className="input-group">
								<select className="form-control"name="sortby">
									<option value="id">ID</option>
									<option value="name">Name</option>
									<option value="weight">Weight</option>
									<option value="height">Height</option>
								</select>
								<div className="input-group-append">
									<button className="btn btn-dark">Sort by</button>
								</div>
							</div>
						</form>
						<div className="d-flex justify-content-between align-items-center mt-3">
							<span>{sortby}</span>
							<a href="../pokemon/new" className="btn btn-secondary">Add new Pokemon</a>
						</div>
					</div>
				</div>
				<div className="row">
					{pokemonList}
				</div>
			</div>
			</body>
			</html>
		);
	}
}

module.exports = Home;