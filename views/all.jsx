var React = require('react');

 class Main extends React.Component {

   render() {

     const pokemon = this.props.name.map( pokemon => {
       return <li>{pokemon}</li>
     });

     return (
       <div>
       <h1>List of all Pokemon</h1>
       <a href = {"/pokemon/new"}>Create pokemon</a>
         <ul>
         {pokemon}
         </ul>
       </div>
     );
   }
 }

 module.exports = Main;