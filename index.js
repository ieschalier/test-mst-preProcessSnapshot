const { types } = require('mobx-state-tree')

const Pending = types
  .model('Pending', {
    value: types.string,
  })
  .preProcessSnapshot(snap => ({
    ...snap,
    value: typeof snap === 'string' ? snap : snap.value.join(','),
  }))

const ModelWithArray = types.model('ModelWithArray', {
  pending: Pending,
})

const instance = ModelWithArray.create({ pending: { value: ['one', 'two'] } })

const expect = v => ({
  toBe: testValue => {
    if (v === testValue) {
      console.log('Success')
    } else {
      console.error(`Error : ${v} is not ${testValue}`)
    }
  },
})

expect(instance.pending.value).toBe('one,two')
