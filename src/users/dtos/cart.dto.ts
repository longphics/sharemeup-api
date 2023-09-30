import { IsNotEmpty } from 'class-validator';

export class UpdateCartDto {
  @IsNotEmpty()
  itemId: string;

  @IsNotEmpty()
  amount: number;
}
