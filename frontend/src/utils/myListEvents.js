const myListUpdatedEventName = "chill:my-list-updated";

function notifyMyListUpdated() {
  window.dispatchEvent(new Event(myListUpdatedEventName));
}

export { myListUpdatedEventName, notifyMyListUpdated };
