var React = require('react');
class Index extends React.Component {
  render() {

    const pokemon = this.props.pokeDex.map (object => {

        return <li><a href = {`/pokemon/${object.id}`}>{object.name}</a></li>
    })



    return (
      <html>
        <body>
          <div>

           <marquee><h1> POKEMON INDEX</h1></marquee>

            <ol>
            {pokemon}
            </ol>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = Index;