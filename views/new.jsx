var React = require('react');

class New extends React.Component {

  render() {
    console.log("Printing out this.props.id: "+this.props.id);
    // let idAsnumber = parseInt(this.props.id);
    return (
            <form method = "POST" action = {'/pokemon'}>
              Pokemon ID: <br/>
              <input type= "number" name = "id" value = {this.props.id}/><br/>
              Pokemon Num: <br/>
              <input type= "text" name = "num" value = {this.props.num}/><br/>
              Pokemon Name: <br/>
              <input type= "text" name = "name" value = {this.props.name}/><br/>
              Pokemon Image Link: <br/>
              <input type= "url" name = "img" value = {this.props.img}/><br/>
              Height: <br/>
              <input type= "number" name = "height" value = {this.props.height}/><br/>
              Weight: <br/>
              <input type= "number" name = "weight" value = {this.props.weight}/><br/>
              <input type= "submit" value= "Submit"/><br/>
            </form>
            );
          }
}

module.exports = New;
//152
//Chikorita
//https://www.serebii.net/pokemongo/pokemon/152.png

//158
//Totodile
//https://www.serebii.net/pokemongo/pokemon/158.png


//159
//Croconaw
//https://www.serebii.net/pokemongo/pokemon/159.png

//160
//Feraligatr
//https://www.serebii.net/pokemongo/pokemon/160.png
