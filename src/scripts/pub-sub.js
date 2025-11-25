function Events() {
  const subscribtionList = new Map();
  return {
    subscribe: (name, callback) => {
      console.log(name, callback);
      if (subscribtionList.has(name)) {
        const oldCallbacks = subscribtionList.get(name) || [];
        subscribtionList.set(name, [...oldCallbacks, callback]);
      } else {
        subscribtionList.set(name, [callback]);
      }
      return {
        remove() {
          const filteredCallBack = subscribtionList
            .get(name)
            .filter((cb) => callback != cb);
          subscribtionList.set(name, [...filteredCallBack]);
        },
      };
    },
    publish: (name, message) => {
      if (subscribtionList.has(name)) {
        const callbacks = subscribtionList.get(name) || [];
        callbacks.forEach((element) => {
          element(message);
        });
      }
    },
    remove: (name) => {
      if (subscribtionList.has(name)) {
        subscribtionList.delete(name);
      }
    },
  };
}
const events = new Events();
events.subscribe("helle", function (message) {
  console.log("subscribition 1", message);
});
const iinter = events.subscribe("helle", function (message) {
  console.log("subscribition 2", message);
});
events.subscribe("world", function (message) {
  console.log("subscribition 2", message);
});
events.publish("helle", "Test 1");
events.publish("world", "Test 2");
iinter.remove();
events.publish("helle", "Test 1");
