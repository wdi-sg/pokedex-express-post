var React = require('react');
var Header = require('./components/header');

class Pokemon extends React.Component {

	render() {
		let pokemon = this.props.pokemon;
		let editLink = "../pokemon/"+this.props.pokemon.id+"/edit";
		let deleteLink = "../pokemon/"+this.props.pokemon.id+"/delete";
		let types = pokemon.type.map(type => {
			let link = "../pokemon/type/"+type.toLowerCase();
			return <li><a href={link}>{type}</a></li>
		});
		let weaknessess = pokemon.weaknesses.map(weaknesses => {
			let link = "../pokemon/weaknessess/"+weaknesses.toLowerCase();
			return <li><a href={link}>{weaknesses}</a></li>
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
							<h2>{pokemon.id}. {pokemon.name}</h2>
						</div>
						<div className="col-4 offset-4">
							<div className="card">
								<img src={pokemon.img} className="card-img-top" alt={pokemon.name}/>
								<div className="card-body">
									<p>Height: {pokemon.height}</p>
									<p>Weight: {pokemon.weight}</p>
									<p>Type:</p>
									<ul>{types}</ul>
									<p>Weaknessess:</p>
									<ul>{weaknessess}</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="row buttons">
						<div className="col-8 offset-2">
							<a href="/pokemon"><button className="view-btn btn btn-secondary">View all Pokemon</button></a>
							<a href={editLink}><button className="edit-btn btn btn-dark">Edit Pokemon</button></a>
							<a href={deleteLink}><button className="delete-btn btn btn-dark">Delete Pokemon</button></a>
						</div>
					</div>
				</div>
			</body>
			</html>
		);
	}
}

module.exports = Pokemon;