var React = require('react');

class Home extends React.Component {

  render() {
        let id = this.props.paramsId;
        let index = this.props.paramsIndex;
        let pokeName = this.props.pokemon[index].name;
    return (
    <html>
        <body>
            <div><h1>Are you sure you want to delete this pokemon?<br/> {id} : {pokeName}</h1></div>
            <form method="POST" action={`/pokemon/${id}/delete?_method=DELETE`}>
            <div><input type="hidden" name="id" value={`${index}`}/></div><br/>
            <input type="submit" value="Submit"/>
            </form>
        </body>
    </html>
    );

  }


}

module.exports = Home;