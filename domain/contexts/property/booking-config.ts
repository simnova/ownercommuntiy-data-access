import { PropArray } from '../../shared/prop-array';
import { ValueObject, ValueObjectProps } from '../../shared/value-object';
import { PropertyVisa } from '../iam/property-visa';
import { MaxNumberOfBookingsPolicy, MaxNumberOfBookingsPolicyEntityReference, MaxNumberOfBookingsPolicyProps } from './max-number-of-bookings-policy';

export interface BookingConfigProps extends ValueObjectProps {
  // readonly availabilities: PropArray<BookingAvailabilityProps>;
  price: number;
  maxGuests: number;
  pricePerNight: number;
  minStay: number;
  maxStay: number;
  petAllowed: boolean;
  readonly maxNumberOfBookingsPolicy: MaxNumberOfBookingsPolicyProps;
}

export interface BookingConfigEntityReference extends Readonly<Omit<BookingConfigProps, 'maxNumberOfBookingsPolicy'
//  | 'availabilities'
 >> {
  readonly maxNumberOfBookingsPolicy: MaxNumberOfBookingsPolicyEntityReference;
  // readonly availabilities: ReadonlyArray<BookingAvailabilityReference>;
}

export class BookingConfig extends ValueObject<BookingConfigProps> implements BookingConfigEntityReference {
  constructor(props: BookingConfigProps, private readonly visa: PropertyVisa) {
    super(props);
  }

  get price() {
    return this.props.price;
  }
  get maxGuests() {
    return this.props.maxGuests;
  }
  get pricePerNight() {
    return this.props.pricePerNight;
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

  // availabilities
  // get availabilities(): ReadonlyArray<BookingAvailability> {
  //   return this.props.availabilities.items.map((customView) => new BookingAvailability(customView, this.context, this.visa));
  // }

  


}
