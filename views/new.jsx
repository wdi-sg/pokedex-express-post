var React = require('react');

class New extends React.Component {
    render() {

        return (
            <html>
                <body>
                <h1> Please key in the new Pokemon </h1>
                    <form action="/pokemon" method="POST">
                        <input name="id" placeholder="enter id"/>  <br/>
                        <input name="name" placeholder="enter name"/>  <br/>
                        <input name="num" placeholder="enter number"/>  <br/>
                        <input name="img" placeholder="enter image"/>  <br/>
                        <input name="height" placeholder="enter height in metre"/> m  <br/>
                        <input name="weight" placeholder="enter weight in kg"/> kg  <br/>
                    <button type="submit">Submit</button>
                    </form>
                    </body>
                    </html>
        )
    }
}

module.exports = New;