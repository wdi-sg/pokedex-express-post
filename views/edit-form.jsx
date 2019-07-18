var React = require('react');
var Header = require('./components/header');
var PokemonThumbnail = require('./components/pokemon-thumbnail');

class EditForm extends React.Component {
	render() {
		let pokemon = this.props.pokemon;
		let formLink = "/pokemon/"+pokemon.id+"?_method=PUT";
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
							<h2>Edit Pokemon</h2>
						</div>
						<div className="col-12 d-flex justify-content-center">
							<PokemonThumbnail pokemon={pokemon}/>
						</div>
						<div className="col-12">
							<form method="POST" action={formLink}>
								<div className="form-group row">
									<label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
									<div className="col-sm-10">
										<input name="name" className="form-control" value={pokemon.name} required/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="name" className="col-sm-2 col-form-label">Img</label>
									<div className="col-sm-10">
										<input name="img" className="form-control" value={pokemon.img} required/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="name" className="col-sm-2 col-form-label">Height (m)</label>
									<div className="col-sm-10">
										<input name="height" className="form-control" value={pokemon.height} required/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="name" className="col-sm-2 col-form-label">Weight (kg)</label>
									<div className="col-sm-10">
										<input name="weight" className="form-control" value={pokemon.weight} required/>
									</div>
								</div>
								<div className="row buttons">
									<div className="col-4 offset-4">
										<a href={backLink} className="btn btn-secondary">Return</a>
										<button type="submit" className="btn btn-dark">Submit</button>
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

module.exports = EditForm;