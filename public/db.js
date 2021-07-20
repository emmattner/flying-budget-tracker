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
    console.log(transactions);
    fetch('/api/transaction/bulk', {
        method: "POST",
        body: JSON.stringify(transactions),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }
    ).then(db.pending_transaction.clear)};
    
    


if (navigator.onLine) {
    getAllTransactions();
}