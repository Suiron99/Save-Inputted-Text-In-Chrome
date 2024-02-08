document.addEventListener('DOMContentLoaded', function() {
 var mainContent = document.querySelector('main');
var textInput = document.getElementById('textToSave');
textInput.style.color = 'red';
    // Apply inline styles to change the background color
    mainContent.style.backgroundColor = 'black';

    // Change text color to red
    document.body.style.color = 'red';
    var saveTextButton = document.getElementById('saveTextButton');
        saveTextButton.style.color = 'red'; // Change text color
         saveTextButton.style.backgroundColor = 'black'; // Change background color
          document.body.style.color = 'red';

           var resetTextButton = document.getElementById('resetButton');
              resetTextButton.style.color = 'red'; // Change text color
              resetTextButton.style.backgroundColor = 'black'; // Change background color
    // Add event listener to the "Save Text" button
    document.getElementById('saveTextButton').addEventListener('click', function() {
        // Get the text to save from the textarea
        var textToSave = document.getElementById('textToSave').value;

        // Retrieve the existing saved text array from storage
        chrome.storage.sync.get({ savedTextArray: [] }, function(data) {
            var savedTextArray = data.savedTextArray;

            // Append the new text to the existing array
            savedTextArray.push(textToSave);

            // Save the updated array back to storage
            chrome.storage.sync.set({ savedTextArray: savedTextArray }, function() {
                if (chrome.runtime.lastError) {
                    console.error('Failed to save text:', chrome.runtime.lastError.message);
                } else {
                    console.log('Text saved successfully.');
                    // Display the saved text below the text box
                    displaySavedText(savedTextArray);
                }
            });
        });
    });

    // Add event listener to the "Reset" button
    document.getElementById('resetButton').addEventListener('click', resetText);

    // Retrieve the saved text when the popup is opened
    chrome.storage.sync.get({ savedTextArray: [] }, function(data) {
        var savedTextArray = data.savedTextArray;
        if (savedTextArray.length > 0) {
            // Display the saved text below the text box
            displaySavedText(savedTextArray);
        }
    });
});

// Function to reset the saved text to an empty array
function resetText() {
    // Clear the saved text array in storage
    chrome.storage.sync.set({ savedTextArray: [] }, function() {
        if (chrome.runtime.lastError) {
            console.error('Failed to reset text:', chrome.runtime.lastError.message);
        } else {
            console.log('Text reset successfully.');
            // Clear the displayed saved text
            document.getElementById('savedTextContainer').innerHTML = '';
        }
    });
}

// Function to display saved text below the text box
function displaySavedText(savedTextArray) {
    var savedTextHtml = savedTextArray.map(function(text) {
        return '<p>' + text + '</p>';
    }).join('');
    document.getElementById('savedTextContainer').innerHTML = savedTextHtml;
}
