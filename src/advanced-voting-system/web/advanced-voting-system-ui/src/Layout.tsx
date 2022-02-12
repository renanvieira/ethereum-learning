import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Contract, ethers } from 'ethers';
import { EthersContext } from "./utils/web3";

function Layout() {
    const [state, setState] = useState<any>();
    const { web3Provider } = useContext<any>(EthersContext);

    useEffect(() => {
        if (web3Provider) {
            getAddress(web3Provider.signer);
        }
    }, [web3Provider]);


    async function getAddress(signer: any) {
        const address = await signer.getAddress();
        setState(`${address.substring(0, 6)}...${address.substring(address.length - 6, address.length)}`);
    }



    return (
        <React.Fragment>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        Advanced Voting System
                    </Navbar.Brand>
                    <Navbar.Brand>
                        {state}
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Item>

                        </Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Proposals" id="dropdown-proposals-nav">
                            <NavDropdown.Item href="/createProposal">Create Proposal</NavDropdown.Item>
                            <NavDropdown.Item href="/listProposals">List Proposals</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <Container className="main-container">
                <Outlet />
            </Container>
        </React.Fragment>
    )
}

export default Layout;