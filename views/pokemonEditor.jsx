
var React = require('react');


class editPokemonHTML extends React.Component {

    render() {

        console.log('JSX processing...');
        console.log("THIS PROPS: ", this.props );

        const postURL = `/${this.props.id}?_method=PUT`; // Syntax to use methodOverride since forms can't PUT

        return (

          <html>

            <body style={{margin:'5vw'}}>

                <h3 style={{color:'red'}}>Pokedex: Pokemon Editor</h3>

                <form method="POST" action={postURL}>

                Name: <input type="text" name="name" value={this.props.name} /><br />
                ID: <input type="text" name="id" value={this.props.id} /><br />
                Height: <input type="text" name="height" value={this.props.height} /><br />
                Weight: <input type="text" name="weight" value={this.props.weight} /><br />

                <input type="submit" value="Submit" />

                </form>

            </body>

          </html>

        );
    };
};

module.exports = editPokemonHTML;







