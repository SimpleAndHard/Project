import instance from './axios';

export default {
  login: (config) => instance.post('/passport/login', config),
  goodslist: (config) => instance.get('/products/all', config),
  goodstype: (config) => instance.get('/category/all', config),
  addgoods: (config) => instance.post('/products/add', config),
  ediitgoods: (config) => instance.put('/products/edit', config),
  deletegoods: (id) => instance.delete(`/products/${id}`),
};
