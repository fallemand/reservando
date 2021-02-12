export default (str: string): string => {
  const temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
};
