var React = require('react');

class New extends React.Component {
    render() {
        return (
           <html>
        <body>
           <main >
          <form id="myForm" method="POST" action="/pokemon">
              Submit New Pokemon: <br/>
              ID:
              <input type="number" name="id"/> <br/>
              Number:
              <input type="number" name="num"/> <br/>
              Name:
              <input type="text" name="name"/> <br/>
              Image URL:
              <input type="url" name="img"/> <br/>
              Height:
              <input type="number" name="height"/> <br/>
              Weight:
              <input type="number" name="weight"/> <br/>

              <input type="submit" form="myForm" value="Submit"/>
            </form>
          </main>
        </body>
      </html>
        );
    }
}

module.exports = New;