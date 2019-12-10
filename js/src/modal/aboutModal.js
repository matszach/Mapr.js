const AboutModal = {

    open(){
        var html = `
        <div id='modalMainDiv'>
            <h1 class='modalTitle' >About</h1>
            <div class='modalTextBox'>
                <p>Built with core JS and jQuery</p>
                <p>Author: <a href='https://github.com/matszach' target="_blank">Matszach</a></p>
            </div>
        </div>
        `;
        openModalWindow(html);
    },

}