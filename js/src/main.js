// initializes the map editor properties on document load
$(document).ready(() => {
    AssetManager.load();
    MapEditor.init();
});

// disables contextmenu appearing on rigt click release
$(window).bind('contextmenu', () => {
    return false;
});

// binds a canvas resize function to window resize event
$(window).bind('resize', () => {
    MapEditor.refitCanvas();
});
