const SaveMapModal = {

    open(){
        var html = `
        <div id='modalMainDiv'>
            <h1 class='modalTitle' >Save map as ...</h1>
            <div class='labelAndInputDiv'>
                <label class='inputDescriptionLabel'>Name:</label>
                <input class='labeledInput' id='savedFileNameInput' type='text' value='my-map'/>
            </div>
            <div class='sumbitButtonDiv'>
                <input type='submit' class='modalSubmitButton' value='Confirm' onclick='SaveMapModal.saveMap()'/>
            </div>
        </div>
        `;
        openModalWindow(html);
    },

    saveTextFile(fileName, fileContent, fileType, fileExtension){
        var file = new Blob([fileContent], {type: fileType});
        var a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = fileName + fileExtension;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },

    saveMap(){
        var name = $('#savedFileNameInput').val();
        var content = JSON.stringify(MapEditor.map);
        this.saveTextFile(name, content, 'application/json', '.json');
    },

}