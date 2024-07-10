// How-to: Configure -> Backups - TypeScript examples
// run with: node --loader=ts-node/esm configure.backups.ts
import assert from 'assert';

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================

// START CreateBackup
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
});
// END CreateBackup

// Create the classes, whether they exist or not
await client.data.creator().withClassName('Article').withProperties({ title: 'Dummy' }).do();
await client.data.creator().withClassName('Publication').withProperties({ name: 'Dummy' }).do();
// START CreateBackup

let result = await client.backup.creator()
  .withIncludeClassNames('Article', 'Publication')
  .withBackend('filesystem')
  .withBackupId('my-very-first-backup')
  .withWaitForCompletion(true)
  .do();
// Returns the status of the operation in .status, as well as the .classes that were backed up

console.log(JSON.stringify(result, null, 2));
// END CreateBackup

// Test
assert.equal(result.status, 'SUCCESS');


// ==============================================
// ===== Check status while creating backup =====
// ==============================================

// START StatusCreateBackup
let status = await client.backup.createStatusGetter()
  .withBackend('filesystem')
  .withBackupId('my-very-first-backup')
  .do();
// Returns the .status, .id, .backend, and backend-specific values

console.log(JSON.stringify(status, null, 2));
// END StatusCreateBackup

// Test
assert.equal(result.status, 'SUCCESS');


// ==========================
// ===== Restore backup =====
// ==========================

await client.schema.classDeleter().withClassName('Publication').do();
// START RestoreBackup
result = await client.backup.restorer()
  .withExcludeClassNames('Article')
  .withBackend('filesystem')
  .withBackupId('my-very-first-backup')
  .withWaitForCompletion(true)
  .do();
// The returned value is includes the .status and array of .classes that were restored

console.log(JSON.stringify(result, null, 2));
// END RestoreBackup

// Test
assert.equal(result.status, 'SUCCESS');


// ==============================================
// ===== Check status while restoring backup =====
// ==============================================

// START StatusRestoreBackup
status = await client.backup.restoreStatusGetter()
  .withBackend('filesystem')
  .withBackupId('my-very-first-backup')
  .do();
// Returns the .status, .id, .backend, and backend-specific values

console.log(JSON.stringify(status, null, 2));
// END StatusRestoreBackup

// Test
assert.equal(result.status, 'SUCCESS');
