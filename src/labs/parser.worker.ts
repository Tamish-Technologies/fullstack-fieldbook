import { parse } from 'acorn'

self.onmessage = ({ data }) => {
  try {
    if (typeof data !== 'string' || data.length > 4000)
      throw Error('Keep the exercise within 4,000 characters.')
    const tree = parse(data, { ecmaVersion: 2020 })
    self.postMessage({ tree })
  } catch (error) {
    self.postMessage({
      error:
        error instanceof Error
          ? error.message.slice(0, 160)
          : 'Check your JavaScript syntax.',
    })
  }
}
