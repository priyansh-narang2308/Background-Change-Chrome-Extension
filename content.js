// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Handle ping to check if content script is loaded
    if (request.action === "ping") {
        sendResponse({ status: "pong" });
        return true;
    }

    // Handle color change request
    if (request.color) {
        document.body.style.backgroundColor = request.color;
        sendResponse({ status: "success" });
        return true;
    } else {
        sendResponse({ status: "error", message: "No color provided" });
        return true;
    }
});

// Let the background script know the content script is ready
chrome.runtime.sendMessage({ action: "content_script_ready" });