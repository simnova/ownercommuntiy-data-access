import { AdditionalAmenities } from '../../../graphql/generated';
import { Entity, EntityProps } from '../../shared/entity';
import { PropArray } from '../../shared/prop-array';
import { DomainExecutionContext } from '../context';
import { BedroomDetail, BedroomDetailProps, BedroomDetailReference } from './bedroom-detail';
import { AdditionalAmenity, AdditionalAmenityProps, AdditionalAmenityReference } from './additional-amenity';
import * as ValueObjects from './listing-detail-value-objects';
import { PropertyVisa } from '../iam/property-visa';

export interface ListingDetailProps extends EntityProps {
  price: number;
  rentHigh: number;
  rentLow: number;
  lease: number;
  maxGuests: number;
  bedrooms: number;
  readonly bedroomDetails: PropArray<BedroomDetailProps>;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  lotSize: number;
  description: string;
  amenities: string[];
  readonly additionalAmenities: PropArray<AdditionalAmenityProps>;
  images: string[];
  video: string;
  floorPlan: string;
  floorPlanImages: string[];
  listingAgent: string;
  listingAgentPhone: string;
  listingAgentEmail: string;
  listingAgentWebsite: string;
  listingAgentCompany: string;
  listingAgentCompanyPhone: string;
  listingAgentCompanyEmail: string;
  listingAgentCompanyWebsite: string;
  listingAgentCompanyAddress: string;
}

export interface ListingDetailsEntityReference extends Readonly<Omit<ListingDetailProps,
  'bedroomDetails'|'additionalAmenities'>> {
  bedroomDetails: ReadonlyArray<BedroomDetailReference>;
  additionalAmenities: ReadonlyArray<AdditionalAmenityReference>;
}

export class ListingDetails extends Entity<ListingDetailProps> implements ListingDetailsEntityReference {
  constructor(props: ListingDetailProps, private readonly visa: PropertyVisa) { super(props); }

  get price() { return this.props.price; } 
  get rentHigh() { return this.props.rentHigh; }
  get rentLow() { return this.props.rentLow; }
  get lease() { return this.props.lease; }
  get maxGuests() { return this.props.maxGuests; }
  get bedrooms() { return this.props.bedrooms; }
  get bedroomDetails(): ReadonlyArray<BedroomDetail> { return this.props.bedroomDetails.items.map(bedroomDetail => new BedroomDetail(bedroomDetail,this.visa)); }
  get bathrooms() { return this.props.bathrooms; }
  get squareFeet() { return this.props.squareFeet; }
  get yearBuilt() { return this.props.yearBuilt; }
  get lotSize() { return this.props.lotSize; }
  get description() { return this.props.description; }
  get amenities() { return this.props.amenities; }
  get additionalAmenities(): ReadonlyArray<AdditionalAmenity> { return this.props.additionalAmenities.items.map(additionalAmenity => new AdditionalAmenity(additionalAmenity,this.visa)); }
  get images() { return this.props.images; }
  get video() { return this.props.video; }
  get floorPlan() { return this.props.floorPlan; }
  get floorPlanImages() { return this.props.floorPlanImages; }
  get listingAgent() { return this.props.listingAgent; }
  get listingAgentPhone() { return this.props.listingAgentPhone; }
  get listingAgentEmail() { return this.props.listingAgentEmail; }
  get listingAgentWebsite() { return this.props.listingAgentWebsite; }
  get listingAgentCompany() { return this.props.listingAgentCompany; }
  get listingAgentCompanyPhone() { return this.props.listingAgentCompanyPhone; }
  get listingAgentCompanyEmail() { return this.props.listingAgentCompanyEmail; }
  get listingAgentCompanyWebsite() { return this.props.listingAgentCompanyWebsite; }
  get listingAgentCompanyAddress() { return this.props.listingAgentCompanyAddress; }

  private validateVisa(){
    if(!this.visa.determineIf((permissions) => 
      permissions.canManageProperties ||
      (permissions.canEditOwnProperty && permissions.isEditingOwnProperty))) {
      throw new Error('You do not have permission to update this listing');
    }
  }

