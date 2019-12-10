/**
 * opens a pseudomodal window
 */
function openModalWindow(html){

    var modalHtml = `
    <div class='pseudoModalOverlay'>
        <div class='pseudoModalWindow'>
            <div class='pseudoModalTopBar'>
                <span class="closeModalWindowButton" onclick='closeModalWindow()'>&times;</span>
            </div>
            <div class='pseudoModalContent'>${html}</div>
        </div>
    </div>
    `;
    $("body").append(modalHtml);

    // fade in animation
    $('.pseudoModalWindow').css('opacity', 0);
    $('.pseudoModalWindow').fadeTo(300, 0.95);
}

function closeModalWindow(){
    $(".pseudoModalOverlay").remove();
}
