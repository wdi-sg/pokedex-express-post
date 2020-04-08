var React = require('react');

class NewMonster extends React.Component {
  render() {
    const bodystyle = {
      margin: "0 auto",
      width: "400px"
    };
    const formstyle = {
      display: "block",
      height: "1.5em",
      width: "300px"
    };

    const newMon = this.props.mon;
    let monid = newMon.id;
    let monnum = newMon.num;
    let monname = newMon.name;
    let monimg = newMon.img;
    let monheight = newMon.height;
    let monweight = newMon.weight;
    let style = formstyle;

    return (
      <html>
        <body>
          <div style={bodystyle}>

            <form method="POST" action="/pokemon">
              <label style={style}>Pokemon ID</label>
              <input style={style} name="monid" defaultValue={monid}/>

              <label style={style}>Pokemon Number</label>
              <input style={style}name="monnum" defaultValue={monnum}/>

              <label style={style}>Pokemon Name</label>
              <input style={style} name="monname" defaultValue={monname}/>

              <label style={style}>Pokemon Image URL</label>
              <input style={style} type="url" name="monimg" defaultValue={monimg}/>

              <label style={style}>Pokemon Height (in m)</label>
              <input style={style} name="monheight" defaultValue={monheight}/>

              <label style={style}>Pokemon Weight (in kg)</label>
              <input style={style} name="monweight" defaultValue={monweight}/>

              <input style={style} type="submit" value="Submit"></input>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewMonster;
