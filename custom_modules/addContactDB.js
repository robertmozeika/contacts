var mongodb = require('mongodb');

function addContact(body){
  return new Promise((resolve, reject)=>{
    console.log('got here')
    var MongoClient = mongodb.MongoClient;

    var url = "mongodb://user:avontopass@jello.modulusmongo.net:27017/Jy8pivuz"
    MongoClient.connect(url, function(err, db){
      if(err){
        console.log('Unable to connect' + err)
      } else {
        console.log('Connection between Database Success at connectDB');

        var collection = db.collection('contacts');

        if (body.profilePic){
          body.profilePic = '/images/' + body.user + body.profilePic + '.jpg'
        }

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


module.exports = addContact
