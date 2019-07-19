var React = require('react');

const btnConStyle = {
  backgroundColor: 'crimson',
    display: 'flex',
  flexFlow: 'column nowrap',
  width: '125px',
  height: '100px',
  border: '10px double snow',
  borderRadius: '25px',
  alignItems: 'center',
  textAlign: 'center',

};
const btnStyle = {

  width: '100px',
  height: '100px',

  alignSelf: 'center',
  textAlign: 'center',
  cursor: 'pointer'
};


class EditButton extends React.Component {
  render() {

    var url = "/pokemon/"+this.props.name;


    return (
        <div style={btnConStyle} >
            <a style={btnStyle} href={url}>
            EDIT
            </a>
        </div>
      );
  }
}

module.exports = EditButton;