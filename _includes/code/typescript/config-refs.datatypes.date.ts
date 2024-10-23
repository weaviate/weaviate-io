import assert from 'assert';
import weaviate, { WeaviateClient } from 'weaviate-client';

// START ConfigureDataType
import { dataType } from 'weaviate-client';

// END ConfigureDataType

const client: WeaviateClient = await weaviate.connectToLocal();

await client.collections.delete('ConcertTour');

// START ConfigureDataType
// Create collection
const myCollection = await client.collections.create({
  name: 'ConcertTour',
  properties: [
    {
      name: 'artist',
      dataType: dataType.TEXT,
    },
    {
      name: 'tour_name',
      dataType: dataType.TEXT,
    },
    {
      name: 'tour_start',
      dataType: dataType.DATE,
    },
    {
      name: 'tour_dates',
      dataType: dataType.DATE_ARRAY,
    },
  ],
  // Other properties are omitted for brevity
});
// END ConfigureDataType

// START AddObject
const exampleObject = {
  name: 'Taylor Swift',
  tour_name: 'Eras Tour',
  tour_start: new Date(2023, 3, 17),
  // Use JavaScript Date object
  tour_dates: [
    new Date(2023, 3, 17),
    new Date(2023, 3, 18),
    // .. more dates
    new Date(2024, 12, 6),
    new Date(2024, 12, 7),
  ],
  // // Or, use RFC3339 string
  // tour_dates: [
  //   '2023-03-17T00:00:00Z',
  //   '2023-03-18T00:00:00Z',
  //   // .. more dates
  //   '2024-12-07T00:00:00Z',
  //   '2024-12-08T00:00:00Z',
  // ]
};

const obj_uuid = await myCollection.data.insert(exampleObject);
// END AddObject

const returnedObject = await myCollection.query.fetchObjectById(obj_uuid);

assert.notEqual(obj_uuid, null);
assert.deepEqual(
  returnedObject?.properties.tour_start,
  exampleObject.tour_start
);

client.close();
