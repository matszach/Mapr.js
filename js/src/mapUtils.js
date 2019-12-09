MapUtils = {

    generateNewEmptyMap(width, height, defaultColor){
        
        var fields = new Array(width);
        for(var i = 0; i < width; i++){
            fields[i] = new Array(height);
            for(var j = 0; j < height; j++){
                fields[i][j] = defaultColor;
            }
        }

        var locations = new Array();
        
        var paths = new Array();

        var map = {
            width: width,
            height: height,
            fields: fields,
            locations: locations,
            paths: paths,
        }

        return map;
    },

    generateMouseDefaults(){
        var mouse ={
            mouseX : -1, 
            mouseY : -1,
            mouseFieldX : -1,
            mouseFieldY : -1,
            isLeftDown : false,
            isRightDown : false,

            isActive(){
                return this.mouseX > -1;
            },
        }

        return mouse;
    },

    generateDisplayDefaults(){
        var display = {
            // BASE_FIELD_SIZE : 25,
            // BASE_GRID_WIDTH : SettingsManager.displaySettings.borderWidthRatio * 25,
            scale : 1,
            // MIN_SCALE : SettingsManager.displaySettings.MIN_SCALE,
            // MAX_SCALE : SettingsManager.displaySettings.MAX_SCALE,
            // SCALE_MOD : 0.90,
            // GRID_SHOW_SCALE_LIMIT : SettingsManager.displaySettings.gridDisplayScaleLimit,
            offsetX : 0,
            offsetY : 0,
        }

        return display;
    }

}