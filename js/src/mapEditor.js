const MapEditor = {

    /**
     * =====================================================================================================
     * ============================================= INITIALISATION ========================================
     * =====================================================================================================
     */

    /**
     * called on page loading
     */
    init(){
        this.refitCanvas();
        this.startDrawingInterval();
        this.attachListeners();
        this.loadTool(new PainterTool());
    },

    /**
     * attaching listeners
     */
    attachListeners(){
        $('#mapCanvas').on('wheel', this.handleOnScrollZoom);
        $('#mapCanvas').on('mousemove', this.handleMouseAction);
        $('#mapCanvas').on('mousedown', this.handleMouseAction);
        $('#mapCanvas').on('mouseup', this.handleMouseAction);
        $('#mapCanvas').on('mouseleave', this.handleMouseReset);
    },


    /**
     * =====================================================================================================
     * ============================================= GENERIC ===============================================
     * =====================================================================================================
     */

    /**
     * canvas referencing
     */
    getCanvas(){
        return document.getElementById('mapCanvas');
    },

    getContext(){
        return this.getCanvas().getContext('2d');
    },


    /**
     * variables and constants
     */
    drawingInterval : null,

    /**
     * starts (restarts) the draw interval
     */
    startDrawingInterval(){
        if(this.drawingInterval){
            clearInterval(this.drawingInterval);
        }
        setInterval(this.drawOnCanvas, 10);
    },

    colors : {
        BACKGROUND_COLOR : '#000000',
        GRID_COLOR : '#222222',
    },

    display : MapUtils.generateDisplayDefaults(),
    mouse : MapUtils.generateMouseDefaults(),
    map : MapUtils.generateNewEmptyMap(200, 140,'#00009f'),

    openNewMap(width, height){
        this.map = MapUtils.generateNewEmptyMap(width, height,'#00009f');
    },

    /**
     * canvas has to be resized manually in javascript, 
     * resizing in though css would lead to distored images
     */
    refitCanvas(){
        var canvas = this.getCanvas();
        canvas.width = $('#mapDiv').width();
        canvas.height = $('#mapDiv').height();
    },


    /**
     * checks if the field indexes fit within the current map
     */
    isFieldInMapRange(x, y){
        var map = MapEditor.map;
        if(x < 0 || x >= map.width){
            return false;
        } else if(y < 0 || y >= map.height) {
            return false;
        } else {
            return true;
        }
    },

    /**
     * =====================================================================================================
     * ============================================= DRAWING ===============================================
     * =====================================================================================================
     */

    /**
     * called by the draw interval
     */
    drawOnCanvas(){
        // drawing is suspended if the window is minimized or the user tabbed out of the editor
        if(document.hidden){
            return;
        }
        // "this" wound now refer to the interval instead of the map editor
        var context = MapEditor.getContext(); 
        var displayVariables = MapEditor.getDisplayVariables();
        MapEditor.clearCanvas(context, displayVariables);
        MapEditor.handleTooluse();
        MapEditor.drawFields(context, displayVariables);
        MapEditor.drawGrid(context, displayVariables);
        MapEditor.drawLocations(context, displayVariables);
        if(MapEditor.currentTool){
            MapEditor.currentTool.drawMouseHighlight(context, displayVariables);
        }
    },

    /**
     * constructs a display variables obkect to be passed to various draw functions
     */
    getDisplayVariables(){
        var disp = MapEditor.display;

        var canvasWidth = $('#mapCanvas').width();
        var canvasHeight = $('#mapCanvas').height();
        var fieldSize = disp.BASE_FIELD_SIZE * disp.scale;
        var gridWidth = disp.BASE_GRID_WIDTH * disp.scale;
        var offsetX = disp.offsetX % fieldSize;
        if(offsetX < 0) offsetX += fieldSize; // fixes issued when jumping between positive and nagative MapEditor.display.offset
        var offsetY = disp.offsetY % fieldSize;
        if(offsetY < 0) offsetY += fieldSize;
        var startX = Math.ceil(- disp.offsetX / fieldSize);
        var startY = Math.ceil(- disp.offsetY / fieldSize);
        var endX = startX + Math.ceil(canvasWidth / fieldSize);
        var endY = startY + Math.ceil(canvasHeight / fieldSize);
        var shouldDrawGrid = disp.scale >= disp.GRID_SHOW_SCALE_LIMIT;
        
        var displayVariables = {
            canvasWidth : canvasWidth,
            canvasHeight : canvasHeight,
            fieldSize : fieldSize,
            gridWidth : gridWidth,
            offsetX : offsetX,
            offsetY : offsetY,
            startX : startX,
            startY : startY,
            endX : endX,
            endY : endY,
            shouldDrawGrid : shouldDrawGrid,
        }

        return displayVariables;
    },

    clearCanvas(context, dv){
        context.clearRect(0, 0, dv.canvasWidth, dv.canvasHeight);
    },

    drawGrid(context, dv){
        if(!dv.shouldDrawGrid){return;}
        context.beginPath();
        context.strokeStyle = MapEditor.colors.GRID_COLOR;
        context.lineWidth = dv.gridWidth;
        context.setLineDash([]);
        for(var x = dv.startX; x <= dv.endX; x++){
            var xLoc = (x - dv.startX) * dv.fieldSize + dv.offsetX;
            context.moveTo(xLoc, 0);
            context.lineTo(xLoc, dv.canvasHeight);
        }
        for(var y = dv.startY; y <= dv.endY; y++){
            var yLoc = (y - dv.startY) * dv.fieldSize + dv.offsetY;
            context.moveTo(0, yLoc);
            context.lineTo(dv.canvasWidth, yLoc);
        }
        context.stroke();
    },

    drawFields(context, dv){
        var map = MapEditor.map;
        var drawnFieldSize = Math.ceil(dv.fieldSize); // prevents the empty lines between fields in a zoomed out view
        for(var x = dv.startX - 1; x <= dv.endX; x++){ // the "-1" allows the fields not fully in view to be drawn
            for(var y = dv.startY - 1; y <= dv.endY; y++){
                if(!MapEditor.isFieldInMapRange(x, y)){
                    continue;
                }
                context.fillStyle = map.fields[x][y];
                var xLoc = (x - dv.startX) * dv.fieldSize + dv.offsetX;
                var yLoc = (y - dv.startY) * dv.fieldSize + dv.offsetY;
                context.fillRect(xLoc, yLoc, drawnFieldSize, drawnFieldSize); 
            }
        }
    },

    drawLocations(context, dv){
        var locations = MapEditor.map.locations;
        for(var i = 0; i < locations.length; i++){
            var loc = locations[i];
            if(MapEditor.isLocationInDisplayRange(loc, dv.startX - 1, dv.startY - 1, dv.endX + 1, dv.endY + 1)){
                var image = AssetManager.symbols[loc.symbolIndex];
                var xLoc = (loc.positionX - dv.startX - 0.5 * loc.sizeScale) * dv.fieldSize + dv.offsetX;
                var yLoc = (loc.positionY - dv.startY - 0.5 * loc.sizeScale) * dv.fieldSize + dv.offsetY;
                var size = dv.fieldSize * loc.sizeScale;
                context.drawImage(image, xLoc, yLoc, size, size);
            }
        }
    },

    isLocationInDisplayRange(location, xMin, yMin, xMax, yMax){
        if(xMin > location.positionX || xMax < location.positionX ||
           yMin > location.positionY || yMax < location.positionY){
            return false;
        }
        return true;
    },

    /**
     * =====================================================================================================
     * ============================================= ZOOMING ===============================================
     * =====================================================================================================
     */

    /**
     * zooming
     */
    handleOnScrollZoom(e){
        var event = e.originalEvent;
        var disp = MapEditor.display;

        var newScale;
        var zoomDir;

        if(event.deltaY < 0){
            if(disp.scale >= disp.MAX_SCALE){
                return;
            }
            newScale = disp.scale / disp.SCALE_MOD;
            zoomDir = -1;
        } else {
            if(disp.scale <= disp.MIN_SCALE){
                return
            }
            newScale = disp.scale * disp.SCALE_MOD;
            zoomDir = 1;
        }


        // var changeRatio = 1 * disp.scale/newScale;

        // var screenWidth = $('#mapCanvas').width();
        // var screenHeight = $('#mapCanvas').height();


        // var widthChange = screenWidth * changeRatio;
        // var heightChange = screenHeight * changeRatio;

        // disp.offsetX -= disp.offsetX * changeRatio;
        // disp.offsetY -= disp.offsetY * changeRatio;

        // disp.offsetX /= newScale/disp.scale;
        // disp.offsetY /= newScale/disp.scale;

        disp.scale = newScale;
        MapEditor.setMousePosition(e); // has to be called right after zooming to hide momentary curser location bugs
    },

    /**
     * =====================================================================================================
     * ============================================= MOUSE ACTION ==========================================
     * =====================================================================================================
     */


    handleMouseReset(){
        MapEditor.mouse = MapUtils.generateMouseDefaults();
        $('#mapCanvas').css('cursor', 'pointer');
    },


    handleMouseAction(e){
        var event = e.originalEvent;
        var buttons = event.buttons;
        MapEditor.handleDownUpButtons(buttons);
        MapEditor.handleMouseDrag(event);
        MapEditor.setMousePosition(event);
    },


    handleDownUpButtons(buttons){
        var mouse = MapEditor.mouse;
        if(buttons == 0 || buttons == 4){
            if(mouse.isLeftDown || mouse.isRightDown){
                $('#mapCanvas').css('cursor', 'pointer');
            }
            mouse.isLeftDown = false;
            mouse.isRightDown = false;
        } else if(buttons == 1 || buttons == 5){
            if(!mouse.isLeftDown || !mouse.isRightDown){
                $('#mapCanvas').css('cursor', 'crosshair');
            }
            mouse.isLeftDown = true;
            mouse.isRightDown = false;
        } else if(buttons == 2 || buttons == 6){
            if(!mouse.isRightDown){
                $('#mapCanvas').css('cursor', 'grabbing');
            }
            mouse.isLeftDown = false;
            mouse.isRightDown = true;
        } else if(buttons == 3 || buttons == 7){
            if(!mouse.isRightDown){
                $('#mapCanvas').css('cursor', 'grabbing');
            }
            mouse.isLeftDown = true;
            mouse.isRightDown = true;
        }
    },

    handleMouseDrag(event){
        var mouse = MapEditor.mouse;
        if(mouse.isRightDown && mouse.mouseX > 0){
            var disp = MapEditor.display;
            var off = $('#mapCanvas').offset();
            var x = event.pageX - off.left - mouse.mouseX;
            var y = event.pageY - off.top - mouse.mouseY;
            disp.offsetX += x;
            disp.offsetY += y;
        }
    },

    currentTool : null,

    loadTool(tool){
        this.currentTool = tool,
        this.currentTool.init();
    },

    loadPainterTool(){
        this.loadTool(new PainterTool());
    },

    loadLocationTool(){
        this.loadTool(new LocationTool());
    },

    handleTooluse(){
        var mouse = MapEditor.mouse;
        var x = mouse.mouseFieldX;
        var y = mouse.mouseFieldY;
        var isLeftDown = mouse.isLeftDown && !mouse.isRightDown;
        if(MapEditor.currentTool){
            MapEditor.currentTool.use(x, y, isLeftDown);
        }
    },


    setMousePosition(event){
        var mouse = MapEditor.mouse;
        var off = $('#mapCanvas').offset();
        mouse.mouseX = event.pageX - off.left;
        mouse.mouseY = event.pageY - off.top;
        var disp = MapEditor.display;
        mouse.mouseFieldX = (mouse.mouseX - disp.offsetX)/(disp.BASE_FIELD_SIZE * disp.scale);
        mouse.mouseFieldY = (mouse.mouseY - disp.offsetY)/(disp.BASE_FIELD_SIZE * disp.scale);
    }

};