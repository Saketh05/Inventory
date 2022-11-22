import urlService from "./urlService"

const Service = {
  getProducts: async () =>{
    try{
        const productsData = await urlService.get("/products");
        return productsData.data;
    }
    catch(error){
        console.log(`error while getting products ${error}`)
    }
  },
  patchProduct: async (Id:number, newPrice:number,newQuatity:number) =>{
    try{
      await urlService.patch(`/products/${Id}`,
      {
        price: newPrice,
        quantity: newQuatity
      })
    }
    catch(error){
      console.log(`error while performing patch for a product ${error}`)
    }
  }
}

export default Service
