import { ConnectType } from "@terra-money/wallet-provider";

export interface StandardizedWalletProviderInfo {
  identifier: string | undefined;
  icon: string;
  name: string;
  url?: string;
  type?: ConnectType;
}
