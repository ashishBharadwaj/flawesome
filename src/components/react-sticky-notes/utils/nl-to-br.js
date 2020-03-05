export function nlToBr(str) {
    return str?str.replace(/(?:\r\n|\r|\n)/g, '<br>'):'';
}