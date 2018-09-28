
var React = require('react');


class editPokemonHTML extends React.Component {

    render() {

        console.log('JSX processing...');
        console.log("THIS PROPS: ", this.props );

        const postURL = `/${this.props.id}?_method=PUT`; // Syntax to use methodOverride since forms can't PUT

        return (

          <html>

            <head>

                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />

            </head>

            <body style={{margin:'5vw'}}>

                <h3 style={{color:'red'}}>Pokedex: Pokemon Editor</h3>

                <form method="POST" action={postURL} name="edit">

                Name: <input type="text" name="name" value={this.props.name} minlength="2" required /><br />
                ID: <input type="text" name="id" value={this.props.id} readonly="readonly" /><br />
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







