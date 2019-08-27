import React, {Suspense, lazy} from "react";
import {render} from "react-dom";
import {Tabs} from "react-bootstrap";
import Tab from "react-bootstrap/Tab";

import "./styles.css";
import TwoComponent from "./components/TwoComponent";

const renderLoader = () => <p>Loading</p>;

interface TabType {
    name: string;
    components: string[];
}

interface Templates {
    tabs: TabType[];
}

const templateTabsModules: Templates = {
    tabs: [
        {
            name: "Title for Tab 1",
            components: ["./components/OneComponent"]
        },
        {
            name: "Title for Tab 2",
            components: ["./components/TwoComponent"]
        }
    ]
};


const SympleLazyComponent = lazy(() => import("./components/TwoComponent"));


class App extends React.Component {

    render():
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | string
        | number
        | {}
        | React.ReactNodeArray
        | React.ReactPortal
        | boolean
        | null
        | undefined {
        return (
            <div className="App">
                <h3>Example with normal string path</h3>
                <code>
                    const LazyComponent =
                    lazy(() =>
                    import("./components/TwoComponent"));
                </code>

                <hr/>

                <Suspense fallback={<div>Loading</div>}>
                    <SympleLazyComponent/>
                </Suspense>

                <h3>Example with dynamic path</h3>

                <Tabs id="tab">
                    {templateTabsModules.tabs.map((tab, index) => {
                        return (
                            <Tab title={tab.name} key={index}>
                                <p>The component should appears bellow:</p>
                                <Suspense fallback={<div>Loading</div>}>
                                    {tab.components.map(component => {
                                        const DynamicLazyComponent = lazy(() => import(
                                            /* webpackChunkName: "my-chunk-name" */
                                            /* webpackMode: "lazy" */
                                            `${component}`
                                            ).then(comp => comp));

                                        return (<DynamicLazyComponent />)
                                    })}
                                </Suspense>
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
render(<App/>, rootElement);
