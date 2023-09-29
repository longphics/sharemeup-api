import { IsNotEmpty } from 'class-validator';

type CartElement = {
  itemId: string;
  amount: number;
};

export class UpdateCartDto {
  @IsNotEmpty()
  cartElements: CartElement[];
}
