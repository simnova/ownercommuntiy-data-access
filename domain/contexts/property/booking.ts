import { Entity, EntityProps } from '../../shared/entity';
import { PropertyVisa } from '../iam/property-visa';
export interface BookingProps extends EntityProps {
  // Fields
  checkIn: Date;
  checkOut: Date;
  numberOfGuests: number;
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string
  isPaid: boolean;
  paidAt: Date;
  isRefunded: boolean;
  refundedAt: Date;
  isCancelled: boolean;
  cancelledAt: Date;
}
export interface BookingReference extends Readonly<Omit<BookingProps, ''>> {}
export class Booking extends Entity<BookingProps> implements BookingReference {
  constructor(props: BookingProps, private readonly visa: PropertyVisa) {
    super(props);
  }
  // Getters
  get checkIn() {
    return this.props.checkIn;
  }
  get checkOut() {
    return this.props.checkOut;
  }
  get numberOfGuests() {
    return this.props.numberOfGuests;
  }
  get totalCost() {
    return this.props.totalCost;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  get firstName() {
    return this.props.firstName;
  }
  get lastName() {
    return this.props.lastName;
  }
  get email() {
    return this.props.email;
  }
  get phoneNumber() {
    return this.props.phoneNumber;
  }
  get isPaid() {
    return this.props.isPaid;
  }
  get paidAt() {
    return this.props.paidAt;
  }
  get isRefunded() {
    return this.props.isRefunded;
  }
  get refundedAt() {
    return this.props.refundedAt;
  }
  get isCancelled() {
    return this.props.isCancelled;
  }
  get cancelledAt() {
    return this.props.cancelledAt;
  }

  private validateVisa() {
    // TODO: Implement Visa Validation
  }
  // Setters
  set CheckIn(checkIn: Date) {
    this.validateVisa();
    this.props.checkIn = checkIn;
  }
  set CheckOut(checkOut: Date) {
    this.validateVisa();
    this.props.checkOut = checkOut;
  }
  set NumberOfGuests(numberOfGuests: number) {
    this.validateVisa();
    this.props.numberOfGuests = numberOfGuests;
  }
  set TotalCost(totalCost: number) {
    this.validateVisa();
    this.props.totalCost = totalCost;
  }

  set FirstName(firstName: string) {
    this.validateVisa();
    this.props.firstName = firstName;
  }
  set LastName(lastName: string) {
    this.validateVisa();
    this.props.lastName = lastName;
  }
  set Email(email: string) {
    this.validateVisa();
    this.props.email = email;
  }
  set PhoneNumber(phoneNumber: string) {
    this.validateVisa();
    this.props.phoneNumber = phoneNumber;
  }
  set IsPaid(isPaid: boolean) {
    this.validateVisa();
    this.props.isPaid = isPaid;
  }
  set PaidAt(paidAt: Date) {
    this.validateVisa();
    this.props.paidAt = paidAt;
  }
  set IsRefunded(isRefunded: boolean) {
    this.validateVisa();
    this.props.isRefunded = isRefunded;
  }
  set RefundedAt(refundedAt: Date) {
    this.validateVisa();
    this.props.refundedAt = refundedAt;
  }
  set IsCancelled(isCancelled: boolean) {
    this.validateVisa();
    this.props.isCancelled = isCancelled;
  }
  set CancelledAt(cancelledAt: Date) {
    this.validateVisa();
    this.props.cancelledAt = cancelledAt;
  }

 
}
