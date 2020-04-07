var React = require('react');

class Home extends React.Component {

  render() {
    return (
      <html>
        <body>
          <div>
          <h1>Your New Pokemon!!!</h1>
          <p>Id : {this.props.id}</p>
          <p>Num : {this.props.num}</p>
          <p>Name : {this.props.name}</p>
          <p>Img : {this.props.img}</p>
          <p>Height : {this.props.height}</p>
          <p>Weight : {this.props.weight}</p>

            <form method="get" action="/pokemon/new">


                <button type="submit">Continue</button>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;