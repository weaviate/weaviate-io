import assert from 'assert';
// START CreateBackup
import weaviate from 'weaviate-client';

const client = await weaviate.connectToLocal();

let result = await client.backup.create({
  backupId: 'my-very-first-backup',
  backend: 'filesystem',
  // Optional parameters
  // waitForCompletion: true,
  // includeCollections: ['Article', 'Publication'],
  // excludeCollections: ['Author'],
})

console.log(result.status);
// END CreateBackup
