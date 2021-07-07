var React = require('react');
class editPoke extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>You are editing Pokemon: {this.props.name}</h1>
            <img src={this.props.img} style={{width: 15 + '%'}}/><br/><br/>
            <form method='POST' action={'/pokemon/'+this.props.id+"?_method=put"}>
                Name: <br/><input type='text' name='name'placeholder ={this.props.name} required/><br/><br/>
                Image src: <br/><input type='url' name='img'placeholder = "img src here" required/><br/><br/>
                Weight: <br/><input type='text' name='weight'placeholder = {this.props.weight} required/><br/><br/>
                Height: <br/><input type='text' name='height'placeholder = {this.props.height} required/><br/><br/>
                        <input type='submit' value='Submit'/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = editPoke;