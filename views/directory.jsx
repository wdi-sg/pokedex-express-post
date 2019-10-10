var React = require('react');

class Directory extends React.Component {
  render() {

//bunch of JS code
//establish var = link
//establish variables/functions/conditionals
    let list = this.props.searched.map(id => {
        return <li>{id}</li>
    });

    return (
      <html>
        <body>
          <div>
            <h1>Pokemon Directory</h1>
                                                                {/* <button>hello</button>
                                                                <a href="http://google.com">click me</a> */}
            <h3>show me</h3>
            <form action="/pokemon" method="GET">
                <p>Sort by...</p>
                <select>
                    <option value="id">By ID</option>
                    <option value="name">By Name</option>
                    <option value="height">By Height</option>
                    <option value="weight">By Weight</option>
                </select>
                <input type="submit" value="Submit"/>
            </form> 
            <br/>
            <div><ul>{list}</ul></div>
            
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

module.exports = Directory;