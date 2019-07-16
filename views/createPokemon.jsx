var React = require('react');

class createPokemon extends React.Component {

    render() {

        let attributesList = this.props.attributes;
        let attributesHTML = attributesList.map(attribute => {
            return <label>{attribute}:<br/><input type='text' name={attribute}/><br/><br/></label>
        })


        return (

        <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
        </head>
        <body>
            <h1>Edit Pokemon Details</h1>
            <form method='POST' action='/pokemon'>
                {attributesHTML}
                <input type='submit' value='Submit'/>
            </form>
        </body>
        </html>
        )
    }
}

module.exports = createPokemon;