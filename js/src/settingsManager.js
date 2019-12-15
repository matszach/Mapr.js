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
            '#ff0000',
            '#ff8800',
            '#ffff00',
            '#88ff00',
            '#00ff00',
            '#00ff88',
            '#00ffff',
            '#0088ff',
            '#0000ff',
            '#8800ff',
            '#ff00ff',
            '#ff0088',
            '#000000',
            '#ffffff',
            '#ffffff',
            '#ffffff',
        ],  

        selectedColorIndex : 0,
    },
}