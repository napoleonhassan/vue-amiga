export function upCount () {
  return parseInt(`${Date.now()}`.substring(6));
}

export function uniqueNumber() {
  const typedArray = new Uint8Array(4);
  const randomValues = window.crypto.getRandomValues(typedArray);
  return randomValues.join('');
}
