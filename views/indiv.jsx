var React = require('react');

class Home extends React.Component {
    render() {

        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
                </head>
                <body>
                    <h1>No.{this.props.id} {this.props.name}</h1>
                    <img src={this.props.img}/>
                    <table>
                        <tr>
                            <th>Height</th>
                            <th>Weight</th>
                        </tr>
                        <tr>
                            <td>{this.props.height}</td>
                            <td>{this.props.weight}</td>
                        </tr>
                    </table>
                    <a className="btn btn-info"href={`/pokemon/{this.props.id}/edit`}>edit</a>
                    <a className="btn btn-danger"href={`/pokemon/{this.props.id}/delete`}>delete</a>
                </body>
            </html>
        );
    }
}

module.exports = Home;