var React = require('react');

class Home extends React.Component {
    render() {

        const list = this.props.obj.map( item => {
          return <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td><a href={'/pokemon/${item.id}'}><img src={item.img}/></a></td>
                </tr>
        });

        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
                </head>
                <body>
                    <h1>Welcome to the Online Pokedex</h1>
                    <h3>Add a new entry</h3>
                    <form method="GET" action="/">Sort Pokemon by
                    <select name="sortby">
                        <option value="id">ID</option>
                        <option value="name">Name</option>
                    </select>
                    <input type="submit" value="sort"/>
                    </form>
                    <br/>
                    <h3>List of pokemon</h3>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image (click for details) </th>
                        </tr>
                        {list}
                    </table>
                </body>
            </html>
        );
    }
}

module.exports = Home;