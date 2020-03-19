export function getColorCodes(){
    const codes = [];
    for(let i=0;i<360;i+=18){
        codes.push(`hsl(${i},50%, 50%)`);
    }
    return codes;
};