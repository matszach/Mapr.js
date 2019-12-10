class Location {
    symbolIndex;
    sizeScale;
    positionX;
    positionY;
}


class LocationTool extends Tool{

    toolPanelHtml = `
        <div class='toolPanelComponentDiv' id='symbolButtonsDiv'></div>
        <div class='toolPanelComponentDiv' id='brushSizeDiv'>
            <input type='range' class='toolSlider' id='symbolSizeSlider' min=1 max=10 value=2 step=0.1
                onchange='MapEditor.currentTool.applySymbolSizeFromRangeSlider()'/>
            <span class='toolSliderValue' id='symbolSizeValue'></span>     
        </div>
        <div class='toolPanelComponentDiv' id='undoLastSymbolDiv'>
            <input type='submit' class='fullSizeButton' id'undoLastSymbolButton' value='Undo last'
                onclick='MapEditor.currentTool.removeLastLocation()'/>
        </div>
    `;

    
    selectedSymbolIndex = -1;

    selectedSymbolSize = -1;

    postLoad(){
        this.loadSymbolButtons();
        this.selectSymbol(0);
        this.applySymbolSizeFromRangeSlider();
    }

    loadSymbolButtons(){
        var symbolsHtml = ''
        for(var i = 0; i < AssetManager.symbolUrls.length; i++){
            symbolsHtml += `<div class='symbolButton' id='symbolButton_${i}' value='' 
                            style='background-image: url(${AssetManager.symbolUrls[i]})' 
                            onclick='MapEditor.currentTool.selectSymbol(${i})'></div>`;
        }
        $('#symbolButtonsDiv').html(symbolsHtml);
    }

    selectSymbol(i){
        this.selectedSymbolIndex = i;
        $('.symbolButton').removeClass('selectedSymbolButton');
        $(`#symbolButton_${i}`).addClass('selectedSymbolButton');
    }


    drawMouseHighlight(canvas, dv){
        var mouse = MapEditor.mouse;
        if(mouse.isRightDown){
            return;
        }
        var image = AssetManager.symbols[this.selectedSymbolIndex];
        var size = dv.fieldSize * this.selectedSymbolSize;
        var xLoc = mouse.mouseX - size/2;
        var yLoc = mouse.mouseY - size/2;
        if(mouse.isLeftDown){
            canvas.globalAlpha = 0.4;
        } else {
            canvas.globalAlpha = 0.1;
        }
        canvas.drawImage(image, xLoc, yLoc, size, size);
        canvas.globalAlpha = 1;
    }

    usageRelease(x, y){
        var loc = new Location();
        loc.symbolIndex = this.selectedSymbolIndex;
        loc.positionX = x;
        loc.positionY = y;
        loc.sizeScale =  this.selectedSymbolSize;
        MapEditor.map.locations.push(loc);
    }

    removeLastLocation(){
        MapEditor.map.locations.pop();
    }

    applySymbolSizeFromRangeSlider(){
        this.selectedSymbolSize = parseFloat($('#symbolSizeSlider').val());
        $('#symbolSizeValue').html(this.selectedSymbolSize);
    }
}