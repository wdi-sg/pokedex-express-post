var React = require('react');

class Home extends React.Component {
    render(){
        var name = this.props.name
        var image = this.props.img
        var weight = this.props.weight
        var height = this.props.height
        return (
            <html>
                <body>
                    <div>
                        <header><h1>{name}</h1></header>
                        <p><img src = {image}/></p>
                        <p>Weight: {weight}</p>
                        <p>Height: {height}</p>
                    </div>
                </body>
            </html>
        )
    }
}

module.exports = Home;