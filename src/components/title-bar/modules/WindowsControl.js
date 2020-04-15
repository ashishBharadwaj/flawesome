import React from 'react';
const remote  = window.electron.remote;
export default class WindowsControl extends React.Component{
    constructor(props){
        super(props)
        this.getCurrentWindow = this.getCurrentWindow.bind(this);
        this.minimizeWindow = this.minimizeWindow.bind(this);
        this.maximizeWindow = this.maximizeWindow.bind(this);
        this.unmaximizeWindow = this.unmaximizeWindow.bind(this);
        this.maxUnmaxWindow = this.maxUnmaxWindow.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.isWindowMaximized = this.isWindowMaximized.bind(this);    
        this.state = {
            isMaximized : this.isWindowMaximized()
        };
    }
    getCurrentWindow() {
        return remote.getCurrentWindow();
    }

    minimizeWindow(browserWindow = this.getCurrentWindow()) {
        if (browserWindow.minimizable) {
          browserWindow.minimize();
        }
    }
      
    maximizeWindow(browserWindow = this.getCurrentWindow()) {
        if (browserWindow.maximizable) {
          browserWindow.maximize();
        }
    }
      
    unmaximizeWindow(browserWindow = this.getCurrentWindow()) {
        browserWindow.unmaximize();
    }
      
    maxUnmaxWindow(browserWindow = this.getCurrentWindow()) {
        if (browserWindow.isMaximized()) {
          browserWindow.unmaximize();
        } else {
          browserWindow.maximize();
        }
        this.setState({isMaximized: this.isWindowMaximized()})
    }
    
    closeWindow(browserWindow = this.getCurrentWindow()) {
        browserWindow.close();
    }
      
    isWindowMaximized(browserWindow = this.getCurrentWindow()) {
        return browserWindow.isMaximized();
    }
    render(){
        return(            
            <div className = "ab_TB_WinControls">
                <div className="ab_icons ab_minimizeIcon" onClick={ () => { this.minimizeWindow() }}>
                </div>
                <div className={"ab_icons " + (this.state.isMaximized ? "ab_restoreIcon" : "ab_maximizeIcon")} onClick={ () => { this.maxUnmaxWindow() }}>
                </div>
                <div className="ab_icons ab_closeIcon" onClick={ () => {this.closeWindow()}}>                    
                </div>
            </div>
        );
    }
}
