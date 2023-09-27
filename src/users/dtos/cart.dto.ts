class CartElement {
  itemId: string;
  amount: number;
}

export class UpdateCartDto {
  cartElements: CartElement[];
}
