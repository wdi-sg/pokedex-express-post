var React = require('react');
class Home extends React.Component {
    render() {
        return (
            <html>
       <body>
         <div>
         <h1>GOTTA CATCH THEM ALL!{this.props.id}</h1>
         <form action={"/pokemon/" + this.props.id+'?_method=delete'} method="POST">
         <input type="submit" value="Submit"/>
         </form>
         </div>
         </body>
         </html>
        );
    }
}
module.exports = Home;