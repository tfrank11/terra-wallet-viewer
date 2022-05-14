import React, { useEffect, useState } from "react";
import { useConnectedWallet, useLCDClient } from "@terra-money/wallet-provider";
import Spinner from "pages/setup/Spinner";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const WalletViewer = () => {
  const lcd = useLCDClient();
  const connectedWallet = useConnectedWallet();
  const [lunaBalance, setLunaBalance] = useState(0);
  const [currentLunaPrice, setCurrentLunaPrice] = useState(0);
  const [usdEquivalent, setUsdEquivalent] = useState(0);
  const [loading, setLoading] = useState(true);

  const getLunaPrice = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/terra-luna"
      );
      const data = await res.json();
      return data.market_data.current_price.usd;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (connectedWallet) {
      lcd.bank.balance(connectedWallet.walletAddress).then(([coins]) => {
        const microLuna = Number(
          coins.get("uluna")?.toString().replace("uluna", "")
        );
        const currentLunaBalance = microLuna / 1000000;
        setLunaBalance(currentLunaBalance);
        (async () => {
          const lunaPrice = await getLunaPrice();
          setCurrentLunaPrice(lunaPrice);
          setUsdEquivalent(lunaPrice * currentLunaBalance);
          setLoading(false);
        })();
      });
    }
  }, [connectedWallet, lcd]);

  return (
    <div className="h-fill w-fill">
      {loading ? (
        <Spinner />
      ) : (
        <div className="absolute m-auto top-0 bottom-0 left-0 right-0 h-fit w-fit">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="terra-luna"
              height="140"
              // image={process.env.PUBLIC_URL + "/luna-bg-pic.jpeg"}
              src={
                "https://analyticsinsight.b-cdn.net/wp-content/uploads/2022/05/The-Best-Places-To-Buy-Terra-LUNA.jpg"
              }
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Your luna is worth ${usdEquivalent.toFixed(2)}!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You have {lunaBalance.toFixed(2)} luna. The current price is $
                {currentLunaPrice} USD.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => {
                  window.open("https://twitter.com/terra_money", "_blank");
                }}
              >
                Learn More
              </Button>
              <Button
                size="small"
                onClick={() => {
                  var url = "http://google.com";
                  var text = `Wow! My ${lunaBalance.toFixed(
                    2
                  )} luna is only worth ${usdEquivalent.toFixed(2)} USD!`;
                  window.open(
                    "http://twitter.com/share?url=" +
                      // encodeURIComponent(url) +
                      // "&text=" +
                      encodeURIComponent(text),
                    "",
                    "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
                  );
                }}
              >
                Share
              </Button>
            </CardActions>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WalletViewer;
