const React = require('react');
class Types extends React.Component {
    render() {

        let pokemonIndex = this.props.pokemon;

        return (
            <html>
                <body>
                    <h1>All Pokemon Types</h1>
                    <p>There are 18 types of Pokemon in total.</p>
                    <ol>
                        <li>Normal</li>
                        <li>Fighting</li>
                        <li>Flying</li>
                        <li>Poison</li>
                        <li>Ground</li>
                        <li>Rock</li>
                        <li>Bug</li>
                        <li>Ghost</li>
                        <li>Steel</li>
                        <li>Fire</li>
                        <li>Water</li>
                        <li>Grass</li>
                        <li>Electric</li>
                        <li>Psychic</li>
                        <li>Ice</li>
                        <li>Dragon</li>
                        <li>Dark</li>
                        <li>Fairy</li>
                    </ol>
                </body>
            </html>
        );
    }
}

module.exports = Types;