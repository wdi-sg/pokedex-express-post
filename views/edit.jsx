var React = require('react');

class Edit extends React.Component {

    render () {

        const actionAttribute = `/pokemon/${this.props.id}?_method=put`;

        return (
            <html>
                <body>
                    <div>
                        <form method="POST" action={actionAttribute}>
                            Name: <input name="name" value={this.props.name} />
                            <br />
                            Image: <input name="img" value={this.props.img} />
                            <br />
                            Height: <input name="height" value={this.props.height} />
                            <br />
                            Weight: <input name="weight" value={this.props.weight} />
                            <br />
                            <input type="submit" value="Edit" />

                        </form>
                    </div>
                </body>
            </html>
        )  // end of return

    }  // end of render
} // end of class home


module.exports = Edit;