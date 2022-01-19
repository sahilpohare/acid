/**
 * @param  {...TransactionStep} args 
 * @returns {Promise<any>}
 */
const transaction = async (tx_state, ...args) => {
    if(args.length == 0) return 0;

    for(let step = 0; step < args.length; step++) {
        if(!args[step].action) {
            throw new Error('Invalid transaction step');
        }

        if(!args[step].rollback) {
            throw new Error('Invalid transaction step, No Rollback');
        }
    
        try {
           await args[step].action(tx_state);
        } catch(e) {
            for(let c = step; c >= 0; c--) {
                try {
                    await args[c].rollback(tx_state);
                } catch (e) {
                    throw new Error('Rollback failed', e);
                }
            }
           throw e;
        }
    }

    return tx_state;
}

export default transaction;

export class Transaction {
    constructor(tx_state, ...args) {
        this.tx_state = tx_state;
        this.args = args;
    }

    async run() {
        return await transaction(this.tx_state, ...this.args);
    }

    /**@param {TransactionStep[]} args*/
    add(...args) {
        this.args.push(...args);
    }
}
