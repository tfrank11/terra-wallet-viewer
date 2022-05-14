import Avatar from "@mui/material/Avatar/Avatar";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import { useWallet } from "@terra-money/wallet-provider";
import { StandardizedWalletProviderInfo } from "types";

interface Props {
  walletProviderInfo: StandardizedWalletProviderInfo[];
}

const Setup: React.FC<Props> = ({ walletProviderInfo }) => {
  const wallet = useWallet();

  return (
    <>
      <div className="absolute m-auto left-0 right-0 w-fit mt-10 text-2xl">
        Select Wallet Provider
      </div>
      <div className="mx-20 mt-24">
        <List>
          {walletProviderInfo.map((each) => {
            return (
              <ListItem disablePadding divider key={Math.random() * 9999}>
                <ListItemButton
                  onClick={() => {
                    if (each.url) {
                      const win = window.open(each.url, "_blank");
                      if (win) win.focus();
                    } else {
                      if (each.identifier) {
                        wallet.connect(each.type, each.identifier);
                      } else {
                        // if each.identifier is undefined, it means it's a mobile connection
                        wallet.connect(each.type);
                      }
                    }
                  }}
                >
                  <ListItemIcon>
                    <Avatar src={each.icon} />
                  </ListItemIcon>
                  <ListItemText primary={each.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    </>
  );
};

export default Setup;
