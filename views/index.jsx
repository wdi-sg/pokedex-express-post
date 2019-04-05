var React = require('react');

class Home extends React.Component {

    render () {

        const actionAttribute = `/pokemon/${this.props.id}?_method=put`;

        return (
            <html>
                <body>
                    <div>
                        <form method="POST" action={actionAttribute}>
                            Name: <input name="name" value={this.props.name} />

                            Image: <input name="img" value={this.props.img} />

                            Height: <input name="height" value={this.props.height} />

                            Weight: <input name="weight" value={this.props.weight} />

                            <input type="submit" value="Edit" />

                        </form>
                    </div>
                </body>
            </html>
        )  // end of return

    }  // end of render
} // end of class home


module.exports = Home;