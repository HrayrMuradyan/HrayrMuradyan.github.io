document.getElementById("copyText").addEventListener("click", function() {
    var text = document.getElementById("copyText").innerText;
    var message = document.getElementById("copyMessage");

    // Using Clipboard API to copy text
    navigator.clipboard.writeText(text).then(function() {
        // Show success message for 2 seconds
        message.textContent = "Copied!";
        message.classList.remove('failed');
        message.classList.add('show');

        setTimeout(function() {
            message.classList.remove('show'); // Hide the message after 2 seconds
        }, 2000);
    }).catch(function(error) {
        message.textContent = "Failed to copy!";
        message.classList.remove('show');
        message.classList.add('failed', 'show');
    });
});