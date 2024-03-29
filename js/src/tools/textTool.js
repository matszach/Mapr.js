class TextNode {
    value;
    positionX;
    positionY;
    hue;
    sizeScale;
    font;
}

class TextTool extends Tool{

    toolPanelHtml = `
    <div class='toolPanelComponentDiv' id='colorButtonsDiv'></div>
    <div class='toolPanelComponentDiv' id='fontButtonsDiv'></div>
    <div class='toolPanelComponentDiv' id='fontSizeChoiceDiv'>
        <input type='range' class='toolSlider' id='fontSizeSlider' min=0.5 max=10 value=1 step=0.1
            onchange='MapEditor.currentTool.applyFontSizeFromRangeSlider()'/>
        <span class='toolSliderValue' id='fontSizeValue'></span>
    </div>
    <div class='toolPanelComponentDiv' id='undoLastTextDiv'>
        <input type='submit' class='fullSizeButton' id'undoLastTextButton' value='Undo last'
            onclick='MapEditor.currentTool.removeLastTextNode()'/>
    </div>
    <div class='toolPanelComponentDiv' id='textValueDiv'>
        <textarea class='toolTextarea' id='textValueTextArea' placeholder=' your text ...' 
            spellcheck='false' 
            onkeyup='MapEditor.currentTool.setValueFromTextArea()'/>
    </div>
    `;

    selectedFontFamily = '';
    selectedFontSizeScale = 1;
    selectedTextHue = '';
    selectedTextValue = '';


    availableFonts = [
        'Arial',
        'Blippo',
        'Bookman',
        'Courier',
        'Fixed',
        'Florence',
        'Garamond',
        'Georgia',
        'Helvetica',
        'Impact',
        'Lucida',
        'Oldtown',
        'Palatino',
        'Roboto',
        'Times',
        'Verdana',
    ];
    

    postLoad(){
        this.loadFontButtons();
        this.selectFont(this.availableFonts[0]);
        this.loadColorButtons();
        this.selectColor(SettingsManager.colorPalette.selectedColorIndex);
        this.applyFontSizeFromRangeSlider();
    }


    loadFontButtons(){
        var buttonsHtml = '';
        for(var i = 0; i < this.availableFonts.length; i++){
            var font = this.availableFonts[i];
            var fontButtonHtml = `
            <input type='submit' class='fontChoiceButton' id='fontChoiceButton_${font}' 
                value='${font}' onclick='MapEditor.currentTool.selectFont(\"${font}\")'
                style='font-family: ${font}'/>
            `;
            buttonsHtml += fontButtonHtml;
        }
        $('#fontButtonsDiv').html(buttonsHtml);
    }


    selectFont(font){
        this.selectedFontFamily = font;
        $('.selectedFontChoiceButton').removeClass('selectedFontChoiceButton');
        $(`#fontChoiceButton_${font}`).addClass('selectedFontChoiceButton');
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
        this.selectedTextHue = SettingsManager.colorPalette.colors[index];
        SettingsManager.colorPalette.selectedColorIndex = index;
        $('.selectedColorChoiceButton').removeClass('selectedColorChoiceButton');
        $(`#colorChoiceButton_${index}`).addClass('selectedColorChoiceButton');
    }

    applyFontSizeFromRangeSlider(){
        this.selectedFontSizeScale = parseFloat($('#fontSizeSlider').val());
        $('#fontSizeValue').html(this.selectedFontSizeScale);
    }

    removeLastTextNode(){
        MapEditor.map.textNodes.pop();
    }

    drawMouseHighlight(canvas, dv){
        var mouse = MapEditor.mouse;
        if(mouse.isRightDown || !mouse.isActive()){
            return;
        }
        canvas.textAlign = "center";  
        canvas.font = `${Math.round(this.selectedFontSizeScale * dv.fieldSize)}px ${this.selectedFontFamily}`;
        canvas.fillStyle = this.selectedTextHue;
        if(mouse.isLeftDown){
            canvas.globalAlpha = 0.5;
        } else {
            canvas.globalAlpha = 0.2;
        }
        canvas.fillText(this.selectedTextValue, mouse.mouseX, mouse.mouseY);
        canvas.globalAlpha = 1;
    }


    usageRelease(x, y){
       if(!this.selectedTextValue){
           return;
       }
       var text = new TextNode()
       text.positionX = x;
       text.positionY = y;
       text.hue = this.selectedTextHue;
       text.sizeScale = this.selectedFontSizeScale;
       text.font = this.selectedFontFamily;
       text.value = this.selectedTextValue;
       MapEditor.map.textNodes.push(text);
    }


    setValueFromTextArea(){
        this.selectedTextValue = $('#textValueTextArea').val();
    }

}