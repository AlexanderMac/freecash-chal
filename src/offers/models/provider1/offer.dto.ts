import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { OfferBoxSizeEnum } from 'src/offers/enums';

export class OfferDto {
  constructor() {
    this.providerName = 'offer1';
    this.slug = 'something-unique';
    this.boxSize = OfferBoxSizeEnum.SMALL;
  }

  @Expose({ name: 'offer_id' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  externalOfferId: string;

  @Expose({ name: 'offer_name' })
  @IsString()
  @MaxLength(255)
  name: string;

  // FIXME: no matching field in p1 payload
  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug: string;

  @Expose({ name: 'offer_desc' })
  @IsString()
  description: string;

  @Expose({ name: 'call_to_action' })
  @IsString()
  requirements: string;

  @Expose({ name: 'image_url' })
  @IsString()
  @MaxLength(255)
  thumbnail: string;

  // FIXME: no matching field in p1 payload
  @IsOptional()
  @IsEnum(OfferBoxSizeEnum)
  boxSize: OfferBoxSizeEnum;

  @Expose({ name: 'offer_url' })
  @IsString()
  @MaxLength(256)
  offerUrlTemplate: string;

  @Expose({ name: 'platform' })
  @IsBoolean()
  @Transform(({ value }) => value !== 'mobile')
  isDesktop: boolean;

  @Expose({ name: 'device' })
  set device(value: string) {
    this.isAndroid = !this.isDesktop && value !== 'iphone_ipad';
    this.isIos = !this.isDesktop && value === 'iphone_ipad';
  }

  @IsBoolean()
  isAndroid: boolean;

  @IsBoolean()
  isIos: boolean;

  @IsString()
  providerName: string;
}
