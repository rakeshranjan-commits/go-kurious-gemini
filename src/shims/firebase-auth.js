const localUser = { uid: "go-kurious-local-student" };

export function getAuth(app) {
  return { app, currentUser: localUser };
}

export async function signInWithCustomToken() {
  return { user: localUser };
}

export async function signInAnonymously() {
  return { user: localUser };
}

export function onAuthStateChanged(_auth, callback) {
  queueMicrotask(() => callback(localUser));
  return () => {};
}
