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
                <input class='labeledInput' id='exportedFileFieldSize' type='number' value='16'/>
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

        var imgParams = this.getImageParams();

        var canvas = document.createElement('canvas');
        canvas.width = imgParams.canvasWidth;
        canvas.height = imgParams.canvasHeight;
        // canvas.allowTaint = true;

        var context = canvas.getContext('2d');

        this.drawFields(context, imgParams);
        this.drawGrid(context, imgParams);
        this.drawLocations(context, imgParams);

        
        this.downloadAsPng(canvas, imgParams.fileName);

    },

    getImageParams(){
        var imgParams = {
            mapWidth : MapEditor.map.width,
            mapHeight : MapEditor.map.height,
            fileName : $('#exportedFileNameInput').val(),
            fieldSize : parseInt($('#exportedFileFieldSize').val()),
            borderSize : parseInt($('#exportedFileBorderSize').val()),
            canvasWidth : 2 * parseInt($('#exportedFileBorderSize').val()) + MapEditor.map.width * parseInt($('#exportedFileFieldSize').val()),
            canvasHeight : 2 * parseInt($('#exportedFileBorderSize').val()) + MapEditor.map.height * parseInt($('#exportedFileFieldSize').val()),
            showGrid : $('#exportedFileShowGrid').is(':checked'), 
            showLocations : $('#exportedFileShowLocations').is(':checked'), 
            showPaths : $('#exportedFileShowPaths').is(':checked'), 
            showText : $('#exportedFileShowText').is(':checked'), 
            mapData : MapEditor.map,
        }
        return imgParams;
    },


    drawFields(context, ip){
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, ip.canvasWidth, ip.canvasHeight);
        for(var x = 0; x < ip.mapWidth; x++){
            for(var y = 0; y < ip.mapHeight; y++){
                context.fillStyle = ip.mapData.fields[x][y];
                context.fillRect(ip.borderSize + x * ip.fieldSize, ip.borderSize + y * ip.fieldSize, ip.fieldSize, ip.fieldSize);
            }
        }
    },

    drawGrid(context, ip){
        if(!ip.showGrid){
            return;
        }
        context.beginPath();
        context.strokeStyle = '#000000';
        context.lineWidth = ip.fieldSize/64;
        context.setLineDash([]);
        for(var x = 0; x < ip.mapWidth; x++){
            context.moveTo(ip.borderSize + x * ip.fieldSize, ip.borderSize);
            context.lineTo(ip.borderSize + x * ip.fieldSize, ip.borderSize + ip.mapHeight * ip.fieldSize);
        }
        for(var y = 0; y < ip.mapHeight; y++){
            context.moveTo(ip.borderSize, ip.borderSize + y * ip.fieldSize);
            context.lineTo(ip.borderSize + ip.mapWidth * ip.fieldSize, ip.borderSize + y * ip.fieldSize);
        }
        context.stroke();
    },

    drawLocations(context, ip){
        if(!ip.showLocations){
            return;
        }
        // note: drawing images on to-export-canvas only works on deplyoment servers
        // and will throw an exception when on localhost when exported  
        var isServerHost = !appIsLocalhost();

        for(var i = 0; i < ip.mapData.locations.length; i++){
            var loc = ip.mapData.locations[i];
            var xLoc = (loc.positionX - 0.5 * loc.sizeScale) * ip.fieldSize + ip.borderSize;
            var yLoc = (loc.positionY - 0.5 * loc.sizeScale) * ip.fieldSize + ip.borderSize;
            var size = ip.fieldSize * loc.sizeScale;
           
            if(isServerHost){
                var image = AssetManager.symbols[loc.symbolIndex];
                image.crossOrigin = 'anonymous';
                context.drawImage(image, xLoc, yLoc, size, size);
            } else {
                context.lineWidth = ip.fieldSize/4;
                context.strokeStyle = '#000011';
                context.strokeRect(xLoc, yLoc, size, size);
            }
            
        }
    },

    downloadAsPng(canvas, filename){
        var a = document.createElement('a');
        a.download = filename;
        a.href = canvas.toDataURL();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },

}