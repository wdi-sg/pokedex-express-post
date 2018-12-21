var React = require('react');

class Pokemon extends React.Component {

  render() {
    let actionUrl = `/pokemon/${this.props.id}/edit?_method=put`
    return (
            <html>
            <body>
            <h1> Edit Details of Pokemon </h1>
            <img src={this.props.img}/>
            <form action = {actionUrl} method="POST">
            Id: <input type="text" name="id" value={this.props.id}/> <br/> <br/>
            Num: <input type="text" name="num" value={this.props.num}/> <br/> <br/>
            Name: <input type="text" name="name" value= {this.props.name}/> <br/> <br/>
            Weight: <input type="text" name="weight" value= {this.props.weight}/> <br/> <br/>
            Height: <input type="text" name="height" value= {this.props.height}/> <br/> <br/>
            Image: <input type="text" name="img" value= {this.props.img}/> <br/> <br/>
            <input type="submit" value="Submit"/>
            </form>
            </body>
            </html>
    );
  }
}

module.exports = Pokemon;