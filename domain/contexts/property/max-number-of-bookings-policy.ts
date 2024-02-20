import { ValueObject, ValueObjectProps } from '../../shared/value-object';
import { PropertyVisa } from '../iam/property-visa';

export interface MaxNumberOfBookingsPolicyProps extends ValueObjectProps {
  numberOfBookings: number;
  periodType: string;
  numberOfPeriods: number;
}
export interface MaxNumberOfBookingsPolicyEntityReference extends Readonly<Omit<MaxNumberOfBookingsPolicyProps, ''>> {}
export class MaxNumberOfBookingsPolicy extends ValueObject<MaxNumberOfBookingsPolicyProps> implements MaxNumberOfBookingsPolicyEntityReference {
  constructor(props: MaxNumberOfBookingsPolicyProps, private readonly visa: PropertyVisa) {
    super(props);
  }

  get numberOfBookings() {
    return this.props.numberOfBookings;
  }
  get periodType() {
    return this.props.periodType;
  }
  get numberOfPeriods() {
    return this.props.numberOfPeriods;
  }
}

