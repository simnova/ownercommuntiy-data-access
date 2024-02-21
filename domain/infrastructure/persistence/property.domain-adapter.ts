import { Property, ListingDetail, BedroomDetail, AdditionalAmenity, Location, BookingConfig, MaxNumberOfBookingsPolicy } from '../../../infrastructure/data-sources/cosmos-db/models/property';
import { CommunityEntityReference } from '../../contexts/community/community';
import { MemberEntityReference } from '../../contexts/community/member';
import { DomainExecutionContext } from '../../contexts/context';
import { LocationProps } from '../../contexts/property/location';
import { Property as PropertyDO, PropertyProps } from '../../contexts/property/property';
import { MongooseDomainAdapter, MongoosePropArray } from '../core/mongo/mongo-domain-adapter';
import { MongoTypeConverter } from '../core/mongo/mongo-type-converter';
import { CommunityDomainAdapter } from './community.domain-adapter';
import { MemberDomainAdapter } from './member.domain-adapter';
import { ListingDetailProps } from '../../contexts/property/listing-detail';
import { BedroomDetailProps } from '../../contexts/property/bedroom-detail';
import { AdditionalAmenityProps } from '../../contexts/property/additional-amenity';
import { AddressProps } from '../../contexts/property/address';
import { PositionProps } from '../../contexts/property/position';
import { BookingConfigProps } from '../../contexts/property/booking-config';
import { MaxNumberOfBookingsPolicyProps } from '../../contexts/property/max-number-of-bookings-policy';
import { BookingProps } from '../../contexts/property/booking';

export class PropertyConverter extends MongoTypeConverter<DomainExecutionContext, Property, PropertyDomainAdapter, PropertyDO<PropertyDomainAdapter>> {
  constructor() {
    super(PropertyDomainAdapter, PropertyDO);
  }
}

export class PropertyDomainAdapter extends MongooseDomainAdapter<Property> implements PropertyProps {
  get community() {
    if (this.doc.community) {
      return new CommunityDomainAdapter(this.doc.community);
    }
  }
  public setCommunityRef(community: CommunityEntityReference) {
    this.doc.set('community', community['props']['doc']);
  }

  // get location() {
  //   if(this.props.location) {return new LocationDomainAdapter(this.props.location);}
  // }

  // public setLocationRef(owner:LocationEntityReference) {
  //   this.props.set('location',owner.id);
  // }
  get location() {
    if (!this.doc.location) {
      this.doc.set('location', {});
    }
    return new LocationDomainAdapter(this.doc.location);
  }

  get owner() {
    if (this.doc.owner) {
      return new MemberDomainAdapter(this.doc.owner);
    }
  }
  public setOwnerRef(owner: MemberEntityReference | undefined) {
    this.doc.set('owner', owner ? owner.id : undefined);
  }

  get propertyName() {
    return this.doc.propertyName;
  }
  set propertyName(propertyName) {
    this.doc.propertyName = propertyName;
  }

  get propertyType() {
    return this.doc.propertyType;
  }
  set propertyType(propertyType) {
    this.doc.propertyType = propertyType;
  }

  get listedForSale() {
    return this.doc.listedForSale;
  }
  set listedForSale(listedForSale) {
    this.doc.listedForSale = listedForSale;
  }

  get listedForRent() {
    return this.doc.listedForRent;
  }
  set listedForRent(listedForRent) {
    this.doc.listedForRent = listedForRent;
  }

  get listedForLease() {
    return this.doc.listedForLease;
  }
  set listedForLease(listedForLease) {
    this.doc.listedForLease = listedForLease;
  }

  get listedInDirectory() {
    return this.doc.listedInDirectory;
  }
  set listedInDirectory(listedInDirectory) {
    this.doc.listedInDirectory = listedInDirectory;
  }

  get listingDetail() {
    if (!this.doc.listingDetail) {
      this.doc.set('listingDetail', {});
    }
    return new ListingDetailDomainAdapter(this.doc.listingDetail);
  }

  get tags() {
    return this.doc.tags;
  }
  set tags(tags) {
    this.doc.tags = tags;
  }

  get hash() {
    return this.doc.hash;
  }
  set hash(hash) {
    this.doc.hash = hash;
  }

  get lastIndexed() {
    return this.doc.lastIndexed;
  }
  set lastIndexed(lastIndexed) {
    this.doc.lastIndexed = lastIndexed;
  }

  get updateIndexFailedDate() {
    return this.doc.updateIndexFailedDate;
  }

  set updateIndexFailedDate(updateIndexFailedDate) {
    this.doc.updateIndexFailedDate = updateIndexFailedDate;
  }
}

export class ListingDetailDomainAdapter implements ListingDetailProps {
  constructor(public readonly props: ListingDetail) {}

