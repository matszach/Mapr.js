
class EraserTool extends Tool{

    toolPanelHtml = `
    <div class='toolPanelComponentDiv'>
        <input type='range' class='toolSlider' id='eraserSizeSlider' min=1 max=100 value=5 step=1
            onchange='MapEditor.currentTool.applyEraserSizeFromRangeSlider()'/>
        <span class='toolSliderValue' id='eraserSizeValue'></span>     
    </div>
    <div class='toolPanelComponentDiv'>
        <input type='submit' class='eraseChoiceButton' id='erasePathsToggleButton'
            value='' onclick="MapEditor.currentTool.toggleErasePaths()" '/>  
        <input type='submit' class='eraseChoiceButton' id='eraseTextToggleButton'
            value='' onclick="MapEditor.currentTool.toggleEraseText()" '/>
        <input type='submit' class='eraseChoiceButton'  id='eraseLocationsToggleButton'
            value='' onclick="MapEditor.currentTool.toggleEraseLocations()" />  
    </div>
    `;

    selectedEraseRange = 1;
    isPathErasing = true;
    isTextErasing = true;
    isLocationsErasing = true;

    postLoad(){
        this.applyEraserSizeFromRangeSlider();
    }

    toggleErasePaths(){
        if(this.isPathErasing){
            this.isPathErasing = false;
            $('#erasePathsToggleButton').css('background-color', '#ff8888');
        } else {
            this.isPathErasing = true;
            $('#erasePathsToggleButton').css('background-color', '#88ff88');
        }
    }

    toggleEraseText(){
        if(this.isTextErasing){
            this.isTextErasing = false;
            $('#eraseTextToggleButton').css('background-color', '#ff8888');
        } else {
            this.isTextErasing = true;
            $('#eraseTextToggleButton').css('background-color', '#88ff88');
        }
    }

    toggleEraseLocations(){
        if(this.isLocationsErasing){
            this.isLocationsErasing = false;
            $('#eraseLocationsToggleButton').css('background-color', '#ff8888');
        } else {
            this.isLocationsErasing = true;
            $('#eraseLocationsToggleButton').css('background-color', '#88ff88');
        }
    }

    applyEraserSizeFromRangeSlider(){
        this.selectedEraseRange = $('#eraserSizeSlider').val();
        $('#eraserSizeValue').html(this.selectedEraseRange);
    }

    drawMouseHighlight(canvas, dv){

        var mouse = MapEditor.mouse;

        if(!mouse.isActive()){
            return;
        }

        if(mouse.isRightDown){
            return;
        }

        canvas.strokeStyle = '#ffffff';
        if(mouse.isLeftDown){
            canvas.lineWidth = 3;
        } else {
            canvas.lineWidth = 1.5;
        }

        var x = mouse.mouseX;
        var y = mouse.mouseY;
        var fieldSize = dv.fieldSize;
        var size = this.selectedEraseRange * fieldSize;
       
        canvas.setLineDash([5,5]);
        canvas.beginPath();
        canvas.arc(x, y, size, 0, 2 * Math.PI);
        canvas.stroke();
    }

    usageHeld(x, y){
        var map = MapEditor.map;
        if(this.isLocationsErasing) this.removeLocations(x, y, map);
        if(this.isTextErasing) this.removeTextNodes(x, y, map);
        if(this.isPathErasing) this.removePaths(x, y, map);
    }

    removeLocations(x, y, map){
        var locationHasBeenRemoved = false;

        for(var i = 0; i < map.locations.length; i++){
            var loc = map.locations[i];
            var distance = Math.sqrt(Math.pow((x - loc.positionX), 2) + Math.pow((y - loc.positionY), 2));
            if(distance < this.selectedEraseRange){
                map.locations[i] = null;
                locationHasBeenRemoved = true;
            }
        }

        if(locationHasBeenRemoved){
            map.locations = this.refitArray(map.locations);
        }
    }

    removeTextNodes(x, y, map){
        var textNodeHasBeenRemoved = false;

        for(var i = 0; i < map.textNodes.length; i++){
            var text = map.textNodes[i];
            var distance = Math.sqrt(Math.pow((x - text.positionX), 2) + Math.pow((y - text.positionY), 2));
            if(distance < this.selectedEraseRange){
                map.textNodes[i] = null;
                textNodeHasBeenRemoved = true;
            }
        }

        if(textNodeHasBeenRemoved){
            map.textNodes = this.refitArray(map.textNodes);
        }
    }

    removePaths(x, y, map){
        var pathHasBeenRemoved = false;

        for(var i = 0; i < map.paths.length; i++){
            var path = map.paths[i];

            var pointHasBeenRemoved = false;

            for(var j = 0; j < path.points.length; j++){
                var point = path.points[j];
                var distance = Math.sqrt(Math.pow((x - point.positionX), 2) + Math.pow((y - point.positionY), 2));
                if(distance < this.selectedEraseRange){
                    path.points[j] = null;
                    pointHasBeenRemoved = true;
                }
            }
                
            if(pointHasBeenRemoved){
                path.points = this.refitArray(path.points);
            }

            if(path.points.length <= 0){
                map.paths[i] = null;
                pathHasBeenRemoved = true;
            }
        }

        if(pathHasBeenRemoved){
            map.paths = this.refitArray(map.paths);
        }
    }


    refitArray(oldArray){
        var tempArray = [];
        oldArray.forEach(e => {if(e) tempArray.push(e)});
        return tempArray;
    }

}