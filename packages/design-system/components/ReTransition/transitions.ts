/* eslint-disable no-param-reassign  */
export const heightTransition = {
  onAfterEnter(element: HTMLDivElement): void {
    element.style.height = "auto";
  },
  onEnter(element: HTMLDivElement): void {
    const { width } = getComputedStyle(element);
    element.style.width = width;
    element.style.position = "absolute";
    element.style.visibility = "hidden";
    element.style.height = "auto";
    const { height } = getComputedStyle(element);
    element.style.width = "";
    element.style.position = "";
    element.style.visibility = "";
    element.style.height = "0";
    requestAnimationFrame(() => {
      element.style.height = height;
    });
  },
  onLeave(element: HTMLDivElement): void {
    const { height } = getComputedStyle(element);
    element.style.height = height;
    requestAnimationFrame(() => {
      element.style.height = "0";
    });
  },
};
