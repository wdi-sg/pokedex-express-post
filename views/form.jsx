var React = require('react');

class Form extends React.Component {
    render() {
        return (
            <html>
                <body>
                    <h2>New Pokemon!</h2>
                    <font color="red">{this.props.message}</font>
                    <form method="POST" action="/addpokemon">
                        ID: <input type="number" name="id" required/><br/>
                        Number: <input type="number" name="num" required/><br/>
                        Name: <input type="text" name="name" required/><br/>
                        Img URL: <input type="url" name="img" required/><br/>
                        Height: <input type="text" name="height" placeholder="in metres" required/><br/>
                        Weight: <input type="text" name="weight" placeholder="in kilograms" required/><br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </body>
            </html>
        );
    }
}

module.exports = Form;
