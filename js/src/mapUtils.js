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
            scale : 1,
            offsetX : 2 * BASE_FIELD_SIZE,
            offsetY : 2 * BASE_FIELD_SIZE,
        }

        return display;
    }

}