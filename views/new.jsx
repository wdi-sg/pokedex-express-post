var React = require('react');

class Form extends React.Component {
  render() {

const greyBox = {
  backgroundColor: '#D3D3D3',
};

    return (
      <html>
        <body>
          <div>
            <h1>New Member !</h1>
            <form method="POST" action={"/pokemon/new/"+this.props.index+'?_method=PUT'}>
                <table>
                <tr>
                <td>ID#</td>
                <td><input name="id" value={this.props.index} readonly="readonly" style={greyBox} /></td>
                </tr>
                <tr>
                <td>Number</td>
                <td><input name="num" /></td>
                </tr>
                <tr>
                <td>Name</td>
                <td><input name="name" /></td>
                </tr>
                 <tr>
                <td>Image URL</td>
                <td><input name="img" /></td>
                </tr>
                <tr>
                <td>height</td>
                <td><input name="height" /></td>
                </tr>
                <tr>
                <td>weight</td>
                <td><input name="weight"  /></td>
                </tr>
                <tr>
                <td>Candy</td>
                <td><input name="candy"  /></td>
                </tr>
                <tr>
                <td>Candy Count</td>
                <td><input name="candy_count"  /></td>
                </tr>
                <tr>
                <td>Egg</td>
                <td><input name="egg" /></td>
                </tr>
                <tr>
                <td>Average Spawns</td>
                <td><input name="avg_spawns" /></td>
                </tr>
                <tr>
                <td>Spawn Time</td>
                <td><input name="spawn_time" /></td>
                </tr>
                <tr>
                <td></td>
                <td><input type="submit"/></td>
                </tr>
                </table>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Form;