chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "changeBackgroundColor",
        title: "Change Background Color",
        contexts: ["page"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "changeBackgroundColor" && tab) {
        chrome.storage.local.get("backgroundColor", (data) => {
            const savedColor = data.backgroundColor || "#ffffff"; 

            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs.length === 0) return; 

                chrome.tabs.sendMessage(tabs[0].id, { color: savedColor }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error("Error sending message:", chrome.runtime.lastError.message);
                    } else if (response && response.status === "success") {
                        console.log("Background color changed successfully");
                    } else {
                        console.error("Failed to change background color", response);
                    }
                });
            });
        });
    }
});