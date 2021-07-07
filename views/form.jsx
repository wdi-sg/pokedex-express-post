var React = require('react');

class Form extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>so you found a new pokemon...</h1>
                                                                {/* <button>hello</button>
                                                                <a href="http://google.com">click me</a> */}
            <h3>show me</h3>
            <form action="/pokemon" method="POST">
                Enter Pokemon Information Here:
                <br></br>
                <input type="text" name="id" placeholder="id"/>
                <br></br>
                <input type="text" name="num" placeholder="num"/>
                <br></br>
                <input type="text" name="name" placeholder="name"/>
                <br></br>
                <input type="text" name="img" placeholder="img"/>
                <br></br>
                <input type="text" name="height" placeholder="height"/>
                <br></br>
                <input type="text" name="weight" placeholder="weight"/>
                <br></br>
                <input type="submit" value="Submit"/>
            </form>
                                                                {/* <form action="/form" method="POST">
                                                                    Just Name:
                                                                    <input type="text" name="hello"/>
                                                                    <input type="submit" value="Submit"/>
                                                                </form> */}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Form;