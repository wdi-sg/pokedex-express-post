var React = require('react');

class Form extends React.Component {
  render() {


    return (

        <body>
          <div>
              <h1>New Pokemon Form</h1>
              <a href="/">Back to Home page</a>
              <form method="POST" action="/pokemon/:id">
                <p>Pokemon id:</p>
                <input type="text" name="id"/>
                <br/>
                <p>Pokemon num:</p>
                <input type="text" name="num"/>
                <br/>
                <p>Pokemon name:</p>
                <input type="text" name="name"/>
                <br/>
                <p>Pokemon img:</p>
                <input type="text" name="img"/>
                <br/>
                <p>Pokemon height:</p>
                <input type="text" name="height"/>
                <br/>
                <p>Pokemon weight:</p>
                <input type="text" name="weight"/>
                <br/>
                <p>Pokemon candy:</p>
                <input type="text" name="candy"/>
                <br/>
                <p>Pokemon candy count:</p>
                <input type="text" name="candy_count"/>
                <br/>
                <p>Pokemon egg:</p>
                <input type="text" name="egg"/>
                <br/>
                <p>Pokemon avg spawns:</p>
                <input type="text" name="avg_spawns"/>
                <br/>
                <p>Pokemon spawn time:</p>
                <input type="text" name="spawn_time"/>
                <br/>
                <button type="submit" value="Submit">Submit</button>
              </form>
          </div>
        </body>

    );
  }
}

module.exports = Form;