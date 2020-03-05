export function parseCSV(str) {
    var arr = [];
    var quote = false;

    for (var row = 0, col = 0, c = 0; c < str.length; c++) {
        var currentCharacter = str[c], nextCharacter = str[c+1];
        arr[row] = arr[row] || [];
        arr[row][col] = arr[row][col] || '';

        if (currentCharacter == '"' && quote && nextCharacter == '"') { 
            arr[row][col] += currentCharacter; 
            ++c; 
            continue; 
        }  

        if (currentCharacter == '"') { 
            quote = !quote; 
            continue; 
        }

        if (currentCharacter == ',' && !quote) {
            ++col; 
            continue; 
        }

        if (currentCharacter == '\r' && nextCharacter == '\n' && !quote) {
            col = 0; 
            ++row; 
            ++c; 
            continue; 
        }

        if ( ( currentCharacter == '\r' || currentCharacter == '\n' )&& !quote) { 
            ++row; 
            col = 0; 
            continue;
        }

        arr[row][col] += currentCharacter;
    }
    const results = [];
    const headers = arr[0];
    for(let i = 1;i<arr.length;i++){
        const result = {};
        for(let j = 0;j<arr[i].length;j++){
            result[headers[j]]=arr[i][j];
        }
        results.push(result);
    }
    return results;
}