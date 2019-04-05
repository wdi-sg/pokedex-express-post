var React = require("react");


class New extends React.Component {

    render() {
    return (
        <body>
        <form method="POST" action="/pokemon">
        id: <input type="text" name="id"/>
        num: <input type="text" name="num"/>
        name: <input type="text" name="name"/>
        img: <input type="text" name="img"/>
        height: <input type="text" name="height"/>
        weight: <input type="text" name="weight"/>
        <input type="submit" value="Submit"/>
        </form>
        </body>
    );
    }
}

module.exports = New;