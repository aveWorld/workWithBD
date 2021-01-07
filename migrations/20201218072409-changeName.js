module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db
      .collection('countries')
      .updateOne({ name: 'France' }, { $set: { blacklisted: true } }, () => {
        console.log('migrated up');
      });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db
      .collection('countries')
      .updateOne({ name: 'France' }, { $set: { blacklisted: false } }, () => {
        console.log('migrated down');
      });
  },
};
