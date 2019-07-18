var React = require('react');
var onePokemon = require('./onepokemon.jsx');

class List extends React.Component {
    render() {

        console.log("inside List creation?");

        // let itemElements = this.props..map((pokemon) => {
                    return <onePokemon name={this.props.name} weight={this.props.weight} height={this.props.height}> <a href={`/pokemon/${this.props.index}/edit`}>Edit this Pokemon</a></onePokemon>;
        // });

        return (
          <html>
            <body>
              <div>
              <ul>
                {itemElements}
              </ul>

              </div>
            </body>
          </html>
        );
    }
}

module.exports = List;