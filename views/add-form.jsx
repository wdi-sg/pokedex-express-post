var React = require('react');

class AddForm extends React.Component {
	render() {
		let formLink = "/pokemon?_method=POST";

		return (
			<html>
			<head>
				<link rel="stylesheet" type="text/css" href="../css/style.css"/>
			</head>
			<body>
			<h1>Add Pokemon</h1>
			<form method="POST" action={formLink}>
				<input name="name" placeholder="name" required/><br/>
				<input name="img" placeholder="img" required/><br/>
				<input name="height" placeholder="height (m)" required/><br/>
				<input name="weight" placeholder="weight (kg)" required/><br/>
				<button>Submit</button>
			</form>
			</body>
			</html>
		);
	}
}

module.exports = AddForm;