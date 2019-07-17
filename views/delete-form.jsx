var React = require('react');

class DeleteForm extends React.Component {
	render() {
		let pokemon = this.props.pokemon;
		let formLink = "/pokemon/"+pokemon.id+"?_method=DELETE";
		let backLink = "/pokemon/"+pokemon.id;
		return (
			<html>
			<head>
				<link rel="stylesheet" type="text/css" href="../css/style.css"/>
			</head>
			<body>
			<h1>Delete Pokemon</h1>
			<h3>Are you sure you want to delete the following Pokemon? :(</h3>
			<p>{pokemon.name}</p>
			<img src={pokemon.img}/>
			<form method="POST" action={formLink}>
				<input name="name" placeholder="name" type="hidden" value={pokemon.name} required/><br/>
				<button>Confirm delete</button>
			</form>
			<p><a href={backLink}>Return</a></p>
			<p><a href="/">View all Pokemon</a></p>
			</body>
			</html>
		);
	}
}

module.exports = DeleteForm;