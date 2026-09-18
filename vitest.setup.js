// Node 25 ships a built-in `localStorage` global that is inert unless the
// process is started with `--localstorage-file`. It shadows jsdom's own
// implementation, so under Vitest `window.localStorage` arrives as a bare
// object with none of the Storage methods, and any call to it throws.
// (jsdom's `sessionStorage` is unaffected, which is how you can tell them
// apart.) Install a spec-shaped in-memory Storage so tests exercise the same
// persistence path a browser would.

function createMemoryStorage() {
  const entries = new Map()

  return {
    get length() {
      return entries.size
    },
    key(index) {
      const keys = Array.from(entries.keys())
      return index < keys.length ? keys[index] : null
    },
    getItem(key) {
      const name = String(key)
      return entries.has(name) ? entries.get(name) : null
    },
    setItem(key, value) {
      entries.set(String(key), String(value))
    },
    removeItem(key) {
      entries.delete(String(key))
    },
    clear() {
      entries.clear()
    },
  }
}

if (typeof window !== 'undefined' && typeof window.localStorage?.getItem !== 'function') {
  Object.defineProperty(window, 'localStorage', {
    value: createMemoryStorage(),
    configurable: true,
    writable: true,
  })
}