  requestSetPrice(price: ValueObjects.Price):void{
    this.validateVisa();
    this.props.price = price.valueOf();
  }
  requestSetRentHigh(rentHigh: ValueObjects.RentHigh):void{
    this.validateVisa();
    this.props.rentHigh = rentHigh.valueOf();
  }
  requestSetRentLow(rentLow: ValueObjects.RentLow):void{
    this.validateVisa();
    this.props.rentLow = rentLow.valueOf();
  }
  requestSetLease(lease: ValueObjects.Lease):void{
    this.validateVisa();
    this.props.lease = lease.valueOf();
  }
  requestSetMaxGuests(maxGuests: ValueObjects.MaxGuests):void{
    this.validateVisa();
    this.props.maxGuests = maxGuests.valueOf();
  }
  requestSetBedrooms(bedrooms: ValueObjects.Bedrooms):void{
    this.validateVisa();
    this.props.bedrooms = bedrooms.valueOf();
  }
  //requestSetBedroomDetails(bedroomDetails: BedroomDetail[]):void{
  //  this.props.bedroomDetails.items = bedroomDetails.map(bedroomDetail => bedroomDetail.props);
  //}
  requestSetBathrooms(bathrooms: ValueObjects.Bathrooms):void{
    this.validateVisa();
    this.props.bathrooms = bathrooms.valueOf();
  }
  requestSetSquareFeet(squareFeet: ValueObjects.SquareFeet):void{
    this.validateVisa();
    this.props.squareFeet = squareFeet.valueOf();
  }
  requestSetYearBuilt(yearBuilt: ValueObjects.YearBuilt):void{
    this.validateVisa();
    this.props.yearBuilt = yearBuilt.valueOf();
  }
  requestSetLotSize(lotSize: ValueObjects.LotSize):void{
    this.validateVisa();
    this.props.lotSize = lotSize.valueOf();
  }
  requestSetDescription(description: ValueObjects.Description):void{
    this.validateVisa();
    this.props.description = description.valueOf();
  }
  requestSetAmenities(amenities: ValueObjects.Amenities):void{
    this.validateVisa();
    this.props.amenities = amenities.valueOf();
  }
  //requestSetAdditionalAmenities(additionalAmenities: AdditionalAmenity[]):void{
   /// this.props.additionalAmenities.items = additionalAmenities.map(additionalAmenity => additionalAmenity.props);
 // }
  requestSetImages(images: ValueObjects.Images):void{
    this.validateVisa();
    this.props.images = images.valueOf();
  }
  requestSetVideo(video: ValueObjects.Video):void{
    this.validateVisa();
    this.props.video = video.valueOf();
  }
  requestSetFloorPlan(floorPlan: ValueObjects.FloorPlan):void{
    this.validateVisa();
    this.props.floorPlan = floorPlan.valueOf();
  }
  requestSetFloorPlanImages(floorPlanImages: ValueObjects.FloorPlanImages):void{
    this.validateVisa();
    this.props.floorPlanImages = floorPlanImages.valueOf();
  }
  requestSetListingAgent(listingAgent: ValueObjects.ListingAgent):void{
    this.validateVisa();
    this.props.listingAgent = listingAgent.valueOf();
  }
  requestSetListingAgentPhone(listingAgentPhone: ValueObjects.ListingAgentPhone):void{
    this.validateVisa();
    this.props.listingAgentPhone = listingAgentPhone.valueOf();
  }
  requestSetListingAgentEmail(listingAgentEmail: ValueObjects.Email):void{
    this.validateVisa();
    this.props.listingAgentEmail = listingAgentEmail.valueOf();
  }
  requestSetListingAgentWebsite(listingAgentWebsite: ValueObjects.ListingAgentWebsite):void{
    this.validateVisa();
    this.props.listingAgentWebsite = listingAgentWebsite.valueOf();
  }
  requestSetListingAgentCompany(listingAgentCompany: ValueObjects.ListingAgentCompany):void{
    this.validateVisa();
    this.props.listingAgentCompany = listingAgentCompany.valueOf();
  }
  requestSetListingAgentCompanyPhone(listingAgentCompanyPhone: ValueObjects.ListingAgentCompanyPhone):void{
    this.validateVisa();
    this.props.listingAgentCompanyPhone = listingAgentCompanyPhone.valueOf();
  }
  requestSetListingAgentCompanyEmail(listingAgentCompanyEmail: ValueObjects.Email):void{
    this.validateVisa();
    this.props.listingAgentCompanyEmail = listingAgentCompanyEmail.valueOf();
  }
  requestSetListingAgentCompanyWebsite(listingAgentCompanyWebsite: ValueObjects.ListingAgentCompanyWebsite):void{
    this.validateVisa();
    this.props.listingAgentCompanyWebsite = listingAgentCompanyWebsite.valueOf();
  }
  requestSetListingAgentCompanyAddress(listingAgentCompanyAddress: ValueObjects.ListingAgentCompanyAddress):void{
    this.validateVisa();
    this.props.listingAgentCompanyAddress = listingAgentCompanyAddress.valueOf();
  }

}