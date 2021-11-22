import React from "react";
class Child1 extends React.Component{
    sendData = () => {
    this.props.parentCallback("send data from child to parent?");
}

render() { 
    return(<div>
{this.sendData}
    </div>

    )
//Any time you wish to send data from child to parent component, call the sendData function.
}
};
export default Child1