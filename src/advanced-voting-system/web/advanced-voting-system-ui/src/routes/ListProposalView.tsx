import { useContext, useEffect, useState } from "react";
import { Row, Col, Form, Button, Card, Badge, ButtonGroup, OverlayTrigger } from "react-bootstrap";
import { Proposal__factory, VoteManager__factory } from "../contracts";
import { Vote, VOTE_MANAGER_CONTRACT_ADDRESS } from "../utils/constants";
import { EthersContext } from "../utils/web3";
import { create as IPFSCreate } from 'ipfs-http-client'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
import all from 'it-all';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';
import React from "react";
import { Signer } from "ethers";
import moment from 'moment';
import { Link } from "react-router-dom";
import Tooltip from 'react-bootstrap/Tooltip';
import Spinner from 'react-bootstrap/Spinner';
import { ethers } from "ethers";

type State = {
    account: any;
    proposals: Array<any>;
    loading: Boolean;
};

function Proposal(props: any) {
    const [votes, setVotes] = useState<any>({ addressAlreadyVoted: false, yesVotes: 0, noVotes: 0 });

    useEffect(() => {
        if (props) {
            setVotes({
                ...votes,
                signer: props.signer,
                yesVotes: props.item.votes.yes,
                noVotes: props.item.votes.no,
                addressAlreadyVoted: props.item.votes.addressAlreadyVoted
            });
        }
    }, [props]);

    console.log('deadline', props.item.deadline);
    const isExpired = props.item.deadline <= moment().unix();
    const isVoteDisabled = votes.addressAlreadyVoted || isExpired;

    return (
        <Card style={{ width: '350px' }}>
            <Card.Body>
                <Card.Title>{props.item.metadata.title}</Card.Title>
                <Card.Text className="justify">
                    {props.item.metadata.description}
                </Card.Text>
                <Card.Link as="div">
                    <hr />
                    <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
                        <Button variant="primary" onClick={(e) => props.voteClick(e, props.item.proposalAddress, Vote.Yay)} disabled={isVoteDisabled}>
                            Yes <Badge bg="secondary">{votes.yesVotes.toString()}</Badge>
                        </Button>
                        <Button variant="danger" onClick={(e) => props.voteClick(e, props.item.proposalAddress, Vote.Nay)} disabled={isVoteDisabled}>
                            No  <Badge bg="secondary">{votes.noVotes.toString()}</Badge>
                        </Button>
                    </ButtonGroup>
                </Card.Link>
            </Card.Body>
            <Card.Footer>
                {!isExpired ?
                    <React.Fragment>
                        <small className="text-muted">Expires in&nbsp;</small>
                        <OverlayTrigger
                            key='top'
                            placement='top'
                            overlay={
                                <Tooltip id={`tooltip-deadline`}>
                                    {moment.unix(props.item.deadline).toString()}
                                </Tooltip>
                            }>
                            <small className="text-muted">{moment.unix(props.item.deadline).fromNow()} </small>
                        </OverlayTrigger>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Button variant="primary" onClick={(e) => props.withdrawClick(e, props.item.proposalAddress)} disabled={!props.item.hasBalance} style={{ width: '100%' }}>
                            Withdraw Locked ETH
                        </Button>
                        <small className="text-muted">Expired at <strong>{moment.unix(props.item.deadline).format('DD-MMM-YYYY HH:mm:ss')}</strong></small>
                    </React.Fragment>
                }

            </Card.Footer>
            <Card.Footer>
                <small className="text-muted">Created&nbsp;</small>
                <OverlayTrigger
                    key='top'
                    placement='top'
                    overlay={
                        <Tooltip id={`tooltip-created`}>
                            {moment(props.item.metadata.timestamp).toString()}
                        </Tooltip>
                    }>
                    <small className="text-muted">{moment(props.item.metadata.timestamp).fromNow()}</small>
                </OverlayTrigger>
                <small className="text-muted">&nbsp;at <Link to="#">{props.item.createdAtTrxDisplay}</Link></small>
            </Card.Footer>
        </Card>
    );
}

