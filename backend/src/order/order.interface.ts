//{
//  "userId": 1,
//  "totalPrice": 59,
//  "cartId": 1,
//  "orderItems": [
//    {
//      "itemId": 10
//    },
//    {
//      "itemId": 15
//    }
//  ]
//}

export interface ICreateOrderRequest {
  userId: number;       
  totalPrice: number;  
  cartId: number;
  orderItems: Array<{
    itemId: number;     
    itemSize: string;
    itemPrice: number;
  }>;
}