  get price() {
    return this.props.price;
  }
  set price(price) {
    this.props.price = price;
  }

  get rentHigh() {
    return this.props.rentHigh;
  }
  set rentHigh(rentHigh) {
    this.props.rentHigh = rentHigh;
  }

  get rentLow() {
    return this.props.rentLow;
  }
  set rentLow(rentLow) {
    this.props.rentLow = rentLow;
  }

  get lease() {
    return this.props.lease;
  }
  set lease(lease) {
    this.props.lease = lease;
  }

  get maxGuests() {
    return this.props.maxGuests;
  }
  set maxGuests(maxGuests) {
    this.props.maxGuests = maxGuests;
  }

  get bedrooms() {
    return this.props.bedrooms;
  }
  set bedrooms(bedrooms) {
    this.props.bedrooms = bedrooms;
  }

  get bedroomDetails() {
    return new MongoosePropArray(this.props.bedroomDetails, BedroomDetailDomainAdapter);
  }

  get bathrooms() {
    return this.props.bathrooms;
  }
  set bathrooms(bathrooms) {
    this.props.bathrooms = bathrooms;
  }

  get squareFeet() {
    return this.props.squareFeet;
  }
  set squareFeet(squareFeet) {
    this.props.squareFeet = squareFeet;
  }

  get yearBuilt() {
    return this.props.yearBuilt;
  }
  set yearBuilt(yearBuilt) {
    this.props.yearBuilt = yearBuilt;
  }

  get lotSize() {
    return this.props.lotSize;
  }
  set lotSize(lotSize) {
    this.props.lotSize = lotSize;
  }

  get description() {
    return this.props.description;
  }
  set description(description) {
    this.props.description = description;
  }

  get amenities() {
    return this.props.amenities;
  }
  set amenities(amenities) {
    this.props.amenities = amenities;
  }

  get additionalAmenities() {
    return new MongoosePropArray(this.props.additionalAmenities, AdditionalAmenityDomainAdapter);
  }

  get images() {
    return this.props.images;
  }
  set images(images) {
    this.props.images = images;
  }

  get video() {
    return this.props.video;
  }
  set video(video) {
    this.props.video = video;
  }

  get floorPlan() {
    return this.props.floorPlan;
  }
  set floorPlan(floorPlan) {
    this.props.floorPlan = floorPlan;
  }

  get floorPlanImages() {
    return this.props.floorPlanImages;
  }
  set floorPlanImages(floorPlanImages) {
    this.props.floorPlanImages = floorPlanImages;
  }

  get listingAgent() {
    return this.props.listingAgent;
  }
  set listingAgent(listingAgent) {
    this.props.listingAgent = listingAgent;
  }

  get listingAgentPhone() {
    return this.props.listingAgentPhone;
  }
  set listingAgentPhone(listingAgentPhone) {
    this.props.listingAgentPhone = listingAgentPhone;
  }

  get listingAgentEmail() {
    return this.props.listingAgentEmail;
  }
  set listingAgentEmail(listingAgentEmail) {
    this.props.listingAgentEmail = listingAgentEmail;
  }

  get listingAgentWebsite() {
    return this.props.listingAgentWebsite;
  }
  set listingAgentWebsite(listingAgentWebsite) {
    this.props.listingAgentWebsite = listingAgentWebsite;
  }

  get listingAgentCompany() {
    return this.props.listingAgentCompany;
  }
  set listingAgentCompany(listingAgentCompany) {
    this.props.listingAgentCompany = listingAgentCompany;
  }

  get listingAgentCompanyPhone() {
    return this.props.listingAgentCompanyPhone;
  }
  set listingAgentCompanyPhone(listingAgentCompanyPhone) {
    this.props.listingAgentCompanyPhone = listingAgentCompanyPhone;
  }

  get listingAgentCompanyEmail() {
    return this.props.listingAgentCompanyEmail;
  }
  set listingAgentCompanyEmail(listingAgentCompanyEmail) {
    this.props.listingAgentCompanyEmail = listingAgentCompanyEmail;
  }

  get listingAgentCompanyWebsite() {
    return this.props.listingAgentCompanyWebsite;
  }
  set listingAgentCompanyWebsite(listingAgentCompanyWebsite) {
    this.props.listingAgentCompanyWebsite = listingAgentCompanyWebsite;
  }

  get listingAgentCompanyAddress() {
    return this.props.listingAgentCompanyAddress;
  }
  set listingAgentCompanyAddress(listingAgentCompanyAddress) {
    this.props.listingAgentCompanyAddress = listingAgentCompanyAddress;
  }

  get bookingConfig() {
    if (!this.props.bookingConfig) {
      this.props.set('bookingConfig', {});
    }
    return new BookingConfigDomainAdapter(this.props.bookingConfig);
  }

