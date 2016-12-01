let data = 0;

const get = () => ({
  counter: data
});

const increment = (payload) => {
  data += payload;
  return get();
};

const decrement = (payload) => {
  data -= payload;
  return get();
};

const reset = () => {
  data = 0;
  return get();
};

export {
  get, increment, decrement, reset
};
