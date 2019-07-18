var React = require('react');
var Header = require('./components/header');

class AddForm extends React.Component {
	render() {
		let formLink = "/pokemon?_method=POST";

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
							<h2>Add Pokemon</h2>

							<form method="POST" action={formLink}>
								<div className="form-group row">
									<label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
									<div className="col-sm-10">
										<input name="name" className="form-control" required/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="name" className="col-sm-2 col-form-label">Img</label>
									<div className="col-sm-10">
										<input name="img" className="form-control" required/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="name" className="col-sm-2 col-form-label">Height (m)</label>
									<div className="col-sm-10">
										<input name="height" className="form-control" required/>
									</div>
								</div>
								<div className="form-group row">
									<label htmlFor="name" className="col-sm-2 col-form-label">Weight (kg)</label>
									<div className="col-sm-10">
										<input name="weight" className="form-control" required/>
									</div>
								</div>
								<button type="submit" className="btn btn-dark d-block mx-auto">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</body>
			</html>
		);
	}
}

module.exports = AddForm;