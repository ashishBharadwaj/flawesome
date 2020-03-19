const reducer = (state, action) => {
    const viewSizes = ['bubbleview', 'normalview', 'pageview'];
    const params = action.payload&&action.payload.data?Object.keys(action.payload.data):[];
    let { items, viewSize, modal } = state;
    switch (action.type) {
		case 'changemodal':
		    modal = action.payload.modal;
        break;
		case 'import':
            modal = null;
            items = action.payload.items;
        break;
		case 'changeview':
            modal = null;
		    const currentViewSize = viewSizes.indexOf(viewSize);
		    viewSize = currentViewSize>-1&&currentViewSize<viewSizes.length-1?viewSizes[currentViewSize+1]:viewSizes[0];
        break;
        case 'add':
            items = items.map((item)=>{
                item.selected = false;
                return item;
            });
            items.splice(action.payload.index, 0, action.payload.data);
            break;
        case 'update':
            items = items.map((item)=>{
                if(item.id===action.payload.data.id){
                    item = {...item, ...action.payload.data };
                }
                if(params.indexOf('selected')!==-1){
                    item.selected = item.id===action.payload.data.id?action.payload.data.selected:false;
                }
                if(params.indexOf('menu')!==-1){
                    item.menu = item.id===action.payload.data.id?action.payload.data.menu:false;
                }
                return item;
            });
            break;
        case 'delete':
            const index = items.findIndex(item=>action.payload.data.id===item.id);
            if(index!==-1){
                items.splice(index,1);
            }else{
                items.splice(0,items.length);
            }
            break;
        default:
                items = state.items;
            break;
    }
    return { items, viewSize, modal };
}
export default reducer;
