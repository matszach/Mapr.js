
const BrushTypeEnum = {
    SQUARE : 0,
    SQUARE_SPRAY_LIGHT : 1,
    SQUARE_SPRAY_HEAVY : 2,
    CIRCLE : 3,
    CIRCLE_SPRAY_LIGHT : 4,
    CIRCLE_SPRAY_HEAVY : 5,
}

const HighlightState = {
    GRAB : 0,
    HOVER : 1,
    ACTIVE : 2,
}


class PainterTool extends Tool {

    toolPanelHtml = `
    <div class='toolPanelComponentDiv' id='colorButtonsDiv'></div>
    <div class='toolPanelComponentDiv' id='brushSizeDiv'>
        <input type='range' class='toolSlider' id='brushSizeSlider' min=1 max=100 value=5 step=1
            onchange='MapEditor.currentTool.applyBrushSizeFromRangeSlider()'/>
        <span class='toolSliderValue' id='brushSizeValue'></span>     
    </div>
    <div class='toolPanelComponentDiv' id='brushTypeDiv'></div>
    `;

    palette =
    [
        ['#3f0000', '#6f0000', '#9f0000', '#cf0000', '#ff0000'], // red
        ['#3f1f00', '#6f3700', '#9f4700', '#cf6700', '#ff7F00'], // 
        ['#3f3f00', '#6f6f00', '#9f9f00', '#cfcf00', '#ffff00'], // yellow
        ['#1f3f00', '#376f00', '#479f00', '#67cf00', '#7Fff00'], // 
        ['#003f00', '#006f00', '#009f00', '#00cf00', '#00ff00'], // green
        ['#003f1f', '#006f37', '#009f47', '#00cf67', '#00ff7F'], // 
        ['#003f3f', '#006f6f', '#009f9f', '#00cfcf', '#00ffff'], // teal
        ['#001f3f', '#00376f', '#00479f', '#0067cf', '#007Fff'], // 
        ['#00003f', '#00006f', '#00009f', '#0000cf', '#0000ff'], // blue
        ['#1f003f', '#37006f', '#47009f', '#6700cf', '#7F00ff'], // 
        ['#3f003f', '#6f006f', '#9f009f', '#cf00cf', '#ff00ff'], // pink
        ['#3f001f', '#6f0037', '#9f0047', '#cf0067', '#ff007F'], // 
        ['#000000', '#3f3f3f', '#7f7f7f', '#c8c8c8', '#ffffff']  // black/grey/white
    ];

    brushTypes = 
    [
        [[0, ''], [1, ''], [2, '']],
        [[3, ''], [4, ''], [5, '']],
    ]

    choosenColor = '#000000';
    choosenBrushSize = 5;
    choosenBrushType = BrushTypeEnum.SQUARE;

    postLoad(){
        this.loadColorButtons();
        this.loadBrushTypeButtons();
        this.selectColorFromButton(8, 2);
        this.applyBrushSizeFromRangeSlider();
        this.selectBrushTypeFromButton(0, 0);
    }

    loadColorButtons(){
        var buttonsHtml = '';
        for(var i = 0; i < this.palette.length; i++){
            var colorButtonsRow = `<div class='colorButtonRow'>`;
            for(var j = 0; j < this.palette[i].length; j++){
                var buttonId = `colorButton_i${i}_j${j}`;
                colorButtonsRow += `
                <input type='submit' 
                    class='colorButton' id='${buttonId}' value=''  
                    onclick='MapEditor.currentTool.selectColorFromButton(${i}, ${j})' 
                    style='background-color: ${this.palette[i][j]}'/>
                `
            }
            colorButtonsRow += '</div>';
            buttonsHtml += colorButtonsRow;
        }
        $('#colorButtonsDiv').html(buttonsHtml);
    }

    loadBrushTypeButtons(){
        var buttonsHtml = '';
        for(var i = 0; i < this.brushTypes.length; i++){
            var brushTypeButtonsRow = `<div class='brushTypeButtonsRow'>`;
            for(var j = 0; j < this.brushTypes[i].length; j++){
                var buttonId = `brushTypeButton_i${i}_j${j}`;
                brushTypeButtonsRow += `
                <input type='submit' 
                    class='brushTypeButton' id='${buttonId}' value='${this.brushTypes[i][j][0]}'  
                    onclick='MapEditor.currentTool.selectBrushTypeFromButton(${i}, ${j})'/>
                `
            }
            brushTypeButtonsRow += '</div>';
            buttonsHtml += brushTypeButtonsRow;
        }
        $('#brushTypeDiv').html(buttonsHtml);
    }

    selectColorFromButton(i, j){
        $('.selectedColorButton').removeClass('selectedColorButton');
        $(`#colorButton_i${i}_j${j}`).addClass('selectedColorButton');
        this.choosenColor = this.palette[i][j];
    }

    applyBrushSizeFromRangeSlider(){
        this.choosenBrushSize = parseInt($('#brushSizeSlider').val());
        $('#brushSizeValue').html(this.choosenBrushSize);
    }

    selectBrushTypeFromButton(i, j){
        $('.selectedBrushTypeButton').removeClass('selectedBrushTypeButton');
        $(`#brushTypeButton_i${i}_j${j}`).addClass('selectedBrushTypeButton');
        this.choosenBrushType = this.brushTypes[i][j][0];
    }


