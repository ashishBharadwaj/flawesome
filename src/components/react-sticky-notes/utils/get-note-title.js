export function getNoteTitle({ title, text, limit = 10, delimiter = null } ) {
	let _title;
	if(title){
		_title = String( title );
	}else if(delimiter){
		_title = String( text ).split(delimiter)[ 0 ];
	}else{
		_title = String(text).substr(0, limit);
	}
	return _title.substr(0, 1).toUpperCase() + _title.substr(1, _title.length);
}
