var React = require('react');

class Navbar extends React.Component {

  render() {

    return (
      <header>
        <img src={'/header.png'} style={{maxWidth:'900px', height:'auto'}} />
        <nav style={{textAlign:'center', styleDecoration:'underline', color: 'blue', fontSize: '30px'}}>
          <a href={'/pokemon'}>Home</a>
          <span> | </span>
          <a href={'/pokemon/new'}>Create New Pokemon</a>
          <span> | </span>
          <a href={'/pokemon/type/Bug'}>Shortlist by Type</a>
        </nav>
      </header>
    );
  }
}

module.exports = Navbar;