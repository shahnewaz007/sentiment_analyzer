var contextMenuItem = {
  id: "detectSentiment",
  title: "Detect Sentiment",
  contexts: ["selection"],
};
chrome.contextMenus.create(contextMenuItem);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo == "showPageAction") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.pageAction.show(tabs[0].id);
    });
  }
});

chrome.contextMenus.onClicked.addListener(async function (clickData) {
  if (clickData.menuItemId == "detectSentiment" && clickData.selectionText) {
    console.log(clickData.selectionText);
    // swal("Hello");
    // alert(clickData.selectionText);
    const rawResponse = await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "ওরে জুতা পিটা করা উচিত, কিন্নির বাচ্ছা, কথা কম বল রানু মন্ডল চিন্তা ভাবনা এতো খারাপ",
      }),
    });
    const content = await rawResponse.json();

    // alert(content.message);
    var notifOptions = {
      type: "basic",
      iconUrl: "icon48.png",
      title: "Detect Sentiment",
      message: content.message,
      // message: "test notification",
    };
    chrome.notifications.create("limitNotif", notifOptions);
  }
});
