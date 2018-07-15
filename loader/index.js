var fs = require('fs');
var CsvReadableStream = require('csv-reader');

var inputStream = fs.createReadStream('loader/biblioteca.csv', 'utf8');

let books = [];

inputStream
  .pipe(
    CsvReadableStream({
      skipHeader: true,
      parseNumbers: true,
      parseBooleans: true,
      trim: true
    })
  )
  .on('data', function(row) {
    console.log('A row arrived...');
    books.push({
      type: row[0],
      language: row[1] || 'IT',
      title: row[2],
      author: row[3],
      edition: row[4],
      city: row[5],
      publisher: row[6],
      year: row[7],
      pages: row[8],
      attachments: row[9],
      series: row[10],
      seriesAdmin: row[11],
      seriesNumber: row[12],
      note: row[13],
      isbn: row[14],
      keywords: row[15],
      code: row[16],
      inventory: row[17],
      referenceOnly:
        typeof row[13] === 'string' &&
        row[13].toLowerCase().indexOf('consultazione') > -1,
      isAvailable: true,
      created_at: new Date(),
      updated_at: new Date()
    });
  })
  .on('end', function(data) {
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/';
    MongoClient.connect(
      url,
      function(err, db) {
        if (err) throw err;
        var dbo = db.db('bookshelf');
        dbo.collection('book').insert(books, function(err, res) {
          if (err) {
            console.log(err);
            throw err;
          }
          console.log('ok');
          db.close();
        });
      }
    );
  });
