var React = require('react');
var MainNavBar = require ('./components/mainNavbar');


class NewPokemon extends React.Component {
  render() {

    return (
      <html>
        <body style={{textAlign:'center', backgroundColor:'black'}}>
        <MainNavBar />
          <div style={{display: 'inline-block', color:'white', width:'50%', textAlign:'center'}}>
            <h2 style={{color: 'white'}}>New Pokemon Details</h2>
            <form method={'POST'} action={`/pokemon/new`} style={{color: 'white', width:'50%', margin:'0 auto', textAlign:'center'}}>
              <br /><br />Name: <br /><input type={'text'} name={'name'} placeholder={'Name'} />
              <br /><br />Height: <br /><input type={'number'} name={'height'} placeholder={'Height'} step={0.01}/>
              <br /><br />Weight: <br /><input type={'number'} name={'weight'} placeholder={'Weight'} step={0.01} />
              <br /><br />Image Url: <br /><input type={'text'} name={'img'} placeholder={'Image'} />
              <br /><br />Egg: <br /><input type={'text'} name={'egg'} placeholder={'Egg'} />
              <br /><br />Main Type:<br /><input type={'text'} name={'type'} placeholder={'Type'} />
              <br /><br />Main Weakness:<br /><input type={'text'} name={'weaknesses'} placeholder={'Weaknesses'}  />
              <br /><br />Average Spawn: <br /><input type={'number'} name={'avg_spawns'} placeholder={'Average Spawns'} step={0.01} />
              <br /><br />Spawn Time: <br /><input type={'text'} name={'spawn_time'} placeholder={'Spawn Time'} />
              <br /><br /><input type={'submit'} value={'Submit New Pokemon'} />
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewPokemon;