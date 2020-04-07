var React = require('react');
class Form extends React.Component {
    render(){
        return(
            <form method="POST" action="/pokemon">
            Pokemon details:
            id<input type = "number" name = "id"/>
            number<input type = "number" name = "num"/>
            name<input type="text" name="name"/>
            image<input type = "text" name="image"/>
            height<input type = "number" name = "height"/>
            weight<input type = "number" name = "weight"/>
            <input type="submit" value="Submit"/>
            </form>
            )
    }
}
module.exports = Form;