export default function corsValidation(origin?: string, callback?: (err: Error | null, origin?: string) => void) {
  if (!callback) {
    return
  }

  if (!origin) {
    callback(null)
  } else {
    try {
      const eee = new URL(origin)
      if (eee.hostname == 'localhost') {
        callback(null, origin)
      }
    } catch (e) {
      const err = new Error('403')
      callback(err)
    }
  }
}
