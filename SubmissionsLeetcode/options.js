chrome.runtime.onInstalled.addListener((details) => {
  const currentVersion = chrome.runtime.getManifest().version;
  const previousVersion = details.previousVersion;
  const reason = details.reason;

  console.log(`Previous Version: ${previousVersion}`);
  console.log(`Current Version: ${currentVersion}`);

  switch (reason) {
    case "install":
      console.log("New User installed the extension.");
      break;
    case "update":
      console.log("User has updated their extension.");
      break;
    case "chrome_update":
    case "shared_module_update":
    default:
      console.log("Other install events within the browser");
      break;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Your DOMContentLoaded event handler here
});

function saveText() {
  // Your save text functionality here
}

function resetText() {
  // Your reset text functionality here
}

function displaySavedText(savedTextArray) {
  // Your display saved text functionality here
}

document.getElementById('saveTextButton').addEventListener('click', saveText);
document.getElementById('resetButton').addEventListener('click', resetText);
