import { useContext, useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { EthersContext } from "../utils/web3";
import { create as IPFSCreate } from 'ipfs-http-client'
import { VoteManager__factory } from '../contracts'
import { ethers } from 'ethers';
import { VOTE_MANAGER_CONTRACT_ADDRESS } from "../utils/constants";
import { TypedEvent, TypedEventFilter } from "../contracts/common";
import Modal from 'react-bootstrap/Modal'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';

type Proposal = {
    title: string;
    description: string;
    timestamp: Number;
};


function CreateProposalView(): JSX.Element {
    const [componentState, setComponentState] = useState<any>({ title: '', description: '' });
    const { web3Provider } = useContext<any>(EthersContext);

    useEffect(() => {
        if (web3Provider) {
            if (!web3Provider.signer._address) {
                console.log("No Signer!", web3Provider);
            } else {
                console.log("Got The Signer!");
            }
            setComponentState({ account: web3Provider.signer });
        }
    }, [web3Provider])


    const onSubmit = async (e: any) => {
        e.preventDefault();
        if (!componentState.title || !componentState.description) {
            return; //TODO: add message
        }

        let ipfsPath: string;
        try {
            const client = IPFSCreate({ url: "http://localhost:5001" });

            const content = JSON.stringify({ title: componentState.title, description: componentState.description, timestamp: new Date().getTime() });

            const ipfsResult = await client.add({
                content: uint8ArrayFromString(content)
            });

            ipfsPath = ipfsResult.path
        } catch (e: any) {
            setComponentState({ ...componentState, showErrorModal: true, error: `Failure to interact with IPFS: ${e}` });
            return;
        }


        try {
            const voteManager = VoteManager__factory.connect(VOTE_MANAGER_CONTRACT_ADDRESS, web3Provider.signer);

            const proposalResult = await voteManager.createProposal(ipfsPath, { value: ethers.utils.parseEther('1') });

            await proposalResult.wait();

            const filter = voteManager.filters.ProposalCreated(await web3Provider.signer.getAddress())

            voteManager.once(filter, (owner, proposalId, proposalAddress) => {
                console.log("Proposal created owner: %s, id: %s, address: %s", owner, proposalId.toString(), proposalAddress);
                setComponentState({ ...componentState, proposalAddress, proposalId: proposalId.toString(), showModal: true });
            });
        } catch (e: any) {
            setComponentState({ ...componentState, showErrorModal: true, error: `Failure while interacting with VoteManager contract: ${e.message} | ${e.data?.message}` });
            return;
        }
    };

    const onInputChange = (e: any) => {
        const newState = { ...componentState };
        newState[e.target.name] = e.target.value;

        setComponentState({ ...newState });
    };

    const handleClose = () => {
        setComponentState({ ...componentState, showModal: false });
    }
    const handleErrorClose = () => {
        setComponentState({ ...componentState, showErrorModal: false });
    }
    return (
        <Row>
            <Col>
                <Form>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" type="text" placeholder="Proposal Title" onChange={onInputChange} value={componentState.title} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" as="textarea" rows={10} cols={50} placeholder="Description" onChange={onInputChange} value={componentState.description} required />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={(e) => onSubmit(e)}>
                        Submit
                    </Button>
                </Form>
            </Col>

            <Modal show={componentState.showModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Proposal Created!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <strong>ID:</strong> #{componentState.proposalId}
                    </p>
                    <p>
                        <strong>Address:</strong> {componentState.proposalAddress}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={componentState.showErrorModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>An Error Ocurred!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {componentState.error}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleErrorClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        </Row>
    )
}

export default CreateProposalView;