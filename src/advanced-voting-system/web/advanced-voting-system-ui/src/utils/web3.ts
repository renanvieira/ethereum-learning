
import { ethers } from 'ethers';
import { createContext } from 'react';
import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  network: "http://localhost:8545",
  disableInjectedProvider: true,
  cacheProvider: false,
  injected: {
    display: {
      logo: "data:image/gif;base64,INSERT_BASE64_STRING",
      name: "Injected",
      description: "Connect with the provider in your Browser"
    },
    package: null
  },
  // walletconnect: {
  //     package: WalletConnectProvider,
  //     options: {
  //         infuraId: "ffd9e5d586b34943ad85b7015449b25b"
  //     }
  // },
};

export const getWeb3Provider = async (): Promise<any> => {
  // const web3Modal = new Web3Modal(providerOptions);

  // const modalProvider = await web3Modal.connect();
  // return new ethers.providers.Web3Provider(modalProvider);
  await window.ethereum.enable()
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const accounts = await provider.listAccounts();

  return { provider, accounts };
};

export const EthersContext = createContext({});