var React = require('react');
class Add extends React.Component {

  render() {
    let newKey = this.props.data;
    return (
      <html>
        <body style={{textAlign:"center"}}>
            <h1>Add New Pokemon</h1>
            <form method="POST" action="/pokemon">
                <table style={{margin:"0 auto",textAlign:"left"}}>
                    <tr>
                        <td>ID</td>
                        <td><input type="text" name="id" value={newKey} readOnly style={{backgroundColor:"#b2b2b2"}} /></td>
                    </tr>
                    <tr>
                        <td>Num</td>
                        <td><input type="text" name="num" value={newKey} readOnly style={{backgroundColor:"#b2b2b2"}} /></td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" name="name"/></td>
                    </tr>
                    <tr>
                        <td>Image Link</td>
                        <td><input type="text" name="img" /></td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td><input type="text" name="height" /></td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td><input type="text" name="weight" /></td>
                    </tr>
                    <tr>
                        <td>Candy</td>
                        <td><input type="text" name="candy" /></td>
                    </tr>
                    <tr>
                        <td>Candy Count</td>
                        <td><input type="text" name="candy_count" /></td>
                    </tr>
                    <tr>
                        <td>Egg</td>
                        <td><input type="text" name="egg" /></td>
                    </tr>
                    <tr>
                        <td>Avg Spawns</td>
                        <td><input type="text" name="avg_spawns" /></td>
                    </tr>
                    <tr>
                        <td>Spawn Time</td>
                        <td><input type="text" name="spawn_time" /></td>
                    </tr>
                </table>
                <br/>
                <input type="submit" value="Add"/>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = Add;
