// START GetData
import fs from 'fs';

// Uncomment these imports to save as csv
// import { mkConfig, generateCsv, asString } from "export-to-csv";
// import { writeFile } from "node:fs";
// import { Buffer } from "node:buffer";


// Get the data file
async function getJsonData() {
 const file = await fetch(
   'https://raw.githubusercontent.com/weaviate-tutorials/intro-workshop/main/data/jeopardy_1k.json'
 );

 const data = await file.json()

 // Save as json
 fs.writeFile("jeopardy_1k.json", JSON.stringify(data), function(err) {
     if (err) {
         console.log(err);
     }
 });


 // // Uncomment this section to save as csv
 // const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: "jeopardy_1k" });

 // const csv = generateCsv(csvConfig)(data);
 // const filename = `${csvConfig.filename}.csv`;
 // const csvBuffer = new Uint8Array(Buffer.from(asString(csv)));

 // // Write the csv file to disk
 // writeFile(filename, csvBuffer, (err) => {
 //   if (err) throw err;
 //   console.log("file saved: ", filename);
 // });

}

await getJsonData();
// END GetData