  get bookings() {
    return new MongoosePropArray(this.props.bookings, BookingDomainAdapter);
  }
}

export class BedroomDetailDomainAdapter implements BedroomDetailProps {
  constructor(public readonly props: BedroomDetail) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }

  get roomName() {
    return this.props.roomName;
  }
  set roomName(roomName) {
    this.props.roomName = roomName;
  }

  get bedDescriptions() {
    return this.props.bedDescriptions;
  }
  set bedDescriptions(bedDescriptions) {
    this.props.bedDescriptions = bedDescriptions;
  }
}

export class AdditionalAmenityDomainAdapter implements AdditionalAmenityProps {
  constructor(public readonly props: AdditionalAmenity) {}
  public get id(): string {
    return this.props.id.valueOf() as string;
  }

  get category() {
    return this.props.category;
  }
  set category(category) {
    this.props.category = category;
  }

  get amenities() {
    return this.props.amenities;
  }
  set amenities(amenities) {
    this.props.amenities = amenities;
  }
}

export class LocationDomainAdapter implements LocationProps {
  constructor(public readonly props: Location) {}

  get position() {
    if (!this.props?.position) {
      this.props.set('position', {});
      return null;
    }
    return new PositionDomainAdapter(this.props.position);
  }
  get address() {
    if (!this.props.address) {
      this.props.set('address', {});
      return null;
    }
    return new AddressDomainAdapter(this.props.address);
  }
}

export class AddressDomainAdapter implements AddressProps {
  constructor(public readonly props: Location['address']) {}

  get streetNumber(): string {
    return this.props.streetNumber;
  }
  set streetNumber(value: string) {
    this.props.streetNumber = value;
  }

  get streetName(): string {
    return this.props.streetName;
  }
  set streetName(value: string) {
    this.props.streetName = value;
  }

  get municipality(): string {
    return this.props.municipality;
  }
  set municipality(value: string) {
    this.props.municipality = value;
  }

  get municipalitySubdivision(): string {
    return this.props.municipalitySubdivision;
  }
  set municipalitySubdivision(value: string) {
    this.props.municipalitySubdivision = value;
  }

  get localName(): string {
    return this.props.localName;
  }
  set localName(value: string) {
    this.props.localName = value;
  }

  get countrySecondarySubdivision(): string {
    return this.props.countrySecondarySubdivision;
  }
  set countrySecondarySubdivision(value: string) {
    this.props.countrySecondarySubdivision = value;
  }

  get countryTertiarySubdivision(): string {
    return this.props.countryTertiarySubdivision;
  }
  set countryTertiarySubdivision(value: string) {
    this.props.countryTertiarySubdivision = value;
  }

  get countrySubdivision(): string {
    return this.props.countrySubdivision;
  }
  set countrySubdivision(value: string) {
    this.props.countrySubdivision = value;
  }

  get countrySubdivisionName(): string {
    return this.props.countrySubdivisionName;
  }
  set countrySubdivisionName(value: string) {
    this.props.countrySubdivisionName = value;
  }

  get postalCode(): string {
    return this.props.postalCode;
  }
  set postalCode(value: string) {
    this.props.postalCode = value;
  }

  get extendedPostalCode(): string {
    return this.props.extendedPostalCode;
  }
  set extendedPostalCode(value: string) {
    this.props.extendedPostalCode = value;
  }

  get countryCode(): string {
    return this.props.countryCode;
  }
  set countryCode(value: string) {
    this.props.countryCode = value;
  }

  get country(): string {
    return this.props.country;
  }
  set country(value: string) {
    this.props.country = value;
  }

  get countryCodeISO3(): string {
    return this.props.countryCodeISO3;
  }
  set countryCodeISO3(value: string) {
    this.props.countryCodeISO3 = value;
  }

  get freeformAddress(): string {
    return this.props.freeformAddress;
  }
  set freeformAddress(value: string) {
    this.props.freeformAddress = value;
  }

  get streetNameAndNumber(): string {
    return this.props.streetNameAndNumber;
  }
  set streetNameAndNumber(value: string) {
    this.props.streetNameAndNumber = value;
  }

  get routeNumbers(): string {
    return this.props.routeNumbers;
  }
  set routeNumbers(value: string) {
    this.props.routeNumbers = value;
  }

  get crossStreet(): string {
    return this.props.crossStreet;
  }
  set crossStreet(value: string) {
    this.props.crossStreet = value;
  }
}

export class PositionDomainAdapter implements PositionProps {
  constructor(public readonly props: Location['position']) {}

  get type(): string {
    return this.props.type;
  }
  set type(value: string) {
    this.props.type = value;
  }

