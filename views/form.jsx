var React = require('react');
class Form extends React.Component {
    render() {
        return (
            <html>
                <body>
                    <h1>Update Pokedex</h1>
                    <form method='POST' action='/pokemon/new'>
                        ID:<br/>
                        <input type='number' name='id'/><br/><br/>
                        Pokedex No.:<br/>
                        <input type='number' name='num'/><br/><br/>
                        Name:<br/>
                        <input type='text' name='name'/><br/><br/>
                        Height:<br/>
                        <input type='text' name='height'/><br/><br/>
                        Weight:<br/>
                        <input type='text' name='weight'/><br/><br/>
                        Image URL:<br/>
                        <input type='url' name='img'/><br/><br/>
                        <input type='submit' value='Submit'/>
                    </form>
                </body>
            </html>
        );
    }
}

module.exports = Form;