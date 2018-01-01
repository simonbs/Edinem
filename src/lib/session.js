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
      transactionGroup.transactions[transactionIndex] = newTransaction
      break
    }
  }
}

Session.prototype.deleteTransaction = function(transactionGroupId, transactionIndex) {
  for (const transactionGroup of this.transactionGroups) {
    if (transactionGroup.id == transactionGroupId) {
      transactionGroup.transactions.splice(transactionIndex, 1)
      // Remove transaction group if it is empty
      if (transactionGroup.transactions.length == 0) {
        this.transactionGroups = this.transactionGroups.filter((transactionGroup) => {
          return transactionGroup.id != transactionGroupId
        })
      }
      break
    }
  }
}

module.exports = Session