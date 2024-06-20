chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url.includes('youtube.com')) {
        chrome.scripting.executeScript({
            target: { tabId: activeInfo.tabId },
            function: pauseYouTubeVideo
        });
    }
});

chrome.windows.onFocusChanged.addListener(async (windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) {
        const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        for (const tab of tabs) {
            if (tab.url.includes('youtube.com')) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: pauseYouTubeVideo
                });
            }
        }
    }
});

function pauseYouTubeVideo() {
    const video = document.querySelector('video');
    if (video && !video.paused) {
        video.pause();
    }
}
