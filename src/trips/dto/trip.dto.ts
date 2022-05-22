import { IsDateString, IsDecimal, IsNotEmpty, IsString } from "class-validator";


export class TripDto {
  @IsString()
  @IsNotEmpty()
  start_address: string;

  @IsString()
  @IsNotEmpty()
  destination_address: string;

  @IsDecimal()
  price: number;

  @IsDateString()
  date: Date;
}