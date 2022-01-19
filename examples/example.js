import transaction from '../index.js';

try {
    const res = await transaction(
        { num : 10 },
        {
            action: (tx_state) => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        tx_state.num += 1;
                        console.log('Action 1');
                        resolve();
                    }, 1000);
                });
            },
            rollback: (tx_state) => {
                tx_state -= 1;
                console.log('Rollback 1');
            }
        },
        {
            action: () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log('Action 2');
                        resolve();
                    }, 1000);
                });
            },
            rollback: () => {
                console.log('Rollback 2');
            }
        },
        {
            action: () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log('Action 3');
                        reject();
                    }, 1000);
                });
            },
            rollback: () => {
                console.log('Rollback 3');
            }
        }
    )

    console.log("Transaction Successful", res);
} catch (e) {
    console.log("Transaction Failed");
}

import { Transaction } from '../index.js';

let TX = new Transaction({ num : 10 });

TX.add({
    action: (tx_state) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                tx_state.num += 1;
                console.log('Action 1');
                resolve();
            }, 1000);
        });
    },
    rollback: (tx_state) => {
        tx_state -= 1;
        console.log('Rollback 1');
    }
});

TX.add({
    action: () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Action 2');
                resolve();
            }, 1000);
        });
    },
    rollback: () => {
        console.log('Rollback 2');
    }
});

await TX.run();