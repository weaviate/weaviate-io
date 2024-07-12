import assert from 'assert';
// START RestoreBackup
import weaviate from 'weaviate-client';

const client = await weaviate.connectToLocal();

let result = await client.backup.restore({
  backupId: 'my-very-first-backup',
  backend: 'filesystem',
  // Optional parameters
  // waitForCompletion: true,
  // includeCollections: ['Article', 'Publication'],
  // excludeCollections: ['Author'],
})

console.log(result.status);
// END RestoreBackup
