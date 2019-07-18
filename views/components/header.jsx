var React = require('react');

class PokemonThumbnail extends React.Component {
	render() {
		return (
			<nav className="navbar">
				<a className="navbar-brand" href="/pokemon">
					<img src="https://cdn6.aptoide.com/imgs/9/4/6/946a826ac206c6c8314c9dcce0f992a9_icon.png?w=240" width="30" height="30"
					     className="d-inline-block align-top mr-3" alt=""/>
						Pokedex
				</a>
			</nav>

		);
	}
}

module.exports = PokemonThumbnail;