  get coordinates(): number[] {
    return this.props.coordinates;
  }
  set coordinates(value: number[]) {
    this.props.coordinates = value;
  }
}

export class BookingConfigDomainAdapter implements BookingConfigProps {
  constructor(public readonly props: BookingConfig) {}

  get price() {
    return this.props.price;
  }
  set price(price) {
    this.props.price = price;
  }

  get maxGuests() {
    return this.props.maxGuests;
  }
  set maxGuests(maxGuests) {
    this.props.maxGuests = maxGuests;
  }

  get lastDateTimeToAllowCancel() {
    return this.props.lastDateTimeToAllowCancel;
  }
  set lastDateTimeToAllowCancel(lastDateTimeToAllowCancel) {
    this.props.lastDateTimeToAllowCancel = lastDateTimeToAllowCancel;
  }

  get minStay() {
    return this.props.minStay;
  }
  set minStay(minStay) {
    this.props.minStay = minStay;
  }

  get maxStay() {
    return this.props.maxStay;
  }
  set maxStay(maxStay) {
    this.props.maxStay = maxStay;
  }

  get petAllowed() {
    return this.props.petAllowed;
  }
  set petAllowed(petAllowed) {
    this.props.petAllowed = petAllowed;
  }

  get maxNumberOfBookingsPolicy() {
    if (!this.props.maxNumberOfBookingsPolicy) {
      this.props.set('maxNumberOfBookingsPolicy', {});
    }

    return new MaxNumberOfBookingsPolicyDomainAdapter(this.props.maxNumberOfBookingsPolicy);
  }
}

export class MaxNumberOfBookingsPolicyDomainAdapter implements MaxNumberOfBookingsPolicyProps {
  constructor(public readonly props: MaxNumberOfBookingsPolicy) {}

  get numberOfBookings() {
    return this.props.numberOfBookings;
  }
  set numberOfBookings(numberOfBookings) {
    this.props.numberOfBookings = numberOfBookings;
  }

  get periodType() {
    return this.props.periodType;
  }
  set periodType(periodType) {
    this.props.periodType = periodType;
  }

  get numberOfPeriods() {
    return this.props.numberOfPeriods;
  }
  set numberOfPeriods(numberOfPeriods) {
    this.props.numberOfPeriods = numberOfPeriods;
  }
}

export class BookingDomainAdapter implements BookingProps{
  constructor(public readonly props: Property['listingDetail']['bookings'][0]) {}

  public get id(): string {
    return this.props.id.valueOf() as string;
  }

  get checkIn() {
    return this.props.checkIn;
  }
  set checkIn(checkIn) {
    this.props.checkIn = checkIn;
  }

  get checkOut() {
    return this.props.checkOut;
  }
  set checkOut(checkOut) {
    this.props.checkOut = checkOut;
  }

  get numberOfGuests() {
    return this.props.numberOfGuests;
  }
  set numberOfGuests(numberOfGuests) {
    this.props.numberOfGuests = numberOfGuests;
  }

  get totalCost() {
    return this.props.totalCost;
  }
  set totalCost(totalCost) {
    this.props.totalCost = totalCost;
  }

  get createdAt() {
    return this.props.createdAt;
  }
  set createdAt(createdAt) {
    this.props.createdAt = createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
  set updatedAt(updatedAt) {
    this.props.updatedAt = updatedAt;
  }

  get firstName() {
    return this.props.firstName;
  }
  set firstName(firstName) {
    this.props.firstName = firstName;
  }

  get lastName() {
    return this.props.lastName;
  }
  set lastName(lastName) {
    this.props.lastName = lastName;
  }

  get email() {
    return this.props.email;
  }
  set email(email) {
    this.props.email = email;
  }

  get phoneNumber() {
    return this.props.phoneNumber;
  }
  set phoneNumber(phoneNumber) {
    this.props.phoneNumber = phoneNumber;
  }

  get isPaid() {
    return this.props.isPaid;
  }
  set isPaid(isPaid) {
    this.props.isPaid = isPaid;
  }

  get paidAt() {
    return this.props.paidAt;
  }
  set paidAt(paidAt) {
    this.props.paidAt = paidAt;
  }

  get isRefunded() {
    return this.props.isRefunded;
  }
  set isRefunded(isRefunded) {
    this.props.isRefunded = isRefunded;
  }

  get refundedAt() {
    return this.props.refundedAt;
  }
  set refundedAt(refundedAt) {
    this.props.refundedAt = refundedAt;
  }

  get isCancelled() {
    return this.props.isCancelled;
  }
  set isCancelled(isCancelled) {
    this.props.isCancelled = isCancelled;
  }

  get cancelledAt() {
    return this.props.cancelledAt;
  }
  set cancelledAt(cancelledAt) {
    this.props.cancelledAt = cancelledAt;
  }



}