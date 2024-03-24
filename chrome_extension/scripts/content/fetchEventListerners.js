window.addEventListener("authReceived", (event) => {
    chrome.runtime.sendMessage({ authReceived: true, detail: event.detail });
});
