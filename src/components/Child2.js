import React from "react";
class Child2 extends React.Component {
    render() {
            
            return (
                <div>
                    Data from parent is:{this.props.dataFromParent}
                </div>
            );
        }
    }
    export default Child2
// import { Component, createRef } from 'react';
// import Strapi from "strapi-sdk-js"

// class Test extends Component<any, any> {

//     // OR with options
//     strapi = new Strapi({
//         url: process.env.STRAPI_URL || "http://localhost:1337",
//         store: {
//             key: "strapi_jwt",
//             useLocalStorage: false,
//             cookieOptions: { path: "/" },
//         },
//         axiosOptions: {},
//     })


//     constructor(props: any, state: any) {
//         super(props);
//         this.state = {
//             loading: false,
//             workspaces: []
//         };
//     }

//     async componentDidMount() {
//         //await this.setState({ loading:true});

//         //await this.setState({ workspaces: [{ id: 1, name: "workspac1" }, { id: 2, name: "workspac2" }] });
//         await this.setState({ workspaces: this.strapi.find("workspaces",{}) })
//     }

//     render() {

//         var { myProp, newProp } = this.props;
//         var { workspaces } = this.state;

//         if (!workspaces || workspaces.length <= 0) return "";

//         console.log("rendering...");

//         return (
//             <div>
//                 {workspaces.map((item: any) => {
//                     return (
//                         <p key={item.id}>{item.name}</p>
//                     )
//                 })}

//                 <div>{myProp} {newProp}</div>
//             </div>
//         )
//     }

// }

// export default Test;