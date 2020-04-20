import React from 'react';
import {Overlay, Classes, H4,  Button, Intent } from "@blueprintjs/core";
import '../styles/About.scss'
import logo from '../media/icon.png'
const remote = window.electron.remote;
export default class AboutWindow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen: props.isOpen || false,
            usePortal: true,
            productVersion: remote.app.getVersion(),
            electronVersion: remote.process.versions.electron,
            chromeVersion: remote.process.versions.chrome
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleOpen(){
        this.setState({isOpen: true}, ()=>{ this.props.onAboutChange(this.state.isOpen) });
    }
    handleClose(){
        this.setState({isOpen: false}, ()=>{ this.props.onAboutChange(this.state.isOpen) });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            this.props = nextProps;
            this.setState({isOpen: nextProps.isOpen})
        }
    }
    render(){
        return(
            <Overlay popoverClassName="bp3-dark" className="ab_AboutWindow" onClose={this.handleClose} {...this.state} portalContainer = {document.querySelector("#modal")}>
                <div className={Classes.CARD  + " " + Classes.ELEVATION_4 + " docs-overlay-example-transition"}>
                    <div className="ab_AW_winContent">                        
                        <img src={logo} className="ab_AW_logo" alt="logo"/>
                        <H4>About donna.ai</H4>
                        <p id="ab_AW_description"> donna.ai is a productivity tool that will help you organize your day today work and thoughts.</p>
                        <p> Product Version : {this.state.productVersion} </p>
                        <p> Electron Version : {this.state.electronVersion}</p>
                        <p> Chrome Version : {this.state.chromeVersion}</p>
                        <div className="ab_AW_copyRight">© Ashish Bharadwaj J</div>
                        
                        <div className={"ab_AW_closeButton"}>
                            <Button intent={Intent.PRIMARY} onClick={this.handleClose} style={{ margin: "" }}>
                                        Close
                            </Button>
                        </div>
                    </div>
                </div>
            </Overlay>
        );
    }
}