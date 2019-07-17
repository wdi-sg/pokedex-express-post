var React = require('react');

class EditForm extends React.Component {
	render() {
		let pokemon = this.props.pokemon;
		let formLink = "/pokemon/"+pokemon.id+"?_method=PUT";
		let backLink = "/pokemon/"+pokemon.id;
		return (
			<html>
			<head>
				<link rel="stylesheet" type="text/css" href="../css/style.css"/>
			</head>
			<body>
			<h1>Edit Pokemon</h1>
			<form method="POST" action={formLink}>
				<input name="name" placeholder="name" value={pokemon.name} required/><br/>
				<input name="img" placeholder="img" value={pokemon.img} required/><br/>
				<input name="height" placeholder="height (m)" value={pokemon.height} required/><br/>
				<input name="weight" placeholder="weight (kg)" value={pokemon.weight}  required/><br/>
				<button>Submit</button>
			</form>
			<p><a href={backLink}>Return</a></p>
			<p><a href="/">View all Pokemon</a></p>
			</body>
			</html>
		);
	}
}

module.exports = EditForm;