
const LoadMapModal = {

    open(){
        var html = `
        <div id='newMapMainDiv'>
            <h1 class='modalTitle' >Load a map from file ...</h1>
            <div class='fileInputDiv'>
                <label class='fileInputOverlay'>
                    <h1 class='fileInpuyTextBlock' id='loadMapFileTextBlock'>Select a file</h1>
                    <input type='file' class='modalFileInput' id='loadMapFileInput'
                        onchange='LoadMapModal.inputFile()'/>
                </label>
            </div>
            <div class='sumbitButtonDiv'>
                <input type='submit' class='modalSubmitButton' value='Confirm'
                    onclick='LoadMapModal.loadMap()'/>
            </div>
        </div>
        `;
        openModalWindow(html);
    },

    readyFile: null,

    reset(){
        this.readyFile = null;
        $('#loadMapFileTextBlock').html('Select a file');
    },

    loadMap(){
        if(!this.readyFile){
            // no file has been readied
            alert('Please select a file first.')
            return;
        } 
        var reader = new FileReader(); 
        reader.onload = (e) => {
            var loadedMap = JSON.parse(e.target.result);
            if(this.validateParsedMapObject(loadedMap)){
                MapEditor.map = loadedMap;
                closeModalWindow();
            }
        };
        reader.readAsText(this.readyFile);
    },

    inputFile(){
        var input = document.getElementById('loadMapFileInput');
        if(this.validateFileInput(input)){
            var file = input.files[0];
            $('#loadMapFileTextBlock').html(file.name);
            this.readyFile = file;
        }
    },

    validateFileInput(input){
        if(!input.files[0]){
            // no file has been detected
            return false;
        } 
        var file = input.files[0];
        if(file.type != 'application/json'){
            // wrong file has been selected
            alert('Please select a JSON file.')
            input.value = '';
            this.reset();
            return false;
        }
        return true;
    },

    validateParsedMapObject(map){
        return true; 
    },

}