import React from "react";

class message extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         message:'hello visitor'
    //     };
    //   }
    //   changemessage(){
    //       this.setState({
    //           message:'thanks for subscribe'
    //       })
    //   }
    render() {
      return (
        <div>
          <h1>{this.state.message}</h1>
          <button onClick={()=>this.changemessage()}>subscribe</button>
        </div>
      );
    }
  }
  export default message