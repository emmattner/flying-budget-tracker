/* global Dexie */

const db = new Dexie('transactions');
db.version(1).stores({
    pending_transaction: 'name, value',
})

function saveRecord(transaction){
    db.pending_transaction.put(transaction);
};

async function getAllTransactions() {
    const transactions = await db.pending_transaction.toArray();
    console.log({ transactions });
    if (transactions.length > 0) {
    fetch('/api/transaction/bulk', {
        method: "POST",
        body: JSON.stringify(transactions),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            }
        });  
    }
}    


if (navigator.onLine) {
    getAllTransactions();
}