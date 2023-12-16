const shorten = (text) => {
  return text.split(" ").slice(0, 3).join("");
};
const searchProducts = (products, search) => {
  if (!search) return products;
  const searchProduct = products.filter((product) =>
    product.title.toLowerCase().includes(search)
  );
  return searchProduct;
};
const filterProducts = (products, category) => {
  if (!category) return products;
  const filterProduct = products.filter(
    (product) => product.category === category
  );
  return filterProduct;
};
const sumProducts = (items) => {
  const itemsCounter = items.reduce(
    (counter, product) => counter + product.quantity,
    0
  );
  const total = items
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
  return { itemsCounter, total };
};
const productQuantity = (state, id) => {
  const index = state.selectedItems.findIndex((item) => item.id === id);
  if (index === -1) {
    return 0;
  } else {
    return state.selectedItems[index].quantity;
  }
};
export {
  shorten,
  searchProducts,
  filterProducts,
  sumProducts,
  productQuantity,
};
