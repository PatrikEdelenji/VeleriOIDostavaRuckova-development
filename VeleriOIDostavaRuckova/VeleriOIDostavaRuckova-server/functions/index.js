const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





var admin = require("firebase-admin");

var serviceAccount = require("./velerioidostavaruckova-firebase-adminsdk-bosg4-81b106bf20.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  
 // databaseURL: "https://velerioidostavaruckova.firebaseio.com"
});


const db = admin.firestore();

app.get('/getkorisnici', (request, response) => {
  let res = [];
  db.collection('korisnici')
  .get()
  .then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
  let document = {
  id: doc.id,
  data: doc.data()
  }
  res.push(document)
  })
  return response.send(res)
  })
  .catch ((error) => {
  return response.send("Error getting documents: ", error);
  })
 })
 
/*


app.get('/hello', (request, response) => {
 return response.send('Hello world');
});


app.post('/addkorisnici', (request, response) => {
 const data = request.body;
 console.log(data.korisnici);
 return response.send('POST metoda -> Add '+data.korisnici);
});


app.put('/changekorisnici', (request, response) => {
 const data = request.body;
 console.log(data.korisnici);
 return response.send('PUT metoda -> Change '+data.korisnici);
})


app.delete('/delkorisnici', (request, response) => {
 const data = request.body;
 console.log('Delete '+data.korisnici);
 return response.send('Delete '+data.korisnici);
})
*/

app.get('/administratori', (request, response) => {
  let res = []
  if (typeof request.query.id === 'undefined') {
  db.collection('administratori').get()
  .then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
  let document = {
  id: doc.id,
  data: doc.data()
  }
  res.push(document)
  })
  return response.send(res)
  })
  .catch(function (error) {
  return response.send("Error getting docs: " + error)
  })
  } else {
  var docRef = db.collection('administratori').doc(request.query.id)
  docRef.get()
  .then((doc) => {
  if (typeof doc.data() !== 'undefined') {
    console.log('doc', doc.data())
    let document = {
    id: doc.id,
    data: doc.data()
    }
    return response.send(document)
    } else {
    return response.send(
    "Error getting document " +
    request.query.id +
    ": The document is undefined"
    )
    }
    })
    .catch(function (error) {
    return response.send(
    "Error getting document " +
    request.query.id +
    ": " + error
    )
    })
    }
   })
    

   app.post('/administratori', (request, response) => {
    if (Object.keys(request.body).length) {
    db.collection('administratori').doc().set(request.body)
    .then(function () {
    return response.send(
    "Document successfully written - created!"
    )
    })
    .catch(function (error) {
    return response.send(
    "Error writing document: " + error
    )
    })
    } else {
    return response.send(
    "No post data for new document. " +
    "A new document is not created!"
    )
    }
   })
   //STVARANJE NOVIH

   app.put('/administratori', (request, response) => {
    if (Object.keys(request.body).length) {
    if (typeof request.query.id !== 'undefined') {
    db.collection('administratori')
    .doc(request.query.id)
    .set(request.body)
    .then(function () {
    return response.send(
    "Document successfully written - " +
    "updated!"
    )
    })
    .catch(function (error) {
      return response.send(
      "Error writing document: " + error
      )
      })
      } else {
      return response.send(
      "A parameter id is not set. " +
      "A document is not updated!"
      )
      }
      } else {
      return response.send(
      "No post data for new document. " +
      "A document is not updated!"
      )
      }
     })
   
     //BRISANJE

     app.delete('/administratori', (request, response) => {
      if (typeof request.query.id !== 'undefined') {
      db.collection('administratori').doc(request.query.id).delete()
      .then(function () {
      return response.send(
      "Document successfully deleted!"
      )
      })
      .catch(function (error) {
      return response.send(
      "Error removing document: " + error
      )
      })
      } else {
      return response.send(
      "A parameter id is not set. " +
      "A document is not deleted!"
      )
      }
     })
     
     //SORITRANJE
/*
     app.get('/administratori', (request, response) => {
      let res = []
      if (typeof request.query.id === 'undefined') {
      var cRef = db.collection('administratori').orderBy('ime_administratora')
      cRef.get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
      let document = {
      id: doc.id,
      data: doc.data()
      }
      res.push(document)
      })
      return response.send(res)
      })
      .catch(function (error) {
      return response.send(
      "Error getting documents: " + error
      )
      })
      } else {
      var docRef =
     db.collection('madministratori').doc(request.query.id)
      docRef.get()
      .then((doc) => {
      if (typeof doc.data() !== 'undefined') {
      let document = {
      id: doc.id,
      data: doc.data()
      }
      return response.send(document)
    } else {
      return response.send(
      "Error getting document " +
      request.query.id +
      ": The document is undefined"
      )
      }
      })
      .catch(function (error) {
      return response.send(
      "Error getting document " +
      request.query.id +
      ": " + error
      )
      })
      }
     })
     
*/



app.get('/administratori', async (request, response) => {
  let id = (
  typeof request.query.id !== 'undefined'
  ? request.query.id
  : null
  )
  let order = null
  let where = null
  if (id === null) {
  order = models.getOrder(request.query)
  where = models.getWhere(request.query)
  }
  models.get(db, 'administratori', id, order, where)
.then(res => {
return response.send(res)
}).catch((error) => {
return response.send(error)
})
})



app.get('/administratori', async (request, response) => {
  let id = (
  typeof request.query.id !== 'undefined'
  ? request.query.id
  : null
  )
  let order = {
  orderAttr: (
  typeof request.query.orderAttr !== 'undefined'
  ? request.query.orderAttr
  : null
  ),
  orderType: (
  typeof request.query.orderDesc !== 'undefined'
  ? 'desc'
  : 'asc'
  )
  }
  models.get(db, 'administratori', id, order)
  .then(res => {
  return response.send(res)
  }).catch((error) => {
  return response.send(error)
  })
 })   


 app.get('/administratori', async (request, response) => {
  let id = (
  typeof request.query.id !== 'undefined'
  ? request.query.id
  : null
  )
  let order = null
  let where = null
  if (id === null) {
  order = models.getOrder(request.query)
  where = models.getWhere(request.query)
  }
  models.get(db, 'administratori', id, order, where)
.then(res => {
return response.send(res)
}).catch((error) => {
return response.send(error)
})
})

 








app.listen(3000, () => {
 console.log("Server running on port 3000");
});