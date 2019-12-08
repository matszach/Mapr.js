/**
 * opens a pseudomodal window
 */
function openModalWindow(html){
    var modalHtml = `
    <div class='pseudoModalOverlay'>
        <div class='pseudoModalWindow'>
            <span class="closeModalWindowButton" onclick='closeModalWindow()'>&times;</span>
            <div class='pseudoModalContent'>${html}</div>
        </div>
    </div>
    `;
    $("body").append(modalHtml);
}

function closeModalWindow(){
    $(".pseudoModalOverlay").remove();
}
