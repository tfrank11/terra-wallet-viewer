import React, { useEffect, useState } from "react";
import { useWallet } from "@terra-money/wallet-provider";
import Spinner from "pages/setup/Spinner";
import WalletViewer from "pages/walletViewer/WalletViewer";
import Setup from "../setup/Setup";
import { StandardizedWalletProviderInfo } from "types";
import Button from "@mui/material/Button/Button";

const Main = () => {
  const wallet = useWallet();

  let standardizedWalletProviderInfo: StandardizedWalletProviderInfo[] = [
    ...wallet.availableInstallations.map((each) => {
      return {
        identifier: each.identifier,
        icon: each.icon,
        name: each.name,
        url: each.url,
        type: each.type,
      };
    }),
    ...wallet.availableConnections.map((each) => {
      return {
        identifier: each.identifier,
        icon: each.icon,
        name: each.name,
        type: each.type,
      };
    }),
  ];

  standardizedWalletProviderInfo = standardizedWalletProviderInfo.filter(
    (each) => {
      return each.name !== "View an address";
    }
  );
  // const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const disconnectButton = wallet.wallets.length > 0 && (
    <div className="absolute right-0 bottom-0 mb-5 mr-5">
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={() => {
          (async () => {
            await new Promise((res) => setTimeout(res, 250));
            wallet.disconnect();
          })();
        }}
      >
        Disconnect
      </Button>
    </div>
  );

  const walletConnected = wallet.wallets.length > 0;

  return (
    <div className="h-screen w-screen">
      <div className="w-96 md:w-1/2 lg:w-2/5 h-2/3 sm: bg-gray-200 rounded-lg shadow-2xl absolute m-auto top-0 bottom-0 left-0 right-0">
        {walletConnected ? (
          <WalletViewer />
        ) : (
          <Setup walletProviderInfo={standardizedWalletProviderInfo} />
        )}

        {disconnectButton}
      </div>
    </div>
  );
};

export default Main;
