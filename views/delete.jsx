//edit step 2b: render delete form
var React = require('react');

class Delete extends React.Component {
  render() {

    // URL to indicate PUT method back to index.js for editing of json file
    var url = `/pokemon/${this.props.indexDatatoDelete.id}?_method=DELETE`;
    return (
      <html>
        <body>
          <div>
            <h1>Pokemon Delete</h1>
            <p>Pokemon: {this.props.indexDatatoDelete.name}</p>

            {/*form action to URL with POST method to write to json file*/}
            <form action={url} method="POST">

                <p>Pokemon's id: {this.props.indexDatatoDelete.id}</p>

                <p>Pokemon's num: {this.props.indexDatatoDelete.num}</p>

                <p>Pokemon's name: {this.props.indexDatatoDelete.name}</p>

                <p>Pokemon's img: {this.props.indexDatatoDelete.img}</p>

                <p>Pokemon's height {this.props.indexDatatoDelete.height}</p>

                <p>Pokemon's weight: {this.props.indexDatatoDelete.weight}</p>

                <p>Pokemon's candy: {this.props.indexDatatoDelete.candy}</p>

                <p>Pokemon's candy_count: {this.props.indexDatatoDelete.candy_count}</p>

                <p>Pokemon's egg: {this.props.indexDatatoDelete.egg}</p>

                <p>Pokemon's avg_spawns: {this.props.indexDatatoDelete.avg_spawns}</p>

                <p>Pokemon's spawn_time: {this.props.indexDatatoDelete.spawn_time}</p>

                <input type = "submit"/>

            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;