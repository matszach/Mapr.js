const SettingsManager = {

    displaySettings : {

        POSSIBLE_CANVAS_BACKGORUND_COLORS : ['#000000', '#3f3f3f', '#7f7f7f', '#bfbfbf', '#ffffff'],
        canvasBackgroundColorIndex : 0, 
        getCanvasBackgroundColor(){
            return this.POSSIBLE_CANVAS_BACKGORUND_COLORS[this.canvasBackgroundColorIndex];
        },

        POSSIBLE_CANVAS_GRID_COLORS : ['#000000', '#3f3f3f', '#7f7f7f', '#bfbfbf', '#ffffff'],
        canvasGridColorIndex : 1, 
        getCanvasGridColor(){
            return this.POSSIBLE_CANVAS_GRID_COLORS[this.canvasGridColorIndex];
        },

        MIN_BORDER_WIDTH_RATIO : 0.005,
        MAX_BORDER_WIDTH_RATIO : 0.1,
        borderWidthRatio : 0.02,

        MIN_SCALE : 0.05,
        MAX_SCALE : 10.0,
        gridDisplayScaleLimit : 0.5,

        scalingSpeedModifier : 0.9,
    },

    colorPalette : {
        colors : [
            '#ff0000', '#ff0055', '#ff00aa', '#ff00ff', '#aa00ff', '#5500ff',
            '#0000ff', '#0055ff', '#00aaff', '#00ffff', '#00ffaa', '#00ff55',
            '#00ff00', '#55ff00', '#aaff00', '#ffff00', '#ffaa00', '#ff5500', 
            '#000000', '#555555', '#aaaaaa', '#ffffff', '#ffffff', '#ffffff',     
        ],  

        selectedColorIndex : 0,
    },
}