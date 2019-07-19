var React = require('react');
class DisplayData extends React.Component {

  render() {

    let result = this.props.items.map(item=>{
        if("tax" in item.product.inventories[0]){
            return <li><h4>{item.product.title}</h4>{item.product.description}<br/><br/>Availability : {item.product.inventories[0].availability}<br/><br/><p>Tax: {item.product.inventories[0].tax}</p></li>
        }else{
            return <li><h4>{item.product.title}</h4><br/><br/>{item.product.description}<br/><br/>Availability : {item.product.inventories[0].availability}<br/><br/></li>
        }

    })

    return (
      <html>
        <body>
          <div>
            <ul>{ result }</ul>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = DisplayData;