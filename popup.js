document.addEventListener("DOMContentLoaded", () => {
    const colorPicker = document.getElementById("colorPicker");
    const saveColorButton = document.getElementById("saveColor");
    const displaySavedColor = document.getElementById("displaySavedColor");

    chrome.storage.local.get("backgroundColor", (data) => {
        if (data.backgroundColor) {
            colorPicker.value = data.backgroundColor;
            displaySavedColor.textContent = data.backgroundColor;
        }
    });

    saveColorButton.addEventListener("click", () => {
        const selectedColor = colorPicker.value;
        chrome.storage.local.set({ backgroundColor: selectedColor });
        displaySavedColor.textContent = selectedColor;
    });
});