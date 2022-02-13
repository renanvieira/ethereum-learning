/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Proposal, ProposalInterface } from "../Proposal";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "metadataURL",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "proposal",
        type: "address",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_noVotes",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_yesVotes",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "yesVotes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "noVotes",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "id",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "metadata",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalDeadline",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum Proposal.Vote",
        name: "userVote",
        type: "uint8",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526040516200236638038062002366833981810160405281019062000029919062000b48565b6200005d7f36adb815da51ec0aec6480d145293d819c3a06d869e52b050e59a04edde99b7560001b620005b060201b60201c565b620000917f2a29ebdba042ef2cb160746db2545bc1b0689fc81efb259b21e552402794115260001b620005b060201b60201c565b620000c57fc0bce57215d0ec28869b90949fa71715bdcff6b9949dd9fc6cbf5c0e6430a13160001b620005b060201b60201c565b620000f97f285f88c1dfc2d396a041d0f20ea0203b035fd5cc510cd93189f13fabd8e3c47c60001b620005b060201b60201c565b8242106200013e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001359062000c3a565b60405180910390fd5b620001727f1c0740dc727ad290626bc8acd7214279df229905c13d3a841f06a1f961c3507360001b620005b060201b60201c565b620001a67fa8237b3f88c32ab9a841bbd3bd3ff20141e4c92fe57e7f41d820e5d7a67c380160001b620005b060201b60201c565b620001da7f8f13fb21d2b46747583701e22e99c0f5d5148746f2dbb1f43e0fd12a876d2fbb60001b620005b060201b60201c565b6200020e7faf3bb45c12a2549864eba86c507012648c4dd914ab9893a438d8c78be0a1842f60001b620005b060201b60201c565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141562000281576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002789062000cac565b60405180910390fd5b620002b57f018772cb484b34dd1c9cf7f7e541d00a4e9a44e871953b57c7df06d4614bf5f760001b620005b060201b60201c565b620002e97f956f53eaf91c68d196a0f106e1a56405e5a8d9daf5e343a1cc5b8aee1fbbcde460001b620005b060201b60201c565b6200031d7f45e9ad975b5a2804b937ad1903d11482a2547ad724e2c3009668c7231ebfca8960001b620005b060201b60201c565b620003517f60cf1292bec9490623382a78ae12ea094385e09efd32919b8be61e7fbb2af20260001b620005b060201b60201c565b6000341162000397576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200038e9062000d1e565b60405180910390fd5b620003cb7f47ffcda0e4b841d28dec7ec7a4dbaae4d7dd1925dfb6d5ba8af548119a925d8360001b620005b060201b60201c565b620003ff7f15c793a13280b618056b378b2e3d308f4f21abca998655d634f08efc8f93153260001b620005b060201b60201c565b620004337f1807f85f574d37c6a1f8d129a7af6dbddcba0af3feb45eeae91010626820a91460001b620005b060201b60201c565b816005819055506200046e7f2ccc1c3101a0d184f3c04c9b0a94424bbbd8273cd982127941303fc78f26114160001b620005b060201b60201c565b620004a27f9adf3a69f785fdc7361f04efa97c61cc8ad0d271b0f7b7b5f4abefae3f676ea960001b620005b060201b60201c565b8360039080519060200190620004ba9291906200085b565b50620004ef7f0a4805165e8888d29f753267edcadbf4050f2decfe9cb45ff4c97a0c804567f660001b620005b060201b60201c565b620005237f1128a35ba5ebae7a9bcc8be2575c8a6c91cd05680c6e5df7dc37d89f78e8e75860001b620005b060201b60201c565b826004819055506200055e7f5a43fe7e7e65ebdf6b85bc0618f7a44e334717ee001f1ef3048a83deb381845560001b620005b060201b60201c565b620005927f399ed40918d3530b36a34d0620b0fb20c8d7457df8238d655a2356f5fe9c266e60001b620005b060201b60201c565b620005a681600454620005b360201b60201c565b5050505062000da5565b50565b620005e77f4f5db8291e63f6e5bd9bfef1ec24472c0d1dbed82df83a64c4be3d697a11a87d60001b6200085860201b60201c565b6200061b7fea95b033f96bec6bf29db509746ee8a335a95d2b727e187285dd11b21e837c7160001b6200085860201b60201c565b6200064f7f872b60b2b8be4cd686c5491499bd3f26a6e197d1e6fe373f4d196721fc73364c60001b6200085860201b60201c565b620006837f20aba50924b68348ddac44c77badb44bc30febe0963b8ed56dc3d22e357c2fd060001b6200085860201b60201c565b600034116200069157600080fd5b620006c57fb1f17f851c2e7972a222854ecf5bc33da018ace7171524af5cbb037b608cb49f60001b6200085860201b60201c565b620006f97f469de94795ea0fdc3cd937b5ef179cf57a2ba28eff2a4afec4d57a545bdb453960001b6200085860201b60201c565b6200072d7f5e20292a5a2ca4dbe5b85c48048f44e728cca19f127addc7857b5ec16e588edb60001b6200085860201b60201c565b346000600201819055506200076b7f1e749503f6320b5299a2be102a1a7aad5b3070bbfab44c2aad6a9e02328f96c360001b6200085860201b60201c565b6200079f7f7c4ffc1079765d70eb571ba09c84b69f80e7e3dd84291784c39bf3c8f452a28b60001b6200085860201b60201c565b80600060010181905550620007dd7fd29f364dfed4aabd3be55f3a1a1a36652675500d021502862e865439a44e4b7b60001b6200085860201b60201c565b620008117ff55a0d8beb72dec58c9e44d99d3c89c92c6f41f97069b5c7dd8e995bc00c5f8b60001b6200085860201b60201c565b816000800160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b50565b828054620008699062000d6f565b90600052602060002090601f0160209004810192826200088d5760008555620008d9565b82601f10620008a857805160ff1916838001178555620008d9565b82800160010185558215620008d9579182015b82811115620008d8578251825591602001919060010190620008bb565b5b509050620008e89190620008ec565b5090565b5b8082111562000907576000816000905550600101620008ed565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620009748262000929565b810181811067ffffffffffffffff821117156200099657620009956200093a565b5b80604052505050565b6000620009ab6200090b565b9050620009b9828262000969565b919050565b600067ffffffffffffffff821115620009dc57620009db6200093a565b5b620009e78262000929565b9050602081019050919050565b60005b8381101562000a14578082015181840152602081019050620009f7565b8381111562000a24576000848401525b50505050565b600062000a4162000a3b84620009be565b6200099f565b90508281526020810184848401111562000a605762000a5f62000924565b5b62000a6d848285620009f4565b509392505050565b600082601f83011262000a8d5762000a8c6200091f565b5b815162000a9f84826020860162000a2a565b91505092915050565b6000819050919050565b62000abd8162000aa8565b811462000ac957600080fd5b50565b60008151905062000add8162000ab2565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600062000b108262000ae3565b9050919050565b62000b228162000b03565b811462000b2e57600080fd5b50565b60008151905062000b428162000b17565b92915050565b6000806000806080858703121562000b655762000b6462000915565b5b600085015167ffffffffffffffff81111562000b865762000b856200091a565b5b62000b948782880162000a75565b945050602062000ba78782880162000acc565b935050604062000bba8782880162000acc565b925050606062000bcd8782880162000b31565b91505092959194509250565b600082825260208201905092915050565b7f496e76616c696420646561646c696e652074696d657374616d70000000000000600082015250565b600062000c22601a8362000bd9565b915062000c2f8262000bea565b602082019050919050565b6000602082019050818103600083015262000c558162000c13565b9050919050565b7f496e76616c69642063726561746f722061646472657373000000000000000000600082015250565b600062000c9460178362000bd9565b915062000ca18262000c5c565b602082019050919050565b6000602082019050818103600083015262000cc78162000c85565b9050919050565b7f4d697373696e6720455448000000000000000000000000000000000000000000600082015250565b600062000d06600b8362000bd9565b915062000d138262000cce565b602082019050919050565b6000602082019050818103600083015262000d398162000cf7565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168062000d8857607f821691505b6020821081141562000d9f5762000d9e62000d40565b5b50919050565b6115b18062000db56000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80633ccfd60b1161005b5780633ccfd60b1461012a5780637ce1f84414610134578063af640d0f14610152578063b3f98adc1461017057610088565b80630dc960151461008d5780630e1333dc146100ac578063167a86f2146100dc578063392f37e91461010c575b600080fd5b61009561018c565b6040516100a3929190610fa0565b60405180910390f35b6100c660048036038101906100c19190610ffa565b610227565b6040516100d39190611068565b60405180910390f35b6100f660048036038101906100f19190610ffa565b610266565b6040516101039190611068565b60405180910390f35b6101146102a5565b604051610121919061111c565b60405180910390f35b610132610333565b005b61013c610953565b604051610149919061113e565b60405180910390f35b61015a610959565b604051610167919061113e565b60405180910390f35b61018a6004803603810190610185919061117e565b61095f565b005b6000806101bb7f1e90594581236cf3103cb38fa933aed9995c730cc5d68b6f1c88f5e119c2989960001b610f81565b6101e77f23661b0957b2bceb8963745e89e03548ab3f40bec68db11bee50b4e563f3835660001b610f81565b6102137fda93796c658c043c1889bc24f90944dbc389414e5cc9bbcbe9cf97f76fc6895660001b610f81565b600880549050600780549050915091509091565b6008818154811061023757600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6007818154811061027657600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600380546102b2906111da565b80601f01602080910402602001604051908101604052809291908181526020018280546102de906111da565b801561032b5780601f106103005761010080835404028352916020019161032b565b820191906000526020600020905b81548152906001019060200180831161030e57829003601f168201915b505050505081565b61035f7fd265b682e4d4595b60d39bb4017f79e99e28241d6d3ccad35d6f830a44fbc7c660001b610f84565b61038b7f64659b9e28ce0cc550b76bf1bad852d27e760cf243c437bbb88dae6ca44fbc5b60001b610f84565b6103b77f57dd7db9612d8544591ba3144736c567134c246f0c98ce5661e00f8e49397a7a60001b610f84565b6103e37ff9f48c67e5e48eb0d8573329f97a77e169bc2f7b7b3ba5d269e9ba5e2d99716c60001b610f84565b60006001015442101561042b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104229061127e565b60405180910390fd5b6104577f9d8210c353b156e7fcd1c36c33c55d8619e983f69ed35860de986c283302ce2e60001b610f84565b6104837f8e421f2fff5f81e81acc51cbfb55db968c55753606bab7ed7832dbeb31667d4d60001b610f84565b6104af7f3fb6de75bff20e696454e0f20f634075b6169134187ac60e78482a2c968e7a6060001b610f84565b6104db7f6b3d66601ae13f8ce9036696256acd63bf43cb986e4175c3fb489e80a04da0bb60001b610f84565b3373ffffffffffffffffffffffffffffffffffffffff166000800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461056d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161056490611310565b60405180910390fd5b6105997fa35e297571589b8d5757308fe9db54a6b915e5923dbd20ed3a9bb9b596c4b68960001b610f84565b6105c57fc258defa66f277ddc4b1ffd65812ea484e6e043d4ee540da7deab779f6c4744a60001b610f84565b6105f17f81ce366e2ecaeb9a88910e8944b76883eb3f9558d86a068f71409849f7eee74660001b610f84565b61061d7f096a9ceed7dc31c84b7ae88ab8682d3f47af8fbaf04143e4a1a180784e9c269e60001b610f84565b6000806002015411610664576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161065b906113a2565b60405180910390fd5b6106907f75c0c90d4ca4cf4e70c05a79c6dc8527723e0250edff9b1cb3839a5aacdb128660001b610f84565b6106bc7f45dae985673ace065a89a22043d395205c8839951493ffccd8fb0b0aca7de4ff60001b610f84565b6106e87f7f988838067851ba56a123e6fc0ba1971b858149c3448d4c7b93588a09ab80e260001b610f84565b6000806040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160018201548152602001600282015481525050905061078e7f82c488f57edf0ad26f3bfaf414bfb0933dc5c48c9b5a2e177bcf92b11d1a0c5260001b610f84565b6000600201600090556107c37f3328db12a937c10348d68324154519e811965942dcd6ec524be588b2bbe7846c60001b610f84565b6107ef7f54877569ee519afc2e5330cf616f970ac5e9ef8054b06dcca7cde6ac7f05389560001b610f84565b60003373ffffffffffffffffffffffffffffffffffffffff168260400151604051610819906113f3565b60006040518083038185875af1925050503d8060008114610856576040519150601f19603f3d011682016040523d82523d6000602084013e61085b565b606091505b5050905061088b7f0e89c3bbac8f6655b709c1c5637f40b242cd9514b7e76e73247074fd9ffd2fa660001b610f84565b6108b77fbd0008f007634f8c528cb3557c41b0763a6e615fe7e8572ecf383c0c1fbe8bd260001b610f84565b6108e37f25c5c7917f4acbdf75938e1ad2f4f4a2687467512e3eaa48f122869bf04880e860001b610f84565b80610923576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161091a90611454565b60405180910390fd5b61094f7f893f0801e35134a9bffd2b47439744eff700237667911239e7ea53050a7735b060001b610f84565b5050565b60045481565b60055481565b61098b7fc84907dd07126604324b9de732a163636d2c78242807d0275c750eadf7c5d0c360001b610f81565b6109b77f536bf4f61930191d769337d55ec07e6157a3570a90c58d47f84dd0277a45c26260001b610f81565b6109e37fd181700b86d21d7b284af268eaae4605768d886720cf30a96f85813c89a1ddc360001b610f81565b610a0f7f72a0a4ece70ffa9f0a56491102253cd84e9634086c7d9d4bfb8ed64f6a3b80aa60001b610f81565b60001515600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151514610aa2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a99906114c0565b60405180910390fd5b610ace7f166a2212361c110032e6a1eba2d63e636e7a6fd39b880bcea8d96416d0f2840d60001b610f81565b610afa7f8057c878875177def0e94da78b3cd93b826377eb5c878fd96e3ffe66b68fec6360001b610f81565b610b267fc8a6aba4708c179fb8170b433fa6e2a9eae472ef52db616edb40fc830745f2c460001b610f81565b610b527f8ce853310b0ff1e294fd76fed798e6531dade53ba4ad1c563908b778b58f2bc160001b610f81565b600454421115610b97576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b8e9061152c565b60405180910390fd5b610bc37fe789921a6e1d78f04568937cce9a1c6dbbd5353fc313ab9a00f96068b74e439c60001b610f81565b610bef7f174fccd27b76a82e9c2725a3777d6417db4120f50c9863d924c5b8ebb701bf4960001b610f81565b610c1b7f8e4e0be964d2e9bc584766bd8ea0e694501e020ae788aa5001d7b6940079e16f60001b610f81565b6001600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610c9f7ff00be66bb978c35efdca7c0bb3b52a02a9ba9d9d535e8e683608cc31e3eb2cbb60001b610f81565b610ccb7f9ae85fcf08e2751bde15f89e5f5840038ebfdf2fa10e59a84e71c301f2972b6360001b610f81565b60006001811115610cdf57610cde61154c565b5b816001811115610cf257610cf161154c565b5b1415610de457610d247fa069138aa15ebae030c6a4699d220d0f9b2baad8159c0d57a2dbe99c19d7cab160001b610f81565b610d507f234d76af59395406cc4bc9b1d38848c67e2b8ab29c26bb949e05ac7d655cdac060001b610f81565b610d7c7f3056430f796819bab09dcb8567af188ebe4d6059f890d70f65c8d91c9d09f86860001b610f81565b6008339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610ecc565b610e107f6ec6bc7a73f9b743f541162f9be04d4a606ca8b3b5dda47a24c0af74f7c5a7c460001b610f81565b610e3c7fe5031639372937611adb8c62ebbe8e69e2aea3814b18fff084280554422124f860001b610f81565b610e687f56a161dc8855a7027ff330959fe358a2a0ce384bf9e059b327fdead7bc618d3f60001b610f81565b6007339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b610ef87f200355abf4034128b7033094d8a135214e03b62bd62eac2af85beecd8de5e18760001b610f81565b610f247f6ce53aea782c6bf669bc277109190cbd62094c6f2a094406b80e905b3b0a0de160001b610f81565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fce0c7a2a940807f7dc2ce7a615c2532e915e6c0ac9a08bc4ed9d515a710a53e260405160405180910390a350565b50565b50565b6000819050919050565b610f9a81610f87565b82525050565b6000604082019050610fb56000830185610f91565b610fc26020830184610f91565b9392505050565b600080fd5b610fd781610f87565b8114610fe257600080fd5b50565b600081359050610ff481610fce565b92915050565b6000602082840312156110105761100f610fc9565b5b600061101e84828501610fe5565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061105282611027565b9050919050565b61106281611047565b82525050565b600060208201905061107d6000830184611059565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156110bd5780820151818401526020810190506110a2565b838111156110cc576000848401525b50505050565b6000601f19601f8301169050919050565b60006110ee82611083565b6110f8818561108e565b935061110881856020860161109f565b611111816110d2565b840191505092915050565b6000602082019050818103600083015261113681846110e3565b905092915050565b60006020820190506111536000830184610f91565b92915050565b6002811061116657600080fd5b50565b60008135905061117881611159565b92915050565b60006020828403121561119457611193610fc9565b5b60006111a284828501611169565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806111f257607f821691505b60208210811415611206576112056111ab565b5b50919050565b7f54696d654c6f636b3a204c6f636b2065787069726174696f6e206e6f7420796560008201527f7420726561636865640000000000000000000000000000000000000000000000602082015250565b600061126860298361108e565b91506112738261120c565b604082019050919050565b600060208201905081810360008301526112978161125b565b9050919050565b7f54696d654c6f636b3a2073656e6465722061646472657373206973206e6f742060008201527f7468652070726f706f73616c2063726561746f72000000000000000000000000602082015250565b60006112fa60348361108e565b91506113058261129e565b604082019050919050565b60006020820190508181036000830152611329816112ed565b9050919050565b7f54696d654c6f636b3a205468657265206973206e6f2045544820746f2077697460008201527f6864726177000000000000000000000000000000000000000000000000000000602082015250565b600061138c60258361108e565b915061139782611330565b604082019050919050565b600060208201905081810360008301526113bb8161137f565b9050919050565b600081905092915050565b50565b60006113dd6000836113c2565b91506113e8826113cd565b600082019050919050565b60006113fe826113d0565b9150819050919050565b7f4661696c656420746f2073656e64204574686572000000000000000000000000600082015250565b600061143e60148361108e565b915061144982611408565b602082019050919050565b6000602082019050818103600083015261146d81611431565b9050919050565b7f54686973206164647265737320616c726561647920766f746564000000000000600082015250565b60006114aa601a8361108e565b91506114b582611474565b602082019050919050565b600060208201905081810360008301526114d98161149d565b9050919050565b7f50726f706f73616c206578706972656400000000000000000000000000000000600082015250565b600061151660108361108e565b9150611521826114e0565b602082019050919050565b6000602082019050818103600083015261154581611509565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fdfea26469706673582212205b5e9267570cbe24e0f24f672c014bfcaa3c35e295e635c89ee340c96b45be8d64736f6c63430008090033";

type ProposalConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProposalConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Proposal__factory extends ContractFactory {
  constructor(...args: ProposalConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Proposal";
  }

  deploy(
    metadataURL: string,
    deadline: BigNumberish,
    _id: BigNumberish,
    creator: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<Proposal> {
    return super.deploy(
      metadataURL,
      deadline,
      _id,
      creator,
      overrides || {}
    ) as Promise<Proposal>;
  }
  getDeployTransaction(
    metadataURL: string,
    deadline: BigNumberish,
    _id: BigNumberish,
    creator: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      metadataURL,
      deadline,
      _id,
      creator,
      overrides || {}
    );
  }
  attach(address: string): Proposal {
    return super.attach(address) as Proposal;
  }
  connect(signer: Signer): Proposal__factory {
    return super.connect(signer) as Proposal__factory;
  }
  static readonly contractName: "Proposal";
  public readonly contractName: "Proposal";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProposalInterface {
    return new utils.Interface(_abi) as ProposalInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Proposal {
    return new Contract(address, _abi, signerOrProvider) as Proposal;
  }
}
