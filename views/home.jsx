var React = require('react');

class Home extends React.Component {
    render() {

    const list = this.props.obj.map( item => {
        return <li><a href={`/pokemon/${item.id}`}>{item.name} No.{item.id}</a></li>
    });


    return (
        <body>
          <div>
            <h1>List of pokemon</h1>
            <ol>
                {list}
            </ol>
          </div>
        </body>
    );
  }
}

module.exports = Home;