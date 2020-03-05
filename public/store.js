//const LZString = import('./lz-string'); 
const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
  
  constructor(opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, opts.name + '.json');
    
    this.data = parseDataFile(this.path, opts.defaults);
    this.defaults = opts.defaults;
    // console.log("Store Initilixed with value :");
    // console.log(this.data);
  }

  get(key) {
    if(this.data[key] !== undefined){
      // console.log("Key "+ key + " is defined with value : ")
      this.data[key].date = new Date(key)
      // console.log(this.data[key]);
    }
    else{
      this.data[key] = {
        date: new Date(key),
        editorState: "",
        notes: [],
        todoState:{
            tasksRemaining: 0,
            tasks:[]                    
        }
      }
      // console.log("Key "+ key + " is NOT defined returning value : ")
      // console.log(this.data[key])
    }
    return this.data[key];
  }
  
  // ...and this will set it
  set(key, val) {
    this.data[key] = JSON.parse(val);    
  }
  save()
  {
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  
  try {
    let dat = JSON.parse(fs.readFileSync(filePath));
    return dat != null ? dat : defaults ;
  } catch(error) {
    return defaults;
  }
}


module.exports = Store;