var React = require('react');

class Footer extends React.Component {
	render() {
		let editLink = "../pokemon/"+this.props.pokemon.id+"/edit";
		let deleteLink = "../pokemon/"+this.props.pokemon.id+"/delete";
		return (
			<footer className="footer row">
				<div className="col-8 offset-2">
					<a href={editLink}><button className="edit-btn btn btn-dark">Edit Pokemon</button></a>
					<a href={deleteLink}><button className="delete-btn btn btn-dark">Delete Pokemon</button></a>
					<a href="/pokemon"><button className="view-btn btn btn-dark">View all Pokemon</button></a>
				</div>
			</footer>

		);
	}
}

module.exports = Footer;