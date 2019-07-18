var React = require('react');

const imgOneStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '600px'
};
const imgTwoStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width:'75px',
    cursor: 'pointer'
};
class Header extends React.Component {
  render() {


    return (
      <div>
          <img src={this.props.img1} style={imgOneStyle}/>
          <a href="/pokemon">
          <img src={this.props.img2} style={imgTwoStyle}/>
          </a>
      </div>
    );
  }
}

module.exports = Header;