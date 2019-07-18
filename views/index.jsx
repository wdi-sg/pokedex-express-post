var React = require('react');

const imgOneStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '900px'
};
const imgTwoStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width:'200px',
    cursor: 'pointer'
};
const divStyle = {
    marginTop: '100px',
    backgroundColor: 'lightgray',
};
class Header extends React.Component {
  render() {
    const urlMain = "http://1.bp.blogspot.com/-0V4itR_v87M/UtsCF-ehNYI/AAAAAAAABjU/UEQ5Jiy_85o/s1600/pokedex-3d-logo.png"
    const urlPokeball = "https://icon-library.net//images/pokestop-icon-png/pokestop-icon-png-8.jpg"
    return (
        <html>
            <body style={divStyle}>
                <div>
                    <img src={urlMain} style={imgOneStyle}/>
                    <a href="/pokemon">
                    <img src={urlPokeball} style={imgTwoStyle}/>
                    </a>
                </div>
            </body>
       </html>
      );
}
}

module.exports = Header;