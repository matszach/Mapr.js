class PolyLinePoint {
    positionX;
    positionY;
}

class PathPolyLine {
    color;
    width;
    points = new Array();
}


class PathTool extends Tool {

    toolPanelHtml = `
    <h1>Path Tool</h1>
    `;

    postLoad(){
   
    }

    loadSymbolButtons(){

    }

    drawMouseHighlight(canvas, dv){

    }

    usageRelease(x, y){
       
    }

    usageHeld(x, y){
        
    }

}