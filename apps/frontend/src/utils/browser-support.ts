export const webp = async (): Promise<boolean> => {
  return await new Promise((res) => {
    const webP = new Image();
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    webP.onload = webP.onerror = (): void => {
      res(webP.height === 2);
    };
  });
};
