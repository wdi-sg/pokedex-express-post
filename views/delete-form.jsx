var React = require('react');
var Header = require('./components/header');
var PokemonThumbnail = require('./components/pokemon-thumbnail');

class DeleteForm extends React.Component {
	render() {
		let pokemon = this.props.pokemon;
		let formLink = "/pokemon/"+pokemon.id+"?_method=DELETE";
		let backLink = "/pokemon/"+pokemon.id;
		return (
			<html>
			<head>
				<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
				      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
				      crossOrigin="anonymous"/>
				<link rel="stylesheet" type="text/css" href="../../css/style.css"/>
			</head>
			<body>
				<div className="container">
					<Header/>
					<div className="row">
						<div className="col-12">
							<h2>Delete Pokemon</h2>
							<div className="alert alert-danger text-center" role="alert">
								Are you sure you want to delete the following Pokemon? :(
							</div>
						</div>
						<div className="col-12 d-flex justify-content-center">
							<PokemonThumbnail pokemon={pokemon}/>
						</div>
						<div className="col-12">
							<form method="POST" action={formLink}>
								<input name="name" placeholder="name" type="hidden" value={pokemon.name} required/><br/>
								<div className="row buttons">
									<div className="col-4 offset-4">
										<a href={backLink} className="btn btn-secondary">Return</a>
										<button type="submit" className="btn btn-dark">Confirm Delete</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</body>
			</html>
		);
	}
}

module.exports = DeleteForm;