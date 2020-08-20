//const LZString = import('./lz-string'); 
const electron = require('electron');
const path = require('path');
const fs = require('fs');
class Store {
  
  constructor(opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, opts.name + '.json');    
    this.data = parseDataFile(this.path);
    // console.log("Store Initilixed with value :");
    // console.log(this.data);
  }

  get(key) {
    if(this.data[key] !== undefined){
      // console.log("Key "+ key + " is defined with value : ")
      this.data[key].date = new Date(key);
      return this.data[key];
      // console.log(this.data[key]);
    }
    else{
      return;
    }
  }
  getAll()
  {
    return this.data;
  }  
  // ...and this will set it
  set(key, val) {
    this.data[key] = JSON.parse(val);    
  }
  save()
  {
    if(this.data && Object.keys(this.data).length > 0){
      fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
  }
}

function parseDataFile(filePath) {
  
  try {
    let dat = JSON.parse(fs.readFileSync(filePath));
    return dat != null ? dat : {} ;
  } catch(error) {
    return {};
  }
}


module.exports = Store;