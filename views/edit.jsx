//edit step 2b: render edit form
var React = require('react');

class Edit extends React.Component {
  render() {

    // URL to indicate PUT method back to index.js for editing of json file
    var url = `/pokemon/${this.props.indexDatatoEdit.id}?_method=PUT`;
    return (
      <html>
        <body>
          <div>
            <h1>Pokemon Edit</h1>
            <p>Pokemon: {this.props.indexDatatoEdit.name}</p>

            {/*form action to URL with POST method to write to json file*/}
            <form action={url} method="POST">

                <p>Pokemon's id</p>
                <input name = "id" value={this.props.indexDatatoEdit.id}/>

                <p>Pokemon's num</p>
                <input name = "num" value={this.props.indexDatatoEdit.num}/>

                <p>Pokemon's name</p>
                <input name = "name" value={this.props.indexDatatoEdit.name}/>

                <p>Pokemon's img</p>
                <input name = "img" value={this.props.indexDatatoEdit.img}/>

                <p>Pokemon's height</p>
                <input name = "height" value={this.props.indexDatatoEdit.height}/>

                <p>Pokemon's weight</p>
                <input name = "weight" value={this.props.indexDatatoEdit.weight}/>

                <p>Pokemon's candy</p>
                <input name = "candy" value={this.props.indexDatatoEdit.candy}/>

                <p>Pokemon's candy_count</p>
                <input name = "candy_count" value={this.props.indexDatatoEdit.candy_count}/>

                <p>Pokemon's egg</p>
                <input name = "egg" value={this.props.indexDatatoEdit.egg}/>

                <p>Pokemon's avg_spawns</p>
                <input name = "avg_spawns" value={this.props.indexDatatoEdit.avg_spawns}/>

                <p>Pokemon's spawn_time</p>
                <input name = "spawn_time" value={this.props.indexDatatoEdit.spawn_time}/>

                <input type = "submit"/>

            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;