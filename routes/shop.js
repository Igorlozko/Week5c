const express = require('express')
const router = express.Router()
const getDbClient = require('../util/database').getDbClient

let nextProductId = 0



router.get('/', (req, res, next) => {
  const db = getDbClient()
  db
  .collection('products')
  .find()
  .toArray()
  .then(products => {
    res.send('All products: ' + JSON.stringify(products))
  })
  .catch(err => {
    res.send('Error: ' + err)
  })
})

router.get('/getSpecificProduct', (req, res, next) => {
  const db = getDbClient()
  db
  .collection('products')
  .findOne({ourId: '1'})
  .then(theProduct => {
    res.send('Specific product: ' + JSON.stringify(theProduct))
  })
  .catch(err => {
    res.send('Error: ' + err)
  })
})

router.get('/addProduct', (req, res, next) => {
  res.send(`
    <form action="/addTheProduct" method="POST">
      <input type="text" name="title" placeholder="Product title">
      <input type="text" name="price" placeholder="Product price">
      <button type="submit">Add Product</button>
    </form>
  `);
});

router.post('/addTheProduct', (req, res, next) => {
  const db = getDbClient()
  db.collection('products').insertOne({ ourId: '' + nextProductId, name: req.body.title, price: req.body.price })
  .then(() => {
    nextProductId++
    res.redirect('/')
  })
  .catch(err => {
    res.send('Error: ' + err)
  })
})

router.get('/updateProduct', (req, res, next) => {
  const db = getDbClient()
  db
  .collection('products')
  .updateOne( { ourId: '0' }, {$set: {price: '99.95'}} )
  .then(() => {
    res.redirect('/')
  })
  .catch(err => {
    res.send('Error: ' + err)
    res.redirect('/')
  })
})

router.get('/deleteProduct', (req, res, next) => {
  const db = getDbClient()
  db
  .collection('products')
  .deleteOne( { ourId: '0' } )
  .then(() => {
    res.redirect('/')
  })
  .catch(err => {
    res.send('Error: ' + err)
  })
})

exports.routes = router
