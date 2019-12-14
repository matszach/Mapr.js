class Tool{

    /**
     * Insterted as tool panel's html
     */
    toolPanelHtml;

    /**
     * Marks the tool as currently in use
     */
    isInUse;

    /**
     * Embeds the toolPanelHtml 
     */
    embed(){
        $('#toolsPanelDiv').html(this.toolPanelHtml);
    }

    /**
     * Any other actions that have to be taken upon the tool loading
     */
    postLoad(){
        // abstract
    }

    /**
     * Called on tool choosen
     */
    init(){
        this.embed();
        this.postLoad();
    }

    /**
     * Called every frame
     * @param {Number} x - mouse location's x
     * @param {Number} y - mouse location's y
     * @param {Boolean} mouseLeftState - mouse left button state
     * @param {Boolean} mouseRightState - mouse right button state
     */
    use(x, y, mouseLeftState, mouseRightState){
        if(mouseRightState){
            this.usageCancel(x, y);
        }else if(mouseLeftState){
            if(!this.isInUse){
                this.isInUse = true;
                this.usageStart(x, y);
            } else {
                this.usageHeld(x, y);
            }
        } else {
            if(this.isInUse){
                this.isInUse = false;
                this.usageRelease(x, y);
            }
        }

    }

    usageStart(x, y){
        // abstract, optional
    }
    usageHeld(x, y){
        // abstract, optional
    }
    usageRelease(x, y){
        // abstract, optional
    }
    usageCancel(x, y){
        // abstract, optional
    }


    /**
     * Draw action at mouse location
     * @param {CanvasRenderingContext2D} canvas  
     * @param {Object} dv - display values 
     */
    drawMouseHighlight(canvas, dv){
        // abstract, optional
    }
}