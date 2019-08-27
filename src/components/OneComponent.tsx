import React, {Suspense, lazy} from "react";

export default class OneComponent extends React.Component {

    private handleOnClick(){
        alert("handleOnClick::OneComponent");
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | string
        | number
        | {} | React.ReactNodeArray
        | React.ReactPortal
        | boolean
        | null
        | undefined {
        return (<a onClick={this.handleOnClick} href="#">OneComponent</a>);
    }
}
