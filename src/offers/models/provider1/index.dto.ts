import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { OfferDto } from 'src/offers/models/provider1/offer.dto';

export class ProviderResponseDto {
  @Expose({ name: 'response' })
  @Transform(({ value, obj }) => {
    obj.offers = value?.offers ?? [];
  })
  _response: any;

  @Expose()
  @Type(() => OfferDto)
  @IsArray()
  @ValidateNested()
  offers: OfferDto[];
}
