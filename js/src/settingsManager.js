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
}