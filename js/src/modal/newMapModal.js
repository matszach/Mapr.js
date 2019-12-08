const NewMapModal = {

    open(){
        var html = `
        <div id='modalMainDiv'>
            <h1 class='modalTitle' >Create a new map of size ...</h1>
            <div class='labelAndInputDiv'>
                <label class='inputDescriptionLabel'>Width:</label>
                <input class='labeledInput' id='newMapWidthInput' type='number' value='200'/>
            </div>
            <div class='labelAndInputDiv'>
                <label class='inputDescriptionLabel'>Height:</label>
                <input class='labeledInput' id='newMapHeightInput' type='number'value='140'/>
            </div>
            <div class='sumbitButtonDiv'>
                <input type='submit' class='modalSubmitButton' value='Confirm' onclick='NewMapModal.startNewMap()'/>
            </div>
        </div>
        `;
        openModalWindow(html);
    },

    startNewMap(){
        var w = parseInt($('#newMapWidthInput').val());
        var h = parseInt($('#newMapHeightInput').val());
        MapEditor.openNewMap(w, h);
        closeModalWindow();
    },

}