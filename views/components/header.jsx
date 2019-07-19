var React = require('react');

const headerStyle = {
    color: 'yellow'
};

class Header extends React.Component {
  render() {
    return (
      <div className="header" style={headerStyle}>
        <img src="https://fontmeme.com/permalink/190715/f87c04db0b54e3b89caa3d1d3ee405fb.png"></img>
        <h1>Gotta catch'em all!</h1>
      </div>
    );
  }
}

module.exports = Header;