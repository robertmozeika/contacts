var mongodb = require('mongodb');

function getAllContacts(user){
  return new Promise((resolve, reject)=>{
    var MongoClient = mongodb.MongoClient;

    var url = "mongodb://user:avontopass@jello.modulusmongo.net:27017/Jy8pivuz"
    MongoClient.connect(url, function(err, db){
      if(err){
        console.log('Unable to connect' + err)
      } else {
        console.log('Connection between Database Success at connectDB');

        var collection = db.collection('contacts');


        collection.find({user: user}).toArray(function(err, result){
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
