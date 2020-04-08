var React = require('react');

class Pokemon extends React.Component {
  render() {
    const style = {
      display: "flex",
      flexFlow: "column nowrap",
      alignContent: "center",
      justifyContent: "space-around",
      width: "600px",
      margin: "0 auto"
    };

    const rowstyle = {
      width: "500px",
      display: "inline-flex",
      justifyContent: "space-around",
      alignContent: "center",
      border: "1px black solid",
      margin: "0.5px"
    };

    const label = {
      width: "45%",
      fontWeight: "bold",
      textAlign: "middle"
    };
    const info = {
      width: "45%",
      textAlign: "middle"
    };

    let mon = this.props.mon;
    let editlink = "../pokemon/edit/" + mon.id;
    return (
      <html>
        <body>
          <div style={style}>
            <div style={rowstyle}>
              <a href="/" style={{textAlign: "center"}}>Back to the list</a>
              <a href={editlink} style={{textAlign: "center"}}>Edit this Pokemon</a>
            </div>
            <div style={rowstyle}>
              <img src={mon.img} />
            </div>

            <div style={rowstyle}>
              <div style={label}>Number</div>
              <div style={info}>#{mon.num}</div>
            </div>

            <div style={rowstyle}>
              <div style={label}>Name</div>
              <div style={info}>{mon.name}</div>
            </div>

            <div style={rowstyle}>
              <div style={label}>Weight</div>
              <div style={info}>{mon.weight}</div>
            </div>

            <div style={rowstyle}>
              <div style={label}>Height</div>
              <div style={info}>{mon.height}</div>
            </div>

            <div style={rowstyle}>
              <div style={label}>Candy (to evolve)</div>
              <div style={info}>{mon.candy} ({mon.candy_count})</div>
            </div>

            <div style={rowstyle}>
              <div style={label}>Egg Hatch</div>
              <div style={info}>{mon.egg}</div>
            </div>

            <div style={rowstyle}>
              <div style={label}>Spawn Time (Avg Spawns)</div>
              <div style={info}>{mon.spawn_time} ({mon.avg_spawns})</div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
