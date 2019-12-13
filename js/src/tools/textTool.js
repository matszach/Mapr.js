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
    <div class='toolPanelComponentDiv' id='fontButtonsDiv'></div>
    <div class='toolPanelComponentDiv' id='colorButtonsDiv'></div>
    <div class='toolPanelComponentDiv' id='sizeChoiceDiv'></div>
    <div class='toolPanelComponentDiv' id='textValueDiv'>
    <textarea class='toolTextarea' id='textValueTextArea' placeholder='your text' 
        spellcheck='false' onchange='MapEditor.currentTool.setValueFromTextArea()'/>
    </div>
    `;

    selectedFontFamily = 'Arial'
    selectedFontSizeScale = 1;
    selectedTextHue = '#000000';
    selectedTextValue = '';

    availableFonts = [
        'Arial',
        'Roboto',
        'Times',
        'Courier',
        'Verdana',
        'Georgia',
        'Palatino',
        'Garamond',
        'Bookman',
        'Impact',
    ];

    postLoad(){
        this.loadFontButtons();
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

    drawMouseHighlight(canvas, dv){
        var mouse = MapEditor.mouse;
        if(mouse.isRightDown){
            return;
        }
        canvas.textAlign = "center";  
        canvas.font = `${Math.round(this.selectedFontSizeScale * dv.fieldSize)}px ${this.selectedFontFamily}`;
        canvas.fillStyle = this.selectedTextHue;
        if(mouse.isLeftDown){
            canvas.globalAlpha = 0.4;
        } else {
            canvas.globalAlpha = 0.15;
        }
        canvas.fillText(this.selectedTextValue, mouse.mouseX, mouse.mouseY);
        canvas.globalAlpha = 1;
    }

    usageRelease(x, y){
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