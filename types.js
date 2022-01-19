/**
 * @typedef TransactionStep
 * @property {Function<Promise<Aggrigate>, AA>} action
 * @property {Object[]?} action_args
 * @property {Promise} rollback
 * @property {Object[]?} rollback_args
 */