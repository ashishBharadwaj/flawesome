export function getCurrentDateTime(){ 
    return new Date().toISOString().replace('T',' ').substring(0, 19);
}
