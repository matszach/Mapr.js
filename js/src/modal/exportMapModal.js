const ExportMapModal = {

    open(){
        var html = `
        <div id='modalMainDiv'>
            <h1 class='modalTitle' >Export map as ...</h1>
            <div class='labelAndInputDiv'>
                <label class='inputDescriptionLabel'>Name:</label>
                <input class='labeledInput' id='exportedFileNameInput' type='text' value='my-map'/>
            </div>
            <div class='labelAndInputDiv'>
                <label class='inputDescriptionLabel'>Field [px]:</label>
                <input class='labeledInput' id='exportedFileFieldSize' type='number' value='64'/>
            </div>
            <div class='labelAndInputDiv'>
                <label class='inputDescriptionLabel'>Border [px]:</label>
                <input class='labeledInput' id='exportedFileBorderSize' type='number' value='32'/>
            </div>
            <div class='labelAndInputDiv'>
                <label class='inputDescriptionLabel'>Show grid:</label>
                <input class='labeledCheckbox' id='exportedFileShowGrid' type='checkbox'/>
            </div>
            <div class='labelAndInputDiv'>
                <label class='inputDescriptionLabel'>Show locations:</label>
                <input class='labeledCheckbox' id='exportedFileShowLocations' type='checkbox' checked/>
            </div>
            <div class='labelAndInputDiv'>
                <label class='inputDescriptionLabel'>Show paths:</label>
                <input class='labeledCheckbox' id='exportedFileShowPaths' type='checkbox' checked/>
            </div>
            <div class='labelAndInputDiv'>
                <label class='inputDescriptionLabel'>Show text:</label>
                <input class='labeledCheckbox' id='exportedFileShowText' type='checkbox' checked/>
            </div>
            <div class='sumbitButtonDiv'>
                <input type='submit' class='modalSubmitButton' value='Confirm' onclick='ExportMapModal.exportMap()'/>
            </div>
        </div>
        `;
        openModalWindow(html);
    },

    exportMap(){

        var map = MapEditor.map;

        var imgData = {
            fileName : $('#exportedFileNameInput').val(),
            fieldSize : parseInt($('#exportedFileFieldSize').val()),
            borderSize : parseInt($('#exportedFileBorderSize').val()),
            canvasWidth : 2 * parseInt($('#exportedFileBorderSize').val()) + map.width * parseInt($('#exportedFileFieldSize').val()),
            canvasHeight : 2 * parseInt($('#exportedFileBorderSize').val()) + map.height * parseInt($('#exportedFileFieldSize').val()),
            showGrid : $('#exportedFileShowGrid').is(':checked'), 
            showLocations : $('#exportedFileShowLocations').is(':checked'), 
            showPaths : $('#exportedFileShowPaths').is(':checked'), 
            showText : $('#exportedFileShowText').is(':checked'), 
        }


        var canvas = document.createElement('canvas');
        canvas.width = imgData.canvasWidth;
        canvas.height = imgData.canvasHeight;

        var context = canvas.getContext('2d');

    },

}