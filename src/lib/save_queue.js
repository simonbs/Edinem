import { setTimeout } from 'timers';

const CharlesSessionEncoder = require('../lib/charles_session_encoder')

function SaveQueue() {
  this.queueForFilePath = {}
}

SaveQueue.prototype.getQueue = function(filePath) {
  return this.queueForFilePath[filePath] || []
}

SaveQueue.prototype.removeQueue = function(filePath) {
  delete this.queueForFilePath[filePath]
}

SaveQueue.prototype.queue = function(session, filePath, callback) {
  let queue = this.getQueue(filePath)
  // We only care about the first element in the array,
  // i.e. the element currently being saved. The other
  // elements are queued but we are queuing a newer 
  // version of the session to be saved, so they don't
  // matter anymore. We remove them.
  if (queue.length > 1) {
    queue = queue.splice(1)
  }
  // Add our new element. We deep clone the session
  // to have a copy that is not modified later.
  // We use JSON.parse(JSON.stringify) for that as suggested
  // in this StackOverflow answer.
  // https://stackoverflow.com/a/5344074/486845
  const clonedSession = JSON.parse(JSON.stringify(session))
  queue.push({
    session: clonedSession,
    callback: callback
  })
  this.queueForFilePath[filePath] = queue
  // If the new element is the only element in the queue,
  // we start processing it. Otherwise we wait for the
  // earlier items to be processed.
  if (queue.length == 1) {
    this.processNext(filePath)
  }
}

SaveQueue.prototype.processNext = function(filePath) {
  let queue = this.getQueue(filePath)
  if (queue.length > 0) {
    this.processSession(queue[0], filePath)
  }
}

SaveQueue.prototype.processSession = function(element, filePath) {
  const saveQueue = this
  const charlesSessionEncoder = new CharlesSessionEncoder()
  charlesSessionEncoder.encode(element.session, filePath, (err) => {
    const queue = saveQueue.getQueue(filePath)
    // Remove the currently processed element.
    saveQueue.getQueue(filePath).shift()
    const isLastElement = queue.length == 0
    if (isLastElement) {
      // Notify callback as this was the last element.
      saveQueue.removeQueue(filePath)
      element.callback(err)
    } else {
      // Process next element in the queue.
      saveQueue.processNext(filePath)
    }
  })
}

module.exports = SaveQueue
