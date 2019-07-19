var React = require('react');

const cardStyle = {
  backgroundColor: 'darkgray',
  display: 'inline-block',
  margin: '50px',
  flexFlow: 'row nowrap',
  width: '500px',
  height: '500px',
  border: '10px double snow',
  borderRadius: '25px',
  textAlign: 'center',
};


const textStyle = {
  fontWeight: 'bold',
  fontSize: '20px',
};
const btnStyle = {
    margin: '30px   auto',
    display: 'block',
    fontWeight: 'bold',
    fontSize: '20px',
};

class Card extends React.Component {
  render() {

    return (
        <div style={cardStyle} >
            <form  action={"/pokemon"} method={"POST"}>
                <p style={textStyle}>Name:</p>
                <input style={textStyle}  name={'name'}></input>
                <p style={textStyle}>Image:</p>
                <input style={textStyle} type={'url'} name={'img'} pattern={'https?://.+'} title={"Include http://"}></input>
                <p style={textStyle}>Height:</p>
                <input style={textStyle} name={"height"} min={'1'} type={'number'} step={'0.1'} pattern={'[0-9]'}></input>
                <p style={textStyle}>Weight:</p>
                <input style={textStyle} name={"weight"} min={'1'} type={'number'} step={'0.1'} pattern={'[0-9]'}></input>
                <input style={btnStyle} type={"submit"}></input>
            </form>
        </div>

      );
  }
}

module.exports = Card;