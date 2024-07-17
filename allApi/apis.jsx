import instance from "./axios";
const endpoints={
  products:"products"
}

  export const allProductsApi = async () => {
    const { data } = await instance.get(endpoints.products);;
    return data;
  };

