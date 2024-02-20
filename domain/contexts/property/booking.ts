import { Entity, EntityProps } from '../../shared/entity';
import { PropertyVisa } from '../iam/property-visa';
export interface BookingProps extends EntityProps {
  // Fields
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalCost: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string
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
  get guests() {
    return this.props.guests;
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
  get status() {
    return this.props.status;
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
  set Guests(guests: number) {
    this.validateVisa();
    this.props.guests = guests;
  }
  set TotalCost(totalCost: number) {
    this.validateVisa();
    this.props.totalCost = totalCost;
  }
  set Status(status: string) {
    this.validateVisa();
    this.props.status = status;
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
 
}
