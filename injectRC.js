import Count from './models/CountModel.js'
import RC from './models/RCModel.js'

const injectRC = async () => {
  const rc = await RC.findOne({ name: 'North America' })

  await Count.updateMany(
    { royalChapter: 'North America' },
    { $set: { rc: rc._id } },
  )

  console.log('RC injected into Count documents successfully.')
}

export default injectRC
