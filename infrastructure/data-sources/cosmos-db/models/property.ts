import { Schema, model, Model, ObjectId, PopulatedDoc, Types } from 'mongoose';
import { Base, SubdocumentBase, Patterns, NestedPath } from './interfaces/base';
import * as Community from './community';
import * as Member from './member';

/**
 * @description
 * Point model - used to store lat/long coordinates
 */
export interface Point {
  type: string;
  /**
   * @description
   * Latitude must be the first coordinate
   */
  coordinates: number[];
}

export interface ListingDetail extends NestedPath {
  id: ObjectId;
  price: number;
  rentHigh: number;
  rentLow: number;
  lease: number;
  maxGuests: number;
  bedrooms: number;
  bedroomDetails: Types.DocumentArray<BedroomDetail>;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  lotSize: number;
  description: string;
  amenities: string[];
  additionalAmenities: Types.DocumentArray<AdditionalAmenity>;
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

  bookingConfig: BookingConfig;
  bookings: Types.DocumentArray<Booking>;
}

export interface BookingConfig extends NestedPath {
  id: ObjectId;
  // availabilities: BookingAvailability[];
  price: number;
  maxGuests: number;
  pricePerNight: number;
  minStay: number;
  maxStay: number;
  petAllowed: boolean;
  maxNumberOfBookingsPolicy: MaxNumberOfBookingsPolicy;
}

// export interface BookingAvailability extends NestedPath {
//   id: ObjectId;
//   startDateTime: Date;
//   endDateTime: Date;
// }

export interface MaxNumberOfBookingsPolicy extends NestedPath {
  id: ObjectId;
  numberOfBookings: number;
  periodType: string;
  numberOfPeriods: number;
}

export interface Booking extends SubdocumentBase {
  id: ObjectId;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  firstName: string;
  lastName: string;
  email: string
  phoneNumber: string
}

const BookingSchema = new Schema<Booking, Model<Booking>, Booking>(
  {
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    status: { type: String, required: true, enum: ['CONFIRMED', 'CANCELLED'] },
    firstName: { type: String, required: true, maxlength: 100 },
    lastName: { type: String, required: true, maxlength: 100 },
    email: { type: String, match: Patterns.EMAIL_PATTERN, required: true, maxlength: 254 },
    phoneNumber: { type: String, required: true, maxlength: 100 },
  },
  {
    timestamps: true,
    versionKey: 'version',
  }
);

export interface BedroomDetail extends SubdocumentBase {
  id: ObjectId;
  roomName: string;
  bedDescriptions: string[];
}
const BedroomDetailSchema = new Schema<BedroomDetail, Model<BedroomDetail>, BedroomDetail>(
  {
    roomName: { type: String, required: false, maxlength: 100 },
    bedDescriptions: { type: [{ type: String, maxlength: 40 }], required: false },
  },
  {
    timestamps: true,
    versionKey: 'version',
  }
);

export interface AdditionalAmenity extends SubdocumentBase {
  id: ObjectId;
  category: string;
  amenities: string[];
}
const AdditionalAmenitySchema = new Schema<AdditionalAmenity, Model<AdditionalAmenity>, AdditionalAmenity>(
  {
    category: { type: String, required: false, maxlength: 100 },
    amenities: { type: [{ type: String, maxlength: 40 }], required: false },
  },
  {
    timestamps: true,
    versionKey: 'version',
  }
);

export interface Location extends NestedPath {
  position: Point;
  address: {
    id: ObjectId;
    streetNumber: string;
    streetName: string;
    municipality: string;
    municipalitySubdivision: string;
    localName: string;
    countrySecondarySubdivision: string;
    countryTertiarySubdivision: string;
    countrySubdivision: string;
    countrySubdivisionName: string;
    postalCode: string;
    extendedPostalCode: string;
    countryCode: string;
    country: string;
    countryCodeISO3: string;
    freeformAddress: string;

    streetNameAndNumber: string;
    routeNumbers: string;
    crossStreet: string;
  };
}

export interface Property extends Base {
  community: PopulatedDoc<Community.Community>;
  // location?: PopulatedDoc<Location.Location>;
  location: Location;
  owner?: PopulatedDoc<Member.Member>;
  propertyName: string;
  propertyType: string;

  listedForSale: boolean;
  listedForRent: boolean;
  listedForLease: boolean;
  listedInDirectory: boolean;

  listingDetail: ListingDetail;

