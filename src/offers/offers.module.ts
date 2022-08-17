import { Module } from '@nestjs/common';

import { OffersController } from 'src/offers/offers.controller';
import { OffersService } from 'src/offers/offers.service';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
