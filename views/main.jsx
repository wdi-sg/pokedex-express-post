var React = require('react');

class MainPage extends React.Component {
  render() {
    console.log("here");
    return (
        <html>
        <body>
        <form method="POST" action={"/pokemon/:" + this.props.pokemonEdit.id}>
        <h1>Edit your pokemon details here</h1>
        <h3>Is your Pokemon gaining muscle mass?</h3>
        <h3>Cut down on protein shakes!</h3>
        Id:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" name="id" defaultValue={this.props.pokemonEdit.id} />
        <br/>
        <br/>
        The no. of:
        <input type="text" name="num" defaultValue={this.props.pokemonEdit.num}/>
        <br/>
        <br/>
        Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" name="name" defaultValue={this.props.pokemonEdit.name}/>
        <br/>
        <br/>
        Image:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" name="img" defaultValue={this.props.pokemonEdit.img}/>
        <br/>
        <br/>
        Height:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" name="height" defaultValue={this.props.pokemonEdit.height}/>
        <br/>
        <br/>
        Weight:&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" name="weight" defaultValue={this.props.pokemonEdit.weight}/>
        <input type="submit" value="Change"/>
        </form>
        </body>
        </html>
        );
}
}

module.exports = MainPage;