const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://kytadmindb:$01%40$db$mongo*12@kytappdb.mongocluster.cosmos.azure.com/kytapis?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});


// mongoose.connect('mongodb+srv://birajit_dev:*67Birajit_dev@ne-surf.g7a62.mongodb.net/neSurf?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected')
});

// Models
require('./allnews');