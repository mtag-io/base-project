'use strict'

const {basename} = require('path')
const axios = require('axios')

const config = strapi.config['ssg']
const stasyUrl = `http://${config.stasyHost}:${config.stasyPort}`
const entity = basename(__filename.replace('.js', ''))

module.exports = {
  lifecycles: {
    afterUpdate: async ({app}) => {
      await axios.post(stasyUrl, {app: app.name, entity})
        .catch(e => {
            console.error(e.message)
          }
        )
    }
  }
}
