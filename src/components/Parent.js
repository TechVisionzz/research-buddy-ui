import React from "react";
import Child2 from "./Child2";
import Child1 from "./Child1";
class Parent extends React.Component {
    // this code is for sending data from parent to child


    // state = { data : "Hello World" } 
    // render() 
    // {
    //     return (
    //         <div>
    //             <Child2 dataFromParent = {this.state.data} />
    //         </div>
    //     );         
    // }

    //code end for parent to child
    //code start for child to parent using call back function
            state = { message: "" }
        callbackFunction = (childData) => {
            this.setState({message: childData})
        }


        render() {
                return (
                    <div>
                        <Child1 parentCallback = {this.callbackFunction}/>
                        <p> {this.state.message} </p>
                    </div>
                );
        }




}
export default Parent