function ListProposalView() {
    const [state, setState] = useState<State>({ proposals: [], account: null, loading: false });

    const { web3Provider } = useContext<any>(EthersContext);

    useEffect(() => {
        setState({ ...state, loading: true });
        if (web3Provider) {
            fetchProposals(web3Provider);
        }
    }, [web3Provider]);


    const voteAction = async (e: any, proposalAddress: string, vote: Vote) => {
        const proposalContract = Proposal__factory.connect(proposalAddress, web3Provider.signer);

        const trxResult = await proposalContract.vote(vote);
        await trxResult.wait();

        const votesResult = await proposalContract.getVotes();

        const proposalIndex = state.proposals.findIndex(x => x.proposalAddress === proposalAddress);
        const proposal = state.proposals[proposalIndex];

        debugger;
        proposal.votes.yes = votesResult.yesVotes;
        proposal.votes.no = votesResult.noVotes;
        proposal.votes.addressAlreadyVoted = true;

        state.proposals[proposalIndex] = proposal

        setState({ ...state });
    }


    async function fetchProposals(provider: any) {

        const client = IPFSCreate({ url: "http://localhost:5001" });
        const voteManager = VoteManager__factory.connect(VOTE_MANAGER_CONTRACT_ADDRESS, provider.signer);
        const numOfProposals = await voteManager.getNumberOfProposals();

        const proposalList = [];

        for (let index = 0; index < numOfProposals.toBigInt(); index++) {
            try {
                const obj: any = {};

                const element = await voteManager.proposals(index);
                const proposal = await voteManager.getProposal(element);

                obj.proposalAddress = proposal.contractAddress;
                obj.creator = proposal.creator;
                obj.id = proposal.id;

                const proposalContract = Proposal__factory.connect(proposal.contractAddress, web3Provider.signer);


                obj.hasBalance = web3Provider.provider.getBalance(proposal.contractAddress) > 0;
                obj.ipfsHash = await proposalContract.metadata();
                obj.deadline = (await proposalContract.proposalDeadline()).toNumber();

                const file = client.cat(obj.ipfsHash);

                const arr = await all(file);

                const data = uint8ArrayToString(uint8ArrayConcat(arr));
                obj.metadata = JSON.parse(data);

                if (!obj.metadata.title) {
                    continue;
                }

                const filter = voteManager.filters.ProposalCreated(null, await proposalContract.id(), proposalContract.address)
                const result = await voteManager.queryFilter(filter);

                if (result.length > 0) {
                    obj.createdAtTrx = result[0].transactionHash;
                    obj.createdAtTrxDisplay = `${obj.createdAtTrx.substring(0, 6)}...${obj.createdAtTrx.substring(obj.createdAtTrx.length - 4, obj.createdAtTrx)}`;
                }

                obj.votes = { yes: 0, no: 0, addressAlreadyVoted: false };
                const votes = await proposalContract.getVotes();

                obj.votes.yes = votes.yesVotes;
                obj.votes.no = votes.noVotes;

                const votedFilter = proposalContract.filters.Voted(await web3Provider.signer.getAddress(), proposalContract.address);
                const queryResult = await proposalContract.queryFilter(votedFilter);

                if (queryResult.length > 0) {
                    obj.votes.addressAlreadyVoted = true;
                }

                proposalList.push(obj);
            } catch (e) {
                console.log(e);
                continue;
            }
        }

        setState({ ...state, proposals: proposalList, loading: false });
    }

    async function withdrawAction(e: any, proposalAddress: string) {
        const proposalContract = Proposal__factory.connect(proposalAddress, web3Provider.signer);

        let result = await proposalContract.withdraw();

        await result.wait()
    }

    const cols = state.proposals.map((item, index) => {
        return (
            <Col key={index}>
                <Proposal item={item} signer={web3Provider.signer} voteClick={voteAction} withdrawClick={withdrawAction} />
            </Col>
        );
    });

    const noRows = Math.ceil(state.proposals.length / 3);

    return (
        <React.Fragment>
            {state.loading ?
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <Spinner animation="border" variant="primary" />
                </div>
                : null}
            {Array.from(Array(noRows)).map((n, i) => (
                <Row className="g-4" key={i}>
                    {cols.slice(i * 3, (i + 1) * 3)}
                </Row>
            ))}
        </React.Fragment>
    )
}

export default ListProposalView;