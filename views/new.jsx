var React = require('react');

class New extends React.Component {
    render() {
        return (
            <html>
                <body>
                    <h2>New Pokemon!</h2>
                    <form method="POST" action="/new">
                        ID: <input type="number" name="id"/><br/>
                        Number: <input type="number" name="num"/><br/>
                        Img URL: <input type="url" name="img"/><br/>
                        Height: <input type="text" name="height" placeholder="in metres"/><br/>
                        Weight: <input type="text" name="weight" placeholder="in kilograms"/><br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </body>
            </html>
        );
    }
}

module.exports = New;