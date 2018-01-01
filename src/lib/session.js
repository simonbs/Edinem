function Session(transactionGroups) {
  this.transactionGroups = transactionGroups
}

Session.prototype.findTransaction = function(transactionGroupId, transactionIndex) {
  for (const transactionGroup of this.transactionGroups) {
    if (transactionGroup.id == transactionGroupId) {
      return transactionGroup.transactions[transactionIndex]
    }
  }
}

Session.prototype.replaceTransaction = function(transactionGroupId, transactionIndex, newTransaction) {
  for (const transactionGroup of this.transactionGroups) {
    if (transactionGroup.id == transactionGroupId) {
      transactionGroup[transactionIndex] = newTransaction
      break
    }
  }
}

module.exports = Session