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

/**
 * checks if the app is on localhost
 */
function appIsLocalhost(){
    return !window.location.hostname || 
            window.location.hostname === "localhost" || 
            window.location.hostname === "127.0.0.1";
}