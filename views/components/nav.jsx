var React = require('react');

const navBarStyle = {
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: 'black',
  justifyContent: 'space-evenly',
  fontSize: '25px'
};
const ulStyle = {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    backgroundColor: 'black',
    textAlign: 'center'
};

const aStyle = {
    fontWeight: 'bold',
    fontSize: '25px',
    display: 'block',
    color: 'white',
    textAlign: 'center',
    padding: '14px 16px',
    textDecoration: 'none',
};
const liStyle = {
    fontWeight: 'bold',
    fontSize: '25px',
    display: 'inline-block',
    color: 'white',
    textAlign: 'center',
    padding: '14px 16px',
    textDecoration: 'none',
};

const formStyle = {
    display: 'inline',
    fontWeight: 'bold',
    fontSize: '20px',
};
const textStyle = {
  fontWeight: 'bold',
  fontSize: '20px',
  display: 'inline',
  color: 'black',
  textAlign: 'center',

  textDecoration: 'none',
};

const btnStyle = {
    margin: '30px  25px',
    display: 'inline-block',
    height: '30px',
    fontWeight: 'bold',
    fontSize: '15px',
};
class Navigation extends React.Component {
  render() {

    return (
      <div style={navBarStyle}>
          <ul style={ulStyle}>
              <li style={liStyle} ><a style={aStyle} href={'/'}>Home</a></li>
              <li style={liStyle} ><a style={aStyle} href={'/pokemon/'}>Pokemon</a></li>
              <li style={liStyle} ><a style={aStyle} href={'/pokemon/new'}>New</a></li>
          </ul>
          <form  action={"/pokemon/:name"}>
                <input style={textStyle} name={"name"}></input>
                <input style={btnStyle} type={"submit"}></input>
          </form>
      </div>
    );
  }
}

module.exports = Navigation;