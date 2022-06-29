import { DomainExecutionContext } from "../context";
import { ServiceTicketVisa } from "../iam/service-ticket-visa";
import { RequestProps, Request } from "./request";

export interface HVACMaintenanceProps extends RequestProps {
  hvacBrand: string;
}

export interface HVACMaintenanceEntityReference extends Readonly<HVACMaintenanceProps> {}

export class HVACMaintenance extends Request implements HVACMaintenanceProps {
  constructor(readonly props: HVACMaintenanceProps, context: DomainExecutionContext, readonly visa: ServiceTicketVisa) {
    super(props, context, visa);
  }

  get hvacBrand() {
    return this.props.hvacBrand;
  }

  requestSetHVACBrand(hvacBrand: string) {
    this.props.hvacBrand = hvacBrand;
  }
}
