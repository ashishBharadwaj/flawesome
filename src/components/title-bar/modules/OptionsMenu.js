import React from 'react';
import { Menu,  MenuItem, Popover, Position} from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
const shell = window.electron.shell;
export default class OptionsMenu extends React.PureComponent{
   constructor(props){
       super(props);
       this.handleOpenAboutWindow = this.handleOpenAboutWindow.bind(this);
       this.handleReportBug = this.handleReportBug.bind(this);
   } 
   handleOpenAboutWindow(e){
        this.props.openAbout(true);
   }

   handleReportBug(e){
       shell.openExternal("https://docs.google.com/forms/d/e/1FAIpQLSeUpOj6hMS8H8sfiju7OzADnb8Q7Frw5Bw55tmYMSIuA4NJpQ/viewform?usp=sf_link");
   }

   render(){
        const exampleMenu = (
            <Menu>
                <MenuItem icon="help" text="About" onClick={this.handleOpenAboutWindow} />
                <MenuItem icon="build" text="Report a Bug ?" onClick={this.handleReportBug}/>
            </Menu>
        );
       return(
       <Popover popoverClassName="bp3-dark" content={exampleMenu} position={Position.BOTTOM}>
            <div className = "ab_TB_Options"> </div>
        </Popover>
       );
   }
}