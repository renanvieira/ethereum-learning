import './App.css';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Navbar, Row, Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Layout from './Layout';
import CreateProposalView from './routes/CreateProposalView';
import ListProposalView from './routes/ListProposalView';
import ShowProposalView from './routes/ShowProposalView';
import { getWeb3Provider, EthersContext } from './utils/web3';

export default function App(): JSX.Element {
  const [web3Provider, setWeb3Provider] = useState<any | null>(null);

  useEffect(() => {
    if (!web3Provider) {
      getWeb3Provider().then((web3) => {
        console.log("setting provider");
        setWeb3Provider({ provider: web3.provider, signer: web3.provider.getSigner(web3.accounts[0]) });

        window.ethereum.on('accountsChanged', (accounts: any) => {
          if (accounts[0] !== web3.accounts[0]) {
            setWeb3Provider({ provider: web3.provider, signer: web3.provider.getSigner(accounts[0]) })
          }
        });

      });
    }
  }, []);

  return (
    <React.Fragment>
      <EthersContext.Provider value={{ web3Provider }}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<ListProposalView />} />
            <Route path="/createProposal" element={<CreateProposalView />} />
          </Route>
        </Routes>
      </EthersContext.Provider>
    </React.Fragment>
  );
}
