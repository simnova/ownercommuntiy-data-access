import { DomainExecutionContext } from "../context";
import { ServiceTicketVisa } from "../iam/service-ticket-visa";
import { RequestProps, Request } from "./request";

export interface ApplianceMaintenanceProps extends RequestProps {
  applianceType: string;
  applianceBrand: string;
}

export interface ApplianceMaintenanceEntityReference extends Readonly<ApplianceMaintenanceProps> {}

export class ApplianceMaintenance extends Request implements ApplianceMaintenanceProps {
  constructor(readonly props: ApplianceMaintenanceProps, context: DomainExecutionContext, readonly visa: ServiceTicketVisa) {
    super(props, context, visa);
  }

  get applianceType() {
    return this.props.applianceType;
  }

  requestSetApplianceType(applianceType: string) {
    this.props.applianceType = applianceType;
  }

  get applianceBrand() {
    return this.props.applianceBrand;
  }

  requestSetApplianceBrand(applianceBrand: string) {
    this.props.applianceBrand = applianceBrand;
  }
}