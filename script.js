// Function to detect fraudulent content
function detectFraud() {
    let text = document.getElementById("inputArea").innerText.trim();
    
    if (!text) {
        alert("⚠ Please enter or paste text for analysis.");
        return;
    }

    // Simulating AI-based fraud detection (Replace with actual ML API)
    let isFraud = Math.random() > 0.5; 

    let resultDisplay = document.getElementById("result");
    if (isFraud) {
        resultDisplay.innerHTML = "🚨 Fraudulent Narrative Detected!";
        resultDisplay.style.color = "red";
        addToFlaggedList(text);
    } else {
        resultDisplay.innerHTML = "✅ The text seems legitimate.";
        resultDisplay.style.color = "green";
    }
}

// Store flagged content
function addToFlaggedList(text) {
    let flaggedList = document.getElementById("flaggedList");
    let listItem = document.createElement("li");
    listItem.textContent = text;
    flaggedList.appendChild(listItem);
}

// Handle pasting an image
function handlePaste(event) {
    let clipboardItems = event.clipboardData.items;
    for (let item of clipboardItems) {
        if (item.type.startsWith("image/")) {
            let blob = item.getAsFile();
            extractTextFromImage(blob);
            event.preventDefault();
        }
    }
}

// Extract text from pasted image using Tesseract.js
function extractTextFromImage(imageFile) {
    let reader = new FileReader();
    reader.onload = function(event) {
        Tesseract.recognize(
            event.target.result,
            'eng',
            {
                logger: m => console.log(m)
            }
        ).then(({ data: { text } }) => {
            let inputArea = document.getElementById("inputArea");
            inputArea.innerText = text.trim();
            resizeTextArea();
        });
    };
    reader.readAsDataURL(imageFile);
}

// Dynamically resize the paste area
function resizeTextArea() {
    let pasteArea = document.getElementById("inputArea");
    pasteArea.style.height = "auto";
    pasteArea.style.height = pasteArea.scrollHeight + "px";
}