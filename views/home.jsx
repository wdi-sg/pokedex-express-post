// home index.js

var React = require('react');

 class Home extends React.Component {
     render() {
         let inputType = 'button';
         let formAction = '/pokemon';
         let selectName = 'sortby';
         let theName = 'name';
         let theId = 'id';
         let theHeight = 'height';
         let theWeight = 'weight';
         let submitInput = 'submit';

         return (
           <div>
             <h1>Pokedex, sort it however your like </h1>
             <form action={formAction}>
                 <select name={selectName}>
                 <option value={theName}>Name</option>
                 <option value={theId}>Id</option>
                 <option value={theHeight}>Height</option>
                 <option value={theWeight}>Weight</option>
                 </select>
                 <br/>
                 <input type={submitInput}/>
             </form>
           </div>
         );
     }
 }

 module.exports = Home;