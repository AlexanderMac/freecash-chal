import { Module } from '@nestjs/common';

import { OffersModule } from 'src/offers/offers.module';

@Module({
  imports: [OffersModule],
})
export class AppModule {}
