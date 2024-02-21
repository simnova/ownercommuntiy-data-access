import { ValueObject, ValueObjectProps } from '../../shared/value-object';
import { PropertyVisa } from '../iam/property-visa';
export interface BookingAvailabilityProps extends ValueObjectProps {
  // Fields
  startDateTime: Date;
  endDateTime: Date;
}
export interface BookingAvailabilityEntityReference extends Readonly<Omit<BookingAvailabilityProps, ''>> {
}
export class BookingAvailability extends ValueObject<BookingAvailabilityProps> implements BookingAvailabilityEntityReference {
  constructor(props: BookingAvailabilityProps, private readonly visa: PropertyVisa) {
    super(props);
  }
  // Getters
  get startDateTime() {
    return this.props.startDateTime;
  }
  get endDateTime() {
    return this.props.endDateTime;
  }
}