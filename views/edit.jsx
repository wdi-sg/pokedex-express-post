var React = require('react');

class Editor extends React.Component {

  render(){
  	
    	return (
    			<html>
	                <body>
	                  <form action={"/pokemon/updated/"+this.props.id} method="post">
	                    <input id="name" type="text" name="name" placeholder={this.props.name}/>
	                    <input id="img" type="text" name="img" placeholder={this.props.img}/>
	                    <input id="height" type="text" name="height" placeholder={this.props.height}/>
	                    <input id="weight" type="text" name="weight" placeholder={this.props.weight}/>
	                    <select name="makeType">
	                      <option value="your">your</option>
	                      <option value="my">my</option>
	                      <option value="best">best</option>
	                      <option value="not-my">Not my</option>
	                    </select>
	                    <input type="submit"/>
	                  </form>
	                </body>
	              </html>
	            );
	        }  
}

module.exports = Editor;

