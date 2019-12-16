const ColorsModal = {

    open(){
        var html = `
        <div id='modalMainDiv'>
            <h1 class='modalTitle' >Colors</h1>
            <div id='paletteDiv'></div>
        </div>
        `;
        openModalWindow(html);
        this.loadPalette();
    },
    
    loadPalette(){
        inputsHtml = '';
        for(var i = 0; i < SettingsManager.colorPalette.colors.length; i++){
            var color = SettingsManager.colorPalette.colors[i];
            var html = `
            <label class='paletteInputOverlay' id='paletteInputOverlay_${i}' style='background-color: ${color}'>
                <p class='paletteText' id='paletteText_${i}'>${color}</p>
                <input type='color' class='paletteConfigHiddenInput' id='paletteInput_${i}' 
                    value='${color}' onchange='ColorsModal.updateColor(${i})'/>
            </label>`;
            inputsHtml += html;
            if(i % 6 == 5){
                inputsHtml += '<br>';
            }
        }
        $('#paletteDiv').html(inputsHtml);
    },

    updateColor(index){
        var color = $(`#paletteInput_${index}`).val();
        SettingsManager.colorPalette.colors[index] = color;
        $(`#paletteInputOverlay_${index}`).css('background-color', color);
        $(`#paletteText_${index}`).html(color);
        MapEditor.currentTool.postLoad();
    },
    
}