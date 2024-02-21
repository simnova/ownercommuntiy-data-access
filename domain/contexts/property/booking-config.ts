import { PropArray } from '../../shared/prop-array';
import { ValueObject, ValueObjectProps } from '../../shared/value-object';
import { PropertyVisa } from '../iam/property-visa';
import { BookingAvailability, BookingAvailabilityEntityReference, BookingAvailabilityProps } from './booking-availability';
import { MaxNumberOfBookingsPolicy, MaxNumberOfBookingsPolicyEntityReference, MaxNumberOfBookingsPolicyProps } from './max-number-of-bookings-policy';

export interface BookingConfigProps extends ValueObjectProps {
  readonly availabilities:BookingAvailabilityProps[];
  price: number;
  maxGuests: number;
  lastDateTimeToAllowCancel: Date;
  minStay: number;
  maxStay: number;
  petAllowed: boolean;
  readonly maxNumberOfBookingsPolicy: MaxNumberOfBookingsPolicyProps;
}

export interface BookingConfigEntityReference extends Readonly<Omit<BookingConfigProps, 'maxNumberOfBookingsPolicy' | 'availabilities'>> {
  readonly maxNumberOfBookingsPolicy: MaxNumberOfBookingsPolicyEntityReference;
  readonly availabilities: ReadonlyArray<BookingAvailabilityEntityReference>;
}

export class BookingConfig extends ValueObject<BookingConfigProps> implements BookingConfigEntityReference {
  constructor(props: BookingConfigProps, private readonly visa: PropertyVisa) {
    super(props);
  }

  get availabilities(): ReadonlyArray<BookingAvailabilityEntityReference> {
    return this.props.availabilities.map((availability) => new BookingAvailability(availability, this.visa));
  }

  get price() {
    return this.props.price;
  }
  get maxGuests() {
    return this.props.maxGuests;
  }
  get lastDateTimeToAllowCancel() {
    return this.props.lastDateTimeToAllowCancel;
  }
  get minStay() {
    return this.props.minStay;
  }
  get maxStay() {
    return this.props.maxStay;
  }
  get petAllowed() {
    return this.props.petAllowed;
  }

  get maxNumberOfBookingsPolicy() {
    return new MaxNumberOfBookingsPolicy(this.props.maxNumberOfBookingsPolicy, this.visa);
  }

  private validateVisa() {
    // TODO: Implement Visa Validation
  }

  set Price(price: number) {
    this.validateVisa();
    this.props.price = price;
  }

  set MaxGuests(maxGuests: number) {
    this.validateVisa();
    this.props.maxGuests = maxGuests;
  }

  set LastDateTimeToAllowCancel(lastDateTimeToAllowCancel: Date) {
    this.validateVisa();
    this.props.lastDateTimeToAllowCancel = lastDateTimeToAllowCancel;
  }

  set MinStay(minStay: number) {
    this.validateVisa();
    this.props.minStay = minStay;
  }

  set MaxStay(maxStay: number) {
    this.validateVisa();
    this.props.maxStay = maxStay;
  }

  set PetAllowed(petAllowed: boolean) {
    this.validateVisa();
    this.props.petAllowed = petAllowed;
  }

}
