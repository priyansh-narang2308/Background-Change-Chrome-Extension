document.addEventListener("DOMContentLoaded", () => {
    const colorPicker = document.getElementById("colorPicker");
    const saveColorButton = document.getElementById("saveColor");
    const displaySavedColor = document.getElementById("displaySavedColor");
    const colorPreview = document.getElementById("colorPreview");

    // Load saved color from storage
    chrome.storage.local.get("backgroundColor", (data) => {
        if (data.backgroundColor) {
            colorPicker.value = data.backgroundColor;
            displaySavedColor.textContent = data.backgroundColor;
            colorPreview.style.backgroundColor = data.backgroundColor; // Update preview
        }
    });

    // Save color when button is clicked
    saveColorButton.addEventListener("click", () => {
        const selectedColor = colorPicker.value;
        chrome.storage.local.set({ backgroundColor: selectedColor }, () => {
            displaySavedColor.textContent = selectedColor;
            colorPreview.style.backgroundColor = selectedColor; // Update the preview
        });
    });
});
