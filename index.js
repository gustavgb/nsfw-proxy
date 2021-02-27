const express = require('express')
const cors = require('cors')
const deepai = require('deepai')
const fetch = require('node-fetch')
const { key } = require('./key.json')

const app = express()
app.use(cors())

deepai.setApiKey(key)

app.get('*', async (req, res) => {
  const image = req.query.image
  const isImageReq = req.header('accept').includes('image') && image

  if (isImageReq) {
    try {
      const result = await deepai.callStandardApi('nsfw-detector', {
        image
      })

      console.log(result.output.nsfw_score)
      if (result.output.nsfw_score > 0.5) {
        res.contentType('image/png')
        res.status(200)
        res.send()
      }
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }

  if (image) {
    try {
      const imageResult = await fetch(image)
      const buffer = await imageResult.buffer()

      res.write(buffer)
      res.end()
    } catch (err) {
      console.log(err.message)
      res.sendStatus(500)
    }
  }
})

const PORT = process.env.PORT || 9999
app.listen(PORT, () => console.log('Listening on ' + PORT))
