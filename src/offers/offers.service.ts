import { HttpException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';

import { payload as p1 } from 'src/offers/payloads/p1';
import { payload as p2 } from 'src/offers/payloads/p2';
import { ProviderResponseDto as Provider1ResponseDto } from 'src/offers/models/provider1/index.dto';
import { ProviderResponseDto as Provider2ResponseDto } from 'src/offers/models/provider2/index.dto';
import { OfferEntity } from 'src/offers/models/offer.entity';

const VALIDATION_PROPS = {
  skipMissingProperties: false,
  whitelist: true,
  forbidUnknownValues: true,
  stopAtFirstError: false,
};

@Injectable()
export class OffersService {
  importOffers(providerId: number): Promise<OfferEntity[]> {
    switch (providerId) {
      case 1:
        return this.importProviderOneOffers(p1);
      case 2:
        return this.importProviderTwoOffers(p2);
      default:
        throw new HttpException(`Unsupported provider, id: ${providerId}`, 400);
    }
  }

  async importProviderOneOffers(providerRes: any) {
    try {
      const resDto = plainToInstance(Provider1ResponseDto, providerRes, {
        excludeExtraneousValues: true,
      });

      await validateOrReject(resDto, VALIDATION_PROPS);

      return plainToInstance(OfferEntity, resDto.offers);
    } catch (err: any) {
      if (err.length && err[0] instanceof ValidationError) {
        throw new HttpException("Unable to import provider's offers", 429);
      }
      throw err;
    }
  }

  async importProviderTwoOffers(providerRes: any) {
    try {
      const resDto = plainToInstance(Provider2ResponseDto, providerRes, {
        excludeExtraneousValues: true,
      });

      await validateOrReject(resDto, VALIDATION_PROPS);

      return plainToInstance(OfferEntity, resDto.offers);
    } catch (err: any) {
      if (err.length && err[0] instanceof ValidationError) {
        throw new HttpException("Unable to import provider's offers", 429);
      }
      throw err;
    }
  }
}
