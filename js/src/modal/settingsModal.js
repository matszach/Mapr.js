const SettingsModal = {

    open(){
        var html = `
        <div id='modalMainDiv'>
            <h1 class='modalTitle' >Settings</h1>
            <div class='labelAndInputDiv'>
                <label class='inputDescriptionLabel'>Background color:</label>
                <div class='labeledRadioButtonSetDiv' id='backgroundColorRadioButtonSetDiv'></div>
            </div>
            <div class='labelAndInputDiv'>
                <label class='inputDescriptionLabel'>Grid color:</label>
                <div class='labeledRadioButtonSetDiv' id='gridColorRadioButtonSetDiv'></div>
            </div>
        </div>
        `;
        openModalWindow(html);
        this.loadBackgroundRadioButtons();
        this.loadGridRadioButtons();
    },
    
    // BACKGROUND COLOR
    loadBackgroundRadioButtons(){
        var html = ''
        var selectedIndex = SettingsManager.displaySettings.canvasBackgroundColorIndex;
        for(var i = 0; i < SettingsManager.displaySettings.POSSIBLE_CANVAS_BACKGORUND_COLORS.length; i++){
            var color = SettingsManager.displaySettings.POSSIBLE_CANVAS_BACKGORUND_COLORS[i];
            var buttonHtml = `
                <span class='colorRadioButton backgroundColorRadioButton${i == selectedIndex ? ' selectedColorRadioButton' : ''}' 
                    id='backgroundColorRadioButton_${i}' onclick='SettingsModal.selectBackgroundColor(${i})' 
                    style='background-color: ${color}'></span>
            `
            html += buttonHtml;
        }
        $('#backgroundColorRadioButtonSetDiv').html(html);
    },

    selectBackgroundColor(index){
        SettingsManager.displaySettings.canvasBackgroundColorIndex = index;
        $('.backgroundColorRadioButton').removeClass('selectedColorRadioButton');
        $(`#backgroundColorRadioButton_${index}`).addClass('selectedColorRadioButton');
    },

    // GRID COLOR
    loadGridRadioButtons(){
        var html = ''
        var selectedIndex = SettingsManager.displaySettings.canvasGridColorIndex;
        for(var i = 0; i < SettingsManager.displaySettings.POSSIBLE_CANVAS_GRID_COLORS.length; i++){
            var color = SettingsManager.displaySettings.POSSIBLE_CANVAS_GRID_COLORS[i];
            var buttonHtml = `
                <span class='colorRadioButton gridColorRadioButton${i == selectedIndex ? ' selectedColorRadioButton' : ''}' 
                    id='gridColorRadioButton_${i}' onclick='SettingsModal.selectGridColor(${i})' 
                    style='background-color: ${color}'></span>
            `
            html += buttonHtml;
        }
        $('#gridColorRadioButtonSetDiv').html(html);
    },

    selectGridColor(index){
        SettingsManager.displaySettings.canvasGridColorIndex = index;
        $('.gridColorRadioButton').removeClass('selectedColorRadioButton');
        $(`#gridColorRadioButton_${index}`).addClass('selectedColorRadioButton');
    },
}