export default class Draggable {
    dx=0;
    dy=0;
    percentX = 0;
    percentY = 0;
    currentX = 0;
    currentY = 0;
    init(options) {
        this.options = options;
    }
    onMouseMove = (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        const el = this.options.element;
        const parentElement = el.parentElement;
        const pRect = parentElement?parentElement.getBoundingClientRect():{left:0,top:0};
        const position = this.getPosition(e, this.dx, this.dy);
        let x = position.left - pRect.left;
        let y = position.top - pRect.top;
        this.currentX = x>0?x:0;
        this.currentY = y>0?y:0;

        if(this.options.useBoundaries){
            const maxX = pRect.width-el.offsetWidth;
            const maxY = pRect.height-el.offsetHeight;

            if(this.currentX>=maxX){
                this.currentX = maxX;
            }

            if(this.currentY>=maxY){
                this.currentY = maxY;
            }
        }
        if(this.options.unit==="%"){
            this.percentX = this.currentX*100/pRect.width;
            this.percentY = this.currentY*100/pRect.height;
            this.setTranslate(`${this.percentX}%`, `${this.percentY}%`);
        }else{
            this.setTranslate(`${this.currentX}px`, `${this.currentY}px`);
        }


    }
    onMouseDown = (e) => {
        const el = this.options.element;
        const parentElement = el.parentElement;
        const rect = el.getBoundingClientRect();
        const pRect = parentElement?parentElement.getBoundingClientRect():{left:0,top:0};
        this.currentX = - pRect.left + rect.left;
        this.currentY = - pRect.top + rect.top;
        
        const position = this.getPosition(e);
        this.dx = position.left - rect.left;
        this.dy = position.top - rect.top;
        
        el.classList.add('draggable');

        document.addEventListener('mousemove', this.onMouseMove, null);
        document.addEventListener('mouseup', this.onMouseUp, null);
        document.addEventListener('touchmove', this.onMouseMove, {passive: false});
        document.addEventListener('touchend', this.onMouseUp, {passive: false});
        
    }
    onMouseUp = (e) => {
        if(this.options.onDragComplete){
            this.options.onDragComplete.call(this, {
                x: this.currentX,
                y: this.currentY,
                px: this.percentX,
                py: this.percentY
            })
        }
        
        this.options.element.classList.remove('draggable');
        
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('touchmove', this.onMouseMove);
        document.removeEventListener('touchend', this.onMouseUp);
    }
    setTranslate(x, y) {
        if(this.options.element){
            if(!this.options.disabledAxisX){
                this.options.element.style.left = x;
            }
            if(!this.options.disabledAxisY){
                this.options.element.style.top = y;
            }
        }
    }
    getPosition(e, dx=0, dy=0){
        if ((/touch/).test(e.type)) {
            return {
                left: e.touches[0].clientX - dx,
                top: e.touches[0].clientY - dy,
                x: e.touches[0].clientX - dx,
                y: e.touches[0].clientY - dy
            };
        } else {
            return {
                left: e.clientX - dx,
                top: e.clientY - dy,
                x: e.clientX - dx,
                y: e.clientY - dy
            };
        }
    }
}
