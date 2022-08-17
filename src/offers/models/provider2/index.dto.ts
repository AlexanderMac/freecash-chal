import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { OfferDto } from 'src/offers/models/provider2/offer.dto';

interface IDataItem {
  Offer: any;
  OS: any;
}

export class ProviderResponseDto {
  @Expose({ name: 'data' })
  @Transform(({ value, obj }) => {
    const dataItems = Object.values(value || {});
    obj.offers = dataItems.map((offer: IDataItem) => ({
      ...offer.Offer,
      ...offer.OS,
    }));
  })
  _data: any;

  @Expose()
  @Type(() => OfferDto)
  @IsArray()
  @ValidateNested()
  offers: OfferDto[];
}
