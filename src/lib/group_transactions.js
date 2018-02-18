const TransactionGroup = require('./transaction_group')

module.exports = function(transactions) {
  const groups = {}
  for (const transaction of transactions) {
    const baseURL = transaction.getBaseURL()
    if (baseURL in groups) {
      groups[baseURL].push(transaction)
    } else {
      groups[baseURL] = [ transaction ]
    }
  }
  return Object.keys(groups).map((key) => {
    const transactions = groups[key].sort(function(a, b) {   
      if (a.startTimeMillis < b.startTimeMillis) return -1
      if (a.startTimeMillis > b.startTimeMillis) return 1
      return 0
    })
    return new TransactionGroup(key, transactions)
  }).sort(function(a, b) {
    if(a.name < b.name) return -1
    if(a.name > b.name) return 1
    return 0
  })
}