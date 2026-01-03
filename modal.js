// Get the modal
var modal = document.getElementById("noticeModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Helper to close the modal and restore body state
function closeModal() {
    if (!modal) return;
    modal.style.display = "none";
    modal.classList.remove('showing');

    // Restore scrolling
    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '';
    document.documentElement.style.overflow = ''; // Unlock html
}

// Helper to get scrollbar width
function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

// When the user clicks on <span> (x), close the modal
if (span) {
    span.addEventListener('click', closeModal);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Show the modal when the page loads
window.addEventListener('load', function () {
    // show as flex so CSS centering works
    modal.style.display = "flex";

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = getScrollbarWidth();

    // Force a reflow to enable transition if needed
    setTimeout(() => {
        // add class for entry animation
        modal.classList.add('showing');
    }, 10);

    // prevent background scrolling while modal is open
    document.body.classList.add('modal-open');

    // Add padding to prevent content jump when scrollbar disappears
    if (scrollbarWidth > 0) {
        document.body.style.paddingRight = scrollbarWidth + 'px';
    }

    // Lock html as well for better mobile/browser support
    document.documentElement.style.overflow = 'hidden';

    // close modal on ESC key
    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            closeModal();
        }
    });
});