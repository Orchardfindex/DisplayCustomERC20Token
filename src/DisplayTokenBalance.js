import { React, useState } from "react";
import tokenAbi from "./artifacts/NUSMoneyToken.json";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useWeb3React } from "@web3-react/core";

export const TokenAddress = "0x7186721d6C40ddefa4C8E151964b02a4D24E3131";

const DisplayTokenBalance = () => {
  //connector, library, chainId, account, activate, deactivate
  const web3reactContext = useWeb3React();
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [balance, setBalance] = useState(0);

  try {
    if (web3reactContext.chainId === 3) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        TokenAddress,
        tokenAbi.abi,
        provider
      );

      contract.symbol().then((val) => setTokenSymbol(val));
      contract
        .balanceOf(web3reactContext.account)
        .then((val) => setBalance(formatEther(val)));
      console.log("Wallet Balance:", balance);
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      {web3reactContext.active && balance > 0 ? (
        <h3>
          Balance: {balance} {tokenSymbol}
        </h3>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DisplayTokenBalance;
