var React = require ('react');

class form extends React.Component{
    render() {
        return(
             <form action="/" method="GET">
                <select name="sortby">
                    <option value="name">sort by name</option>
                    <option value="height">sort by height</option>
                    <option value="weight">sort by weight</option>
                </select>
                    <input type="submit" value = "submit"/>
            </form>
        )
    }
}
 module.exports = form;