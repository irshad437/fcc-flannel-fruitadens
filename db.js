var mongoose = require('mongoose')

mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true })
.then(con => {
  console.log('Mongoose connected...')
})
.catch(err => {
  console.log('Mongoose error: ', err)
  process.exit()
})