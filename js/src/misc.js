/**
 * Toggles between browser view and fullscreen view
 */
function toggleFullscreen(){
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}
