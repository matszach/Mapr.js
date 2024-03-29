class PolyLinePoint {
    positionX;
    positionY;
    constructor(x, y){
        this.positionX = x;
        this.positionY = y;
    }
}

class PathPolyLine {
    color;
    width;
    dash;
    points = new Array();
    addPoint(x, y){
        this.points.push(new PolyLinePoint(x, y))
    }
    constructor(color, width, dash){
        this.color = color;
        this.width = width;
        this.dash = dash;
    }
}


class PathTool extends Tool {

    toolPanelHtml = `
    <div class='toolPanelComponentDiv' id='colorButtonsDiv'></div>
    <div class='toolPanelComponentDiv' id='lineWidthDiv'>
        <input type='range' class='toolSlider' id='lineWidthSlider' min=1 max=100 value=5 step=1
            onchange='MapEditor.currentTool.applyLineWidthFromRangeSlider()'/>
        <span class='toolSliderValue' id='lineWidthValue'></span>     
    </div>
    <div class='toolPanelComponentDiv' id='undoLastPathDiv'>
        <input type='submit' class='fullSizeButton' id'undoLastPathButton' value='Undo last'
            onclick='MapEditor.currentTool.removeLastPath()'/>
    </div>
    `;

    selectedColor = '#000000';
    selectedWidth = 4;
    selectedDash = [];



    postLoad(){
        this.loadColorButtons();
        this.selectColor(SettingsManager.colorPalette.selectedColorIndex);
        this.applyLineWidthFromRangeSlider();
    }

    loadColorButtons(){
        var buttonsHtml = '';
        for(var i = 0; i < SettingsManager.colorPalette.colors.length; i++){
            var color = SettingsManager.colorPalette.colors[i];
            var colorButtonHtml = `
            <input type='submit' class='colorChoiceButton' id='colorChoiceButton_${i}' 
                value='' onclick='MapEditor.currentTool.selectColor(${i})'
                style='background-color: ${color}'/>
            `;
            buttonsHtml += colorButtonHtml;
        }
        $('#colorButtonsDiv').html(buttonsHtml);
    }


    selectColor(index){
        this.selectedColor = SettingsManager.colorPalette.colors[index];
        SettingsManager.colorPalette.selectedColorIndex = index;
        $('.selectedColorChoiceButton').removeClass('selectedColorChoiceButton');
        $(`#colorChoiceButton_${index}`).addClass('selectedColorChoiceButton');
    }

    applyLineWidthFromRangeSlider(){
        this.selectedWidth = parseInt($('#lineWidthSlider').val());
        $('#lineWidthValue').html(this.selectedWidth);
    }

    removeLastPath(){
        MapEditor.map.paths.pop();
    }


    drawMouseHighlight(canvas, dv){
        if(!this.inProgresPolyLine){
            return;
        }

        canvas.beginPath();
        canvas.strokeStyle = this.inProgresPolyLine.color;
        canvas.lineWidth = this.inProgresPolyLine.width * dv.fieldSize/BASE_FIELD_SIZE;
        canvas.setLineDash(this.inProgresPolyLine.dash);

        var point = this.inProgresPolyLine.points[0];
        var locX = (point.positionX - dv.startX) * dv.fieldSize + dv.offsetX;
        var locY = (point.positionY - dv.startY) * dv.fieldSize + dv.offsetY;
        canvas.moveTo(locX, locY);
        for(var i = 1; i < this.inProgresPolyLine.points.length; i++){
            point = this.inProgresPolyLine.points[i];
            locX = (point.positionX - dv.startX) * dv.fieldSize + dv.offsetX;
            locY = (point.positionY - dv.startY) * dv.fieldSize + dv.offsetY;
            canvas.lineTo(locX, locY);
        }
        canvas.stroke();

        var mouse = MapEditor.mouse;
        if(!mouse.isActive()){
            return;
        }

        canvas.globalAlpha = 0.25;
        canvas.moveTo(locX, locY);
        canvas.lineTo(mouse.mouseX, mouse.mouseY);
        canvas.stroke();
        canvas.globalAlpha = 1;
    }




    inProgresPolyLine = null;


    startNewPolyLine(x, y){
        var newLine = new PathPolyLine(this.selectedColor, this.selectedWidth, this.selectedDash);
        newLine.addPoint(x, y);
        this.inProgresPolyLine = newLine;
    }

    finalizePolyLine(){
        if(this.inProgresPolyLine.points.length > 1){
            MapEditor.map.paths.push(this.inProgresPolyLine);
        }
    }

    usageRelease(x, y){
        if(this.inProgresPolyLine){
            this.inProgresPolyLine.addPoint(x, y);
        } else {
            this.startNewPolyLine(x, y);
        }
    }

    usageCancel(x, y){
        if(this.inProgresPolyLine){
            this.finalizePolyLine();
        }
        this.inProgresPolyLine = null;
    }


}