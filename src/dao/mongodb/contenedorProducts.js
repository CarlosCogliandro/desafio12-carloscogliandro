import { checkProduct } from '../../utils/utilities.js';
import { productModelName, productSchema } from '../schemaConfig.js';
import MongoContainer from './contenedor.js';

class MongoProducts extends MongoContainer{
    constructor(){
        super(productModelName, productSchema)
    }
    
    async saveProduct(product){
        if(product.id){
            delete product.id
        }
        if(checkProduct(product)){
            let response = this.collection.create(product)
            return response
        }
        throw new Error('Invalid Product')
    }

    async updateProduct(product, productId){
        let response = this.collection.updateOne({_id : productId}, product)
        if(product){
            return response
        }
        else{throw new Error(400)}
    }
}

export default MongoProducts