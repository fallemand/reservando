declare global {
  interface Window {
    opera: string;
  }
}
export default ((): boolean => {
  const testNavigator = navigator.userAgent || navigator.vendor || window.opera;
  const testRegex = new RegExp(
    "Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune",
  );
  return testRegex.test(testNavigator);
})();
