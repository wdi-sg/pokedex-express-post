var React = require('react');
class Form extends React.Component {
    render(){
        return(
            <form method="POST" action="/pokemon">
            Pokemon details:<br/>

            <input type = "number" name = "id"placeholder = "id"/><br/>

            <input type = "number" name = "num" placeholder = "number"/><br/>

            <input type="text" name="name" placeholder = "name"/><br/>
            <input type = "text" name="image" placeholder ="image"/><br/>
            <input type = "number" name = "height" placeholder ="height"/><br/>
            <input type = "number" name = "weight" placeholder ="weight"/><br/>
            <input type="submit" value="Submit"/>
            </form>
            )
    }
}
module.exports = Form;