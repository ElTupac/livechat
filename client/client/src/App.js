import React, {Component} from "react";
import Handler from "./Handler";
import Login from "./Login"

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: undefined,
      id: undefined
    }

    this.setCredentials = this.setCredentials.bind(this);
  }

  setCredentials(name, _id){
    this.setState({name: name, id: _id});
  }

  render(){
    const {name, id} = this.state;
    if(!name && !id) return <Login creds={this.setCredentials} />;
    else{
      const creds = { name, id }
      return(
        <div>
          <h1>{`${name}#${id}`}</h1>
          <Handler creds={creds} />
        </div>
      )
    }
  }
}

export default App;
