import React, {Component} from "react";
import Handler from "./Handler";
import Login from "./Login"

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: undefined
    }

    this.setCredentials = this.setCredentials.bind(this);
  }

  setCredentials(name){
    this.setState({name});
  }

  render(){
    const {name, id} = this.state;
    if(!name) return <Login creds={this.setCredentials} />;
    else{
      const creds = { name }
      return(
        <div>
          <h1>{`${name}`}</h1>
          <Handler creds={creds} />
        </div>
      )
    }
  }
}

export default App;
