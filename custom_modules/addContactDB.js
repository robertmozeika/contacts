var mongodb = require('mongodb');

function getAllContacts(body){
  console.log(body)
  return new Promise((resolve, reject)=>{
    var MongoClient = mongodb.MongoClient;

    var url = "mongodb://localhost:27017/avonto"
    MongoClient.connect(url, function(err, db){
      if(err){
        console.log('Unable to connect' + err)
      } else {
        console.log('Connection between Database Success at connectDB');

        var collection = db.collection('contacts');

        collection.insert(body, function(err, result){
          if(err) {
            reject(err)
          }else{
            resolve(result)
          }

        db.close();

      });

      }
    })
  })


}


module.exports = getAllContacts
