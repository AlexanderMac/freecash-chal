import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { OffersService } from 'src/offers/offers.service';
import { OfferEntity } from 'src/offers/models/offer.entity';

@Controller('Offers')
export class OffersController {
  constructor(private offersSrvc: OffersService) {}

  @Get('/import/:providerId')
  importOffers(@Param('providerId', ParseIntPipe) providerId: number): Promise<OfferEntity[]> {
    return this.offersSrvc.importOffers(providerId);
  }
}
