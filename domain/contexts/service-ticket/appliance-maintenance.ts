import { RequestProps } from "./request";

export interface ApplianceMaintenanceProps extends RequestProps {
  applianceType: string;
  applianceBrand: string;
}