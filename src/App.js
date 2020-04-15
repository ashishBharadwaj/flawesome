import React from 'react';
import TitleBar from './components/title-bar'
import './App.css';

class App extends React.Component
{
    constructor(props)
    {
        super(props)
    }
    render(){
        return(
            [
                <TitleBar/>,
                <div className="appBody">
                    <div className="sideBar"></div>
                    <div className="appContainer"></div>
                </div>,
                <div className="footer"></div>
            ]
        );
    }
}
export default App;