var React = require('react');

class Home extends React.Component {
  render() {
    //code logic goes here
    console.log(this.props.flagstate)
    console.log(this.props.idstate)

    var goodToAdd = `Pokemon Added!`
    var noGood = `Error! Unable to add Pokemon due to duplicate pokemon name found. Please try again.`
    var noGoodId = `Error! Unable to add Pokemon as someone else has taken this ID already. Please try again.`
    var checkState = true;
    var response = ""
    if (this.props.idstate === true && this.props.flagstate === false){
      response = noGoodId
    }else if(this.props.idstate === false && this.props.flagstate === true){
      response = noGood
    }else{
      response = goodToAdd
    }

    return (
      <html>
        <body>
          <div>
            <h1>{response}</h1>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
