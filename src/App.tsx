import React, { useState } from "react";
import Web3 from "web3";
import { WhitelistRequest } from "./WhitelistRequest";
import { MintToken } from "./MintToken";
import { RentToken } from "./RentToken";
import { Box, Button, Stepper, Step, StepLabel, Select, MenuItem, FormControl, InputLabel, Typography, SelectChangeEvent, ListItem } from '@mui/material';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const CONTRACT_ABI: any = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "addToWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "isUser",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "reclaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "removeFromWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "rent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "rentals",
    "outputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "expires",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "whitelistedUsers",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = "0xb00FCA39f7a2332508C5fDe9503C2021DEe524c7";


const App: React.FC = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<any | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [network, setNetwork] = useState("Optimism Goerli");
  const steps = [
    { title: 'Whitelist' },
    { title: 'Mint' },
    { title: 'Rent' },
  ];

  const getAccounts = async (): Promise<any> => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        return accounts;
      } catch (error) {
        console.error("Error getting accounts:", error);
        return null;
      }
    } else {
      console.error("Ethereum provider not found");
      return null;
    }
  };

  const initWeb3 = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      console.log(web3Instance);
      const accounts = await getAccounts();
      console.log(accounts);
      const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      console.log(contractInstance);

      setWeb3(web3Instance);
      setContract(contractInstance);
      setAccount(accounts ? accounts[0] : null);
    } else {
      console.error("Ethereum provider not found");
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const chainId = 420;
        const chainIdHex = `0x${chainId.toString(16)}`;
        const rpcUrl = "https://rpc.goerli.optimism.gateway.fm"; // Replace with the Optimism Goerli RPC URL
        const blockExplorerUrl = "https://goerli-optimistic.etherscan.io";
        if (window.ethereum.chainId !== chainIdHex) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chainIdHex,
                chainName: "Optimism Goerli",
                nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
                rpcUrls: [rpcUrl],
                blockExplorerUrls: [blockExplorerUrl],
              },
            ],
          });
        }

        await initWeb3();
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.error("Ethereum provider not found");
    }
  };

  const handleChange = (event: SelectChangeEvent<string>): void => {
    setNetwork(event.target.value);
  };

  if (!web3 || !contract || !account) {
    return (
      <div>
         <Box>
            <FormControl >
              <InputLabel id="network-select-label">Network</InputLabel>
              <Select
                labelId="network-select-label"
                id="network-select"
                value={network}
                onChange={handleChange}
              >
                <MenuItem value="Optimism Goerli">Optimism Goerli</MenuItem>
                <MenuItem value="Mantle Testnet">
                  <ListItem component="a" href="https://explorer.testnet.mantle.xyz/address/0x35aB012bb736e915407877F7489b0651406D825d" button>
                    Mantle Testnet, UI soon
                  </ListItem>
                </MenuItem>
                <MenuItem value="Scroll Testnet">
                  <ListItem component="a" href="https://blockscout.scroll.io/address/0xbefC6F3B404F2BF6B4c52E05c55BE15ee3Fe294d" button>
                    Scroll Contract, UI soon
                  </ListItem>
                </MenuItem>
                <MenuItem value="Gnosis testnet">
                  <ListItem component="a" href="https://blockscout.chiadochain.net/address/0xFe8Fa89D8D861971F5E9061B3Cb90fcaE270338F" button>
                    Gnosis Contract, UI soon
                  </ListItem>
                </MenuItem>
                <MenuItem value="Tayko testnet">
                  <ListItem component="a" href="https://explorer.test.taiko.xyz/address/0xbefC6F3B404F2BF6B4c52E05c55BE15ee3Fe294d" button>
                    Tayko Contract, UI soon
                  </ListItem>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        <p>Loading...</p>
        <button onClick={connectWallet}>Connect Wallet</button>
        <Box>
        <Typography>
          <a href="https://github.com/noskodmi/zkEstate-contracts" target="_blank" rel="noopener noreferrer">Check out Github</a>
        </Typography>
      </Box>
      <Box>
        <Typography>
          <a href="https://master--idyllic-conkies-a6257f.netlify.app/" target="_blank" rel="noopener noreferrer">RentalNFT zkEstate market</a>
        </Typography>
      </Box>
      </div>
    );
  }

  return (

    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div style={{ width: "50%" }}>
          <Box>
            <FormControl >
              <InputLabel id="network-select-label">Network</InputLabel>
              <Select
                labelId="network-select-label"
                id="network-select"
                value={network}
                onChange={handleChange}
              >
                <MenuItem value="Optimism Goerli">Optimism Goerli</MenuItem>
                <MenuItem value="Mantle Testnet">
                  <ListItem component="a" href="https://explorer.testnet.mantle.xyz/address/0x35aB012bb736e915407877F7489b0651406D825d" button>
                    Mantle Testnet, UI soon
                  </ListItem>
                </MenuItem>
                <MenuItem value="Scroll Testnet">
                  <ListItem component="a" href="https://blockscout.scroll.io/address/0xbefC6F3B404F2BF6B4c52E05c55BE15ee3Fe294d" button>
                    Scroll Contract, UI soon
                  </ListItem>
                </MenuItem>
                <MenuItem value="Gnosis testnet">
                  <ListItem component="a" href="https://blockscout.chiadochain.net/address/0xFe8Fa89D8D861971F5E9061B3Cb90fcaE270338F" button>
                    Gnosis Contract, UI soon
                  </ListItem>
                </MenuItem>
                <MenuItem value="Tayko testnet">
                  <ListItem component="a" href="https://explorer.test.taiko.xyz/address/0xbefC6F3B404F2BF6B4c52E05c55BE15ee3Fe294d" button>
                    Tayko Contract, UI soon
                  </ListItem>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            {activeStep === 0 && <WhitelistRequest contract={contract} account={account} />}
            {activeStep === 1 && <MintToken contract={contract} account={account} />}
            {activeStep === 2 && <RentToken contract={contract} account={account} />}
          </Box>
          <Box>
            <Button disabled={activeStep === 0} onClick={() => setActiveStep((prevStep) => prevStep - 1)}>
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveStep((prevStep) => prevStep + 1)}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </div>
      </div>
      <Box>
        <Typography>
          <a href="https://github.com/noskodmi/zkEstate-contracts" target="_blank" rel="noopener noreferrer">Check out project</a>
        </Typography>
      </Box>
    </Box>

  );


};

export default App;