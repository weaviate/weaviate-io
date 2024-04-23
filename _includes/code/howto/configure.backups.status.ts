import assert from 'assert';
// START-ANY
import weaviate from 'weaviate-client';

const client = await weaviate.connectToLocal();

// END-ANY

// START StatusCreateBackup
let backupStatus = await client.backup.getCreateStatus({
  backupId: 'my-very-first-backup',
  backend: 'filesystem',
})

console.log(backupStatus);
// END StatusCreateBackup

// START StatusRestoreBackup
let restoreStatus = await client.backup.getRestoreStatus({
  backupId: 'my-very-first-backup',
  backend: 'filesystem',
})

console.log(restoreStatus);
// END StatusRestoreBackup

