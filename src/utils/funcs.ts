// return the id from `user.sub`
function getSubId(sub: string): string {
  return sub.split('|')[1];
}

// auto convert string | string[] to single string
function autoString(s: string | string[]): string {
  return Array.isArray(s) ? s.join() : s;
}

export { getSubId, autoString };
