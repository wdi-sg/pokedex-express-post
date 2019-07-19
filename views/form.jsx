var React = require('react');

const Layout = require('./layout.jsx');


class Form extends React.Component {
    render() {
        return (
            <Layout>
            <div>
        <html>
        <head>

        </head>
        <body>
          <div>
            <h1>Enter Details of New Pokemon</h1>
            <form method="POST" action="/pokemon">
                <p>Pokemon ID</p>
                <input name="id" defaultValue={this.props.arrayLength}/>
                <p>Pokemon Number</p>
                <input name="num" defaultValue={this.props.arrayLength}/>
                <p>Pokemon Name</p>
                <input name="name"/>
                <p>Image URL</p>
                <input name="imgURL"/>
                <p>Height (m)</p>
                <input name="height"/>
                <p>Weight (kg)</p>
                <input name="weight"/>
                <br /> <br />
                <input type="submit"/>
            </form>
          </div>
        </body>
        </html>
        </div>
        </Layout>
        );
    }
}

module.exports = Form;