  tags: string[];
  hash: string;
  lastIndexed: Date;
  updateIndexFailedDate: Date;
}
const schema = new Schema<Property, Model<Property>, Property>(
  {
    schemaVersion: {
      type: String,
      default: '1.0.0',
      required: false,
    },
    community: { type: Schema.Types.ObjectId, ref: Community.CommunityModel.modelName, required: true, index: true, unique: false },
    // location: Location.LocationModel.schema,
    location: {
      // position: Point.PointModel.schema,
      position: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point',
          required: true,
        },
        coordinates: { type: [Number], required: false },
      },
      address: {
        streetNumber: { type: String, required: false },
        streetName: { type: String, required: false },
        municipality: { type: String, required: false },
        municipalitySubdivision: { type: String, required: false },
        localName: { type: String, required: false },
        countrySecondarySubdivision: { type: String, required: false },
        countryTertiarySubdivision: { type: String, required: false },
        countrySubdivision: { type: String, required: false },
        countrySubdivisionName: { type: String, required: false },
        postalCode: { type: String, required: false },
        extendedPostalCode: { type: String, required: false },
        countryCode: { type: String, required: false },
        country: { type: String, required: false },
        countryCodeISO3: { type: String, required: false },
        freeformAddress: { type: String, required: false },
        streetNameAndNumber: { type: String, required: false },
        routeNumbers: { type: String, required: false },
        crossStreet: { type: String, required: false },
      },
    },
    owner: { type: Schema.Types.ObjectId, ref: Member.MemberModel.modelName, required: false, index: true, unique: false },
    propertyName: { type: String, required: true, maxlength: 100, index: true },
    propertyType: { type: String, required: false, maxlength: 100 },

    listedForSale: { type: Boolean, required: false, default: false },
    listedForRent: { type: Boolean, required: false, default: false },
    listedForLease: { type: Boolean, required: false, default: false },
    listedInDirectory: { type: Boolean, required: false, default: false },

    listingDetail: {
      price: { type: Number, required: false },
      rentHigh: { type: Number, required: false },
      rentLow: { type: Number, required: false },
      lease: { type: Number, required: false },
      maxGuests: { type: Number, required: false },
      bedrooms: { type: Number, required: false },
      bedroomDetails: [BedroomDetailSchema],
      bathrooms: { type: Number, required: false },
      squareFeet: { type: Number, required: false },
      yearBuilt: { type: Number, required: false },
      lotSize: { type: Number, required: false },
      description: { type: String, required: false, maxlength: 5000 },
      amenities: { type: [{ type: String, maxlength: 100 }], required: false },
      additionalAmenities: [AdditionalAmenitySchema],
      images: { type: [String], required: false },
      video: { type: String, required: false },
      floorPlan: { type: String, required: false, maxlength: 2000 },
      floorPlanImages: { type: [String], required: false },
      listingAgent: { type: String, required: false, maxlength: 500 },
      listingAgentPhone: { type: String, required: false, maxlength: 100 },
      listingAgentEmail: { type: String, match: Patterns.EMAIL_PATTERN, required: false, maxlength: 254 },
      listingAgentWebsite: { type: String, required: false, maxlength: 1000 },
      listingAgentCompany: { type: String, required: false, maxlength: 500 },
      listingAgentCompanyPhone: { type: String, required: false, maxlength: 100 },
      listingAgentCompanyEmail: { type: String, match: Patterns.EMAIL_PATTERN, required: false, maxlength: 254 },
      listingAgentCompanyWebsite: { type: String, required: false, maxlength: 1000 },
      listingAgentCompanyAddress: { type: String, required: false, maxlength: 1000 },

      bookingConfig: {
        // availabilities: [
        //   {
        //     startDateTime: { type: Date, required: false },
        //     endDateTime: { type: Date, required: false },
        //   },
        // ],
        price: { type: Number, required: false },
        maxGuests: { type: Number, required: false },
        pricePerNight: { type: Number, required: false },
        minStay: { type: Number, required: false },
        maxStay: { type: Number, required: false },
        petAllowed: { type: Boolean, required: false },
        maxNumberOfBookingsPolicy: {
          numberOfBookings: { type: Number, required: false },
          periodType: { type: String, enum: ['WEEK', 'MONTH'], require: false, default: 'MONTH' },
          numberOfPeriods: { type: Number, required: false },
        },
      },

      bookings: [BookingSchema],
    },
    tags: { type: [{ type: String, maxlength: 100 }], required: false },
    hash: { type: String, required: false, maxlength: 100 },
    lastIndexed: { type: Date, required: false },
    updateIndexFailedDate: { type: Date, required: false },
  },
  {
    timestamps: true,
    versionKey: 'version',
    shardKey: { community: 1 },
  }
).index({ community: 1, propertyName: 1 }, { unique: true });
/*
schema.path('listingDetails.additionalAmenities').validate(function(additionalAmenities) {
  return additionalAmenities.length > 20;
}, 'Additional Amenities cannot be more than 20');
schema.path('listingDetails.additionalAmenities.amenities').validate(function(amenities) {
  return amenities.length > 20;
}, 'Additional Amenities - Amenities cannot be more than 20');
schema.path('listingDetails.bedroomDetails').validate(function(bedroomDetails) {
  return bedroomDetails.length > 20;
}, 'Bedroom Details cannot be more than 20');
*/

export const PropertyModel = model<Property>('Property', schema);
