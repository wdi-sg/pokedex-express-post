var React = require('react');

class Home extends React.Component {

  render() {

        let lastId = this.props.pokemon[this.props.pokemon.length - 1].id;
        let newId = lastId + 1;
    return (
    <html>
        <body>
            <div><h1>YOU FOUND A NEW POKEMON???/1!1!!! FOR REALSIES???</h1></div>
            <form method="POST" action="/pokemon/added"/>
                <div>ID:<input type="text" name="id" value={`${newId}`}/></div>  <br/>
                <div>Number:<input type="text" name="num" value={`${newId}`}/></div>  <br/>
                <div>Pokemon Name:<input type="text" name="name"/></div>  <br/>
                <div>Image:<input type="text" name="img"/></div>  <br/>
                <div>Height:<input type="text" name="height" value="0.00 m"/></div>  <br/>
                <div>Weight:<input type="text" name="weight" value="0.0 kg"/></div>  <br/>
                <div>Candy:<input type="text" name="candy" value="None"/></div>  <br/>
                <div>Egg:<input type="text" name="egg" value="Not in Eggs"/></div>  <br/>
                <div>Average spawns:<input type="text" name="avg_spawns" value="0"/></div>  <br/>
                <div>Spawn time:<input type="text" name="spawn_time" value="N/A"/></div>  <br/>
                <input type="submit" value="Submit"/>
        </body>
    </html>
    );

  }


}

module.exports = Home;