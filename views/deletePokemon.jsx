var React = require('react');


class showPokemon extends React.Component {
    render() {
        let formUrl = "/pokemon/"+this.props.theId+"?_method=delete"

        return (
            <html>
                <body>
                    <div>
                        <h1>{this.props.thePokemon.name}</h1>
                        <img src={this.props.thePokemon.img} alt="image" />
                    </div>
                    {/*Start Table*/}
                    <table class="table">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{this.props.thePokemon.id}</td>
                            </tr>
                            <tr>
                                <th>Height</th>
                                <td>{this.props.thePokemon.height}</td>
                            </tr>

                            <tr>
                                <th>Weight</th>
                                <td>{this.props.thePokemon.weight}</td>
                            </tr>

                            <tr>
                                <th>Candy</th>
                                <td>{this.props.thePokemon.candy}</td>
                            </tr>

                            <tr>
                                <th>Egg</th>
                                <td>{this.props.thePokemon.egg}</td>
                            </tr>

                            <tr>
                                <th>Average Spawn</th>
                                <td>{this.props.thePokemon.avg_spawns}</td>
                            </tr>

                            <tr>
                                <th>Spawn Time</th>
                                <td>{this.props.thePokemon.spawn_time}</td>
                            </tr>
                        </tbody>
                    </table>
                    <form action={formUrl} method="POST">
                        <button type="submit" className="btn btn-primary">Delete Pokemon</button>
                    </form>
                </body>
            </html>
        );
    }
}


module.exports = showPokemon;