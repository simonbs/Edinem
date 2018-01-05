module.exports = function(transactionGroups) {
  return transactionGroups.reduce((current, transactionGroup) => {
    return current.concat(transactionGroup.transactions)
  }, [])
}