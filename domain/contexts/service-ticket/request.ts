import { EntityProps } from "../../shared/entity";

export interface RequestProps extends EntityProps {
  requestInfo: string;
  kind: readonly<string>;
}