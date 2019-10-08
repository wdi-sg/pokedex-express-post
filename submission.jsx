var React = require('react');


class Submission extends React.Component {
    render() {
        return (
           <html>
        <body>
         <main>
          <h3>Pokemon Name: { this.props.name }</h3>
          <img src={ this.props.img }/>
            <h2>ID: { this.props.id }</h2>
            <h2>Number: { this.props.num }</h2>
            <h2>Height: { this.props.height }</h2>
            <h2> Weight: { this.props.weight }</h2>
          </main>
        </body>
      </html>
        );
    }
}

module.exports = Submission;