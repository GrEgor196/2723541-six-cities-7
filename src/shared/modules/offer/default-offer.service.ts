import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const { authorId, ...offerData } = dto;
    const createdOffer = await this.offerModel.create({
      ...offerData,
      author: authorId
    });
    this.logger.info(`Created offer with ID: ${createdOffer._id}`);
    return createdOffer;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const foundOffer = await this.offerModel.findById(offerId).exec();
    if (foundOffer) {
      this.logger.info(`Found offer with ID: ${foundOffer._id}`);
    } else {
      this.logger.warn(`Offer with ID: ${offerId} not found`);
    }
    return foundOffer ?? null;
  }
}
