const prefix = "go-kurious-gemini:";
const listeners = new Map();

function read(key) {
  try {
    const value = localStorage.getItem(prefix + key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(prefix + key, JSON.stringify(value));
  } catch {
    // The simulator still works when storage is unavailable.
  }
}

function emit(collectionKey) {
  const callbacks = listeners.get(collectionKey) || [];
  const records = [];
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const storageKey = localStorage.key(i);
      if (storageKey?.startsWith(prefix + collectionKey + "/")) {
        const value = read(storageKey.slice(prefix.length));
        if (value) records.push(value);
      }
    }
  } catch {
    // Return an empty local leaderboard.
  }
  const snapshot = {
    forEach(callback) {
      records.forEach((value) => callback({ data: () => value }));
    }
  };
  callbacks.forEach((callback) => callback(snapshot));
}

export function getFirestore(app) {
  return { app };
}

export function doc(_db, ...parts) {
  return { key: parts.join("/") };
}

export function collection(_db, ...parts) {
  return { key: parts.join("/") };
}

export function query(reference) {
  return reference;
}

export async function getDoc(reference) {
  const value = read(reference.key);
  return {
    exists: () => value !== null,
    data: () => value
  };
}

export async function setDoc(reference, value, options = {}) {
  const previous = options.merge ? read(reference.key) || {} : {};
  write(reference.key, { ...previous, ...value });
  const parent = reference.key.split("/").slice(0, -1).join("/");
  emit(parent);
}

export function onSnapshot(reference, next) {
  const callbacks = listeners.get(reference.key) || [];
  callbacks.push(next);
  listeners.set(reference.key, callbacks);
  queueMicrotask(() => emit(reference.key));
  return () => {
    const active = listeners.get(reference.key) || [];
    listeners.set(reference.key, active.filter((callback) => callback !== next));
  };
}
