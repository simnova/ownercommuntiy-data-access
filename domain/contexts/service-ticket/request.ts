import { Entity, EntityProps } from "../../shared/entity";
import { DomainExecutionContext } from "../context";
import { ServiceTicketVisa } from "../iam/service-ticket-visa";

export interface RequestProps extends EntityProps {
  requestInfo: string;
  readonly kind: string;
}

export interface RequestEntityReference extends Readonly<RequestProps> {}

export class Request extends Entity<RequestProps> implements RequestEntityReference {
  constructor(props: RequestProps, context: DomainExecutionContext, protected readonly visa: ServiceTicketVisa) {
    super(props);
  }

  get requestInfo() {
    return this.props.requestInfo;
  }
  get kind() {
    return this.props.kind;
  }

  requestSetRequestInfo(requestInfo: string) {
    this.props.requestInfo = requestInfo;
  }
}