    usageHeld(mouseX, mouseY){
        var xStart = Math.round(mouseX - this.choosenBrushSize/2);
        var xEnd = xStart + this.choosenBrushSize;
        var yStart = Math.round(mouseY - this.choosenBrushSize/2);
        var yEnd = yStart + this.choosenBrushSize;
        switch(this.choosenBrushType){
            case BrushTypeEnum.SQUARE: 
                this.fillSquare(xStart, yStart, xEnd, yEnd); break;
            case BrushTypeEnum.SQUARE_SPRAY_LIGHT: 
                this.spraySquare(xStart, yStart, xEnd, yEnd, 0.02); break;
            case BrushTypeEnum.SQUARE_SPRAY_HEAVY: 
                this.spraySquare(xStart, yStart, xEnd, yEnd, 0.05); break;
            case BrushTypeEnum.CIRCLE: 
                this.fillCircle(xStart, yStart, xEnd, yEnd); break;
            case BrushTypeEnum.CIRCLE_SPRAY_LIGHT: 
                this.sprayCircle(xStart, yStart, xEnd, yEnd, 0.02); break;
            case BrushTypeEnum.CIRCLE_SPRAY_HEAVY: 
                this.sprayCircle(xStart, yStart, xEnd, yEnd, 0.05); break;        
        }    
    }


    // fill full square
    fillSquare(xStart, yStart, xEnd, yEnd){
        for(var x = xStart; x < xEnd; x++){
            for(var y = yStart; y < yEnd; y++){
                if(MapEditor.isFieldInMapRange(x, y)){
                    MapEditor.map.fields[x][y] = this.choosenColor;
                }
            }  
        }
    }

    // sprays square
    spraySquare(xStart, yStart, xEnd, yEnd, sprayChance){
        for(var x = xStart; x < xEnd; x++){
            for(var y = yStart; y < yEnd; y++){
                if(MapEditor.isFieldInMapRange(x, y) && 
                   Math.random() < sprayChance){
                    MapEditor.map.fields[x][y] = this.choosenColor;
                }
            }  
        }
    }

    // checks if the field falls withing a range of a circle
    isWithinCircle(x, y, r){
        return x*x + y*y <= r*r + 1; // + 1 slightly increases the covered area, allowing for brush of size 1 to still have an effect
    }

    // fill full circle
    fillCircle(xStart, yStart, xEnd, yEnd){
        var radius = this.choosenBrushSize/2;
        for(var x = xStart; x < xEnd; x++){
            var testX = x - (xStart + xEnd)/2 + 0.5;
            for(var y = yStart; y < yEnd; y++){
                var testY = y - (yStart + yEnd)/2 + 0.5;
                if(MapEditor.isFieldInMapRange(x, y) && 
                   this.isWithinCircle(testX, testY, radius)){
                    MapEditor.map.fields[x][y] = this.choosenColor;
                }
            }  
        }
    }

    // sprays circle
    sprayCircle(xStart, yStart, xEnd, yEnd, sprayChance){
        var radius = this.choosenBrushSize/2;
        for(var x = xStart; x < xEnd; x++){
            var testX = x - (xStart + xEnd)/2 + 0.5;
            for(var y = yStart; y < yEnd; y++){
                var testY = y - (yStart + yEnd)/2 + 0.5;
                if(MapEditor.isFieldInMapRange(x, y) && 
                   this.isWithinCircle(testX, testY, radius) && 
                   Math.random() < sprayChance){
                    MapEditor.map.fields[x][y] = this.choosenColor;
                }
            }  
        }
    }

    drawMouseHighlight(canvas, dv){

        var mouse = MapEditor.mouse;

        if(!mouse.isActive()){
            return;
        }

        if(mouse.isRightDown){
            return;
        }

        if(mouse.isLeftDown){
            canvas.lineWidth = 2;
            canvas.strokeStyle = '#ffffff';
        } else {
            canvas.lineWidth = 0.5;
            canvas.strokeStyle = '#aaaaaa';
        }

        var x = mouse.mouseX;
        var y = mouse.mouseY;
        var fieldSize = dv.fieldSize;
        var size = this.choosenBrushSize * fieldSize;

        switch(this.choosenBrushType){
            case BrushTypeEnum.SQUARE: 
                this.highlighFillSquare(canvas, x, y, size); break;
            case BrushTypeEnum.SQUARE_SPRAY_LIGHT: 
            case BrushTypeEnum.SQUARE_SPRAY_HEAVY: 
                this.highlighSpraySquare(canvas, x, y, size); break;
            case BrushTypeEnum.CIRCLE: 
                this.highlighFillCircle(canvas, x, y, size); break;
            case BrushTypeEnum.CIRCLE_SPRAY_LIGHT:
            case BrushTypeEnum.CIRCLE_SPRAY_HEAVY: 
                this.highlighSprayCircle(canvas, x, y, size); break;
        } 
    }

    // highlight full square
    highlighFillSquare(canvas, mouseX, mouseY, size){
        canvas.setLineDash([]);
        canvas.strokeRect(mouseX - size/2, mouseY - size/2, size, size);
    }

    highlighSpraySquare(canvas, mouseX, mouseY, size){
        canvas.setLineDash([10,10]);
        canvas.strokeRect(mouseX - size/2, mouseY - size/2, size, size);
    }

    highlighFillCircle(canvas, mouseX, mouseY, size){
        canvas.setLineDash([]);
        canvas.beginPath();
        canvas.arc(mouseX, mouseY, size/2, 0, 2 * Math.PI);
        canvas.stroke();
    }

    highlighSprayCircle(canvas, mouseX, mouseY, size){
        canvas.setLineDash([10,10]);
        canvas.beginPath();
        canvas.arc(mouseX, mouseY, size/2, 0, 2 * Math.PI);
        canvas.stroke();
    }

}

