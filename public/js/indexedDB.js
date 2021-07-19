import { db } from "../../models/transaction";

export function checkForIndexedDb() {
    if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB.");
        return false;
    }
    return true;
}

export function useIndexedDb(budgetTracker, storeName, method, object) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(budgetTracker, 1);
        let db,
            tx,
            store;

        request.onupgradeneeded = function (event) {
            const db = request.result;
            db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
        };

        request.onerror = (err) => {
            console.log("There was an error");
        };

        request.onsuccess = function (event) {
            db = event.target.result;
            tx = db.transaction(storeName, "readwrite");
            store = tx.objectStore(storeName);
            if (navigator.onLine) {
                checkDatabase();
            }
        };
    });
}

function saveRecord(record) {
    const transaction = db.transaction("pending", "readwrite");
    const store = transaction.objectStore("pending");
    store.add(record);
}

function checkDatabase() {
    const transaction = db.transaction("pending", "readonly")
    const store = transaction.objectStore("pending");
    const getAll = store.getAll();

    getAll.onsuccess = () => {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/' {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers:

            })
        }
    }
}