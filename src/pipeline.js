import { actions } from './actions'

const createPipeline = (...fns) => (x, dispatch) => fns.reduce((v, f) => f(v, dispatch), x)

const runPipeline = pipeline => state => {
  let callback
  const queue = []
  const corePipeline = pipeline
  let actualPipeline = pipeline

  const dispatch = (...actions) => {
    if (callback) callback()
    queue.push(...actions)
  }

  (async function () {
    while (true) {
      while (queue.length > 0) {
        const action = queue.shift()
        if (action.type === actions.pipelineChange) actualPipeline = createPipeline(corePipeline, action.value.pipe)
        actualPipeline(action, dispatch)
      }
      await new Promise(resolve => { callback = resolve })
      callback = null
    }
  }())
  corePipeline({ type: actions.state, value: state }, dispatch)
  return dispatch
}

export {
  createPipeline,
  runPipeline
}
