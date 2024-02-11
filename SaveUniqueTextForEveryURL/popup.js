document.addEventListener('DOMContentLoaded', function() {
    var mainContent = document.querySelector('main');
    var displaySavedTextButton = document.getElementById('displaySavedTextButton');
    var textInput = document.getElementById('textToSave');

    // Ensure elements are found before manipulating them
    if (textInput) {
        textInput.style.color = 'red';
    }
    if (mainContent) {
        // Apply inline styles to change the background color
        mainContent.style.backgroundColor = 'black';
    }

    // Change text color to red for the body
    document.body.style.color = 'red';

    var saveTextButton = document.getElementById('saveTextButton');
    if (saveTextButton) {
        // Change text color and background color for the Save Text button
        saveTextButton.style.color = 'red';
        saveTextButton.style.backgroundColor = 'black';

        // Add event listener to the "Save Text" button
        saveTextButton.addEventListener('click', saveText);
    }

    var resetTextButton = document.getElementById('resetButton');
    if (resetTextButton) {
        // Change text color and background color for the Reset button
        resetTextButton.style.color = 'red';
        resetTextButton.style.backgroundColor = 'black';

        // Add event listener to the "Reset" button
        resetTextButton.addEventListener('click', resetText);
    }

    if (displaySavedTextButton) {
        // Add event listener to the "Display Saved Text" button
        displaySavedTextButton.addEventListener('click', displaySavedText);
    }

    // Retrieve the saved text when the popup is opened
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentUrl = tabs[0].url;
        chrome.storage.sync.get({ savedTextMap: {} }, function(data) {
            var savedTextMap = data.savedTextMap;
            if (savedTextMap[currentUrl]) {
                // Display the saved text for the current URL below the text box
                displaySavedText(savedTextMap[currentUrl]);
            }
        });
    });
});

// Function to save the entered text
function saveText() {
    var textToSave = document.getElementById('textToSave').value;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentUrl = tabs[0].url;
        chrome.storage.sync.get({ savedTextMap: {} }, function(data) {
            var savedTextMap = data.savedTextMap;
            if (!savedTextMap[currentUrl]) {
                savedTextMap[currentUrl] = [];
            }
            savedTextMap[currentUrl].push(textToSave);
            chrome.storage.sync.set({ savedTextMap: savedTextMap }, function() {
                if (chrome.runtime.lastError) {
                    console.error('Failed to save text:', chrome.runtime.lastError.message);
                } else {
                    console.log('Text saved successfully.');
                }
            });
        });
    });
}

// Function to reset the saved text for the current URL
function resetText() {
    // Get the current URL
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentUrl = tabs[0].url;
        // Clear the saved text array for the current URL in storage
        chrome.storage.sync.get({ savedTextMap: {} }, function(data) {
            var savedTextMap = data.savedTextMap;
            // Remove the saved text array for the current URL
            delete savedTextMap[currentUrl];
            chrome.storage.sync.set({ savedTextMap: savedTextMap }, function() {
                if (chrome.runtime.lastError) {
                    console.error('Failed to reset text:', chrome.runtime.lastError.message);
                } else {
                    console.log('Text reset successfully.');
                    // Clear the displayed saved text
                    var savedTextContainer = document.getElementById('savedTextContainer');
                    if (savedTextContainer) {
                        savedTextContainer.innerHTML = '';
                    }
                }
            });
        });
    });
}

// Function to display saved text below the text box
function displaySavedText() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0 && tabs[0].url) {
            var currentUrl = tabs[0].url;
            chrome.storage.sync.get({ savedTextMap: {} }, function(data) {
                var savedTextMap = data.savedTextMap;
                var savedTextArray = savedTextMap[currentUrl] || [];
                var savedTextHtml = savedTextArray.map(function(text) {
                    return '<p>' + text + '</p>';
                }).join('');
                var savedTextContainer = document.getElementById('savedTextContainer');
                if (savedTextContainer) {
                    savedTextContainer.innerHTML = savedTextHtml;
                }
            });
        } else {
            console.error('Unable to retrieve current URL.');
        }
    });
}

