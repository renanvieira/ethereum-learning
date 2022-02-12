/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ProposalInterface extends utils.Interface {
  contractName: "Proposal";
  functions: {
    "_noVotes(uint256)": FunctionFragment;
    "_yesVotes(uint256)": FunctionFragment;
    "getVotes()": FunctionFragment;
    "id()": FunctionFragment;
    "metadata()": FunctionFragment;
    "proposalDeadline()": FunctionFragment;
    "vote(uint8)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_noVotes",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_yesVotes",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getVotes", values?: undefined): string;
  encodeFunctionData(functionFragment: "id", values?: undefined): string;
  encodeFunctionData(functionFragment: "metadata", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proposalDeadline",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "vote", values: [BigNumberish]): string;

  decodeFunctionResult(functionFragment: "_noVotes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "_yesVotes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getVotes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "id", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "metadata", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proposalDeadline",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;

  events: {
    "Voted(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Voted"): EventFragment;
}

export type VotedEvent = TypedEvent<
  [string, string],
  { voter: string; proposal: string }
>;

export type VotedEventFilter = TypedEventFilter<VotedEvent>;

export interface Proposal extends BaseContract {
  contractName: "Proposal";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ProposalInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    _noVotes(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    _yesVotes(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    getVotes(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { yesVotes: BigNumber; noVotes: BigNumber }
    >;

    id(overrides?: CallOverrides): Promise<[BigNumber]>;

    metadata(overrides?: CallOverrides): Promise<[string]>;

    proposalDeadline(overrides?: CallOverrides): Promise<[BigNumber]>;

    vote(
      userVote: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  _noVotes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  _yesVotes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  getVotes(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { yesVotes: BigNumber; noVotes: BigNumber }
  >;

  id(overrides?: CallOverrides): Promise<BigNumber>;

  metadata(overrides?: CallOverrides): Promise<string>;

  proposalDeadline(overrides?: CallOverrides): Promise<BigNumber>;

  vote(
    userVote: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    _noVotes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    _yesVotes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    getVotes(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { yesVotes: BigNumber; noVotes: BigNumber }
    >;

    id(overrides?: CallOverrides): Promise<BigNumber>;

    metadata(overrides?: CallOverrides): Promise<string>;

    proposalDeadline(overrides?: CallOverrides): Promise<BigNumber>;

    vote(userVote: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Voted(address,address)"(
      voter?: string | null,
      proposal?: string | null
    ): VotedEventFilter;
    Voted(voter?: string | null, proposal?: string | null): VotedEventFilter;
  };

  estimateGas: {
    _noVotes(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    _yesVotes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getVotes(overrides?: CallOverrides): Promise<BigNumber>;

    id(overrides?: CallOverrides): Promise<BigNumber>;

    metadata(overrides?: CallOverrides): Promise<BigNumber>;

    proposalDeadline(overrides?: CallOverrides): Promise<BigNumber>;

    vote(
      userVote: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _noVotes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _yesVotes(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVotes(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    id(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    metadata(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposalDeadline(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    vote(
      userVote: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}