'use strict';

class MyEventEmitter {
  events = {};

  on(eventName, listener) {
    this.events[eventName] = this.events[eventName]
      ? [...this.events[eventName], { listener, type: 'on' }]
      : [{ listener, type: 'on' }];
  }
  once(eventName, listener) {
    this.events[eventName] = this.events[eventName]
      ? [...this.events[eventName], { listener, type: 'once' }]
      : [{ listener, type: 'once' }];
  }
  off(eventName, removeListener) {
    this.events[eventName] = this.events[eventName].filter(
      ({ listener }) => listener !== removeListener,
    );
  }
  emit(eventName, ...args) {
    this.events[eventName] = this.events[eventName].filter(
      ({ listener, type }) => {
        listener(...args);

        return type !== 'once';
      },
    );
  }
  prependListener(eventName, listener) {
    this.events[eventName] = this.events[eventName]
      ? [{ listener, type: 'on' }, ...this.events[eventName]]
      : [{ listener, type: 'on' }];
  }
  prependOnceListener(eventName, listener) {
    this.events[eventName] = this.events[eventName]
      ? [{ listener, type: 'once' }, ...this.events[eventName]]
      : [{ listener, type: 'once' }];
  }
  removeAllListeners(eventName) {
    if (eventName) {
      delete this.events[eventName];
    } else {
      this.events = {};
    }
  }
  listenerCount(eventName) {
    return this.events[eventName] ? this.events[eventName].length : 0;
  }
}

module.exports = MyEventEmitter;
