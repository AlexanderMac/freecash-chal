import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { OfferBoxSizeEnum } from 'src/offers/enums';

export class OfferDto {
  constructor() {
    this.providerName = 'offer2';
    this.slug = 'something-unique';
    this.boxSize = OfferBoxSizeEnum.SMALL;
  }

  @Expose({ name: 'campaign_id' })
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => (value || '').toString())
  externalOfferId: string;

  @Expose()
  @IsString()
  @MaxLength(255)
  name: string;

  // FIXME: no matching field in p2 payload
  @IsOptional()
  @IsString()
  @MaxLength(255)
  slug: string;

  @Expose({ name: 'description' })
  @IsString()
  description: string;

  @Expose({ name: 'instructions' })
  @IsString()
  requirements: string;

  // FIXME: probably wrong matching
  @Expose({ name: 'icon' })
  @IsString()
  @MaxLength(255)
  thumbnail: string;

  // FIXME: no matching field in p2 payload
  @IsOptional()
  @IsEnum(OfferBoxSizeEnum)
  boxSize: OfferBoxSizeEnum;

  @Expose({ name: 'tracking_url' })
  @IsString()
  @MaxLength(256)
  offerUrlTemplate: string;

  @Expose({ name: 'web' })
  @IsBoolean()
  isDesktop: boolean;

  @Expose({ name: 'android' })
  @IsBoolean()
  isAndroid: boolean;

  @Expose({ name: 'ios' })
  @IsBoolean()
  isIos: boolean;

  @IsString()
  providerName: string;
}
