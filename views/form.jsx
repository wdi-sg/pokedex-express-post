var React = require('react');

class form extends React.Component {
  render() {
    return (
        <div>
            <form method="POST" action="/pokemon">
                Id:<br/>
                <input type="text" name="id" value="001"/><br/>

                Num:<br/>
                <input type="text" name="num" value="001"/><br/>

                Name:<br/>
                <input type="text" name="name" value=''/><br/>

                Img:<br/>
                <input type="text" name="img" value=""/><br/>  

                Height:<br/>
                <input type="text" name="height" value=""/><br/>  

                Weight:<br/>
                <input type="text" name="weight" value=""/><br/>
                
                <br/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
  }
}

module.exports = form;
