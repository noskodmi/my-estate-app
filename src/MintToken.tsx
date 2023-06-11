import React, { useState } from "react";

interface MintTokenProps {
  contract: any;
  account: string;
}

export const MintToken: React.FC<MintTokenProps> = ({ contract, account }) => {
  const [tokenURI, setTokenURI] = useState("");
  const [message, setMessage] = useState("");

  const mint = async () => {
    try {
      await contract.methods.mint(account, tokenURI).send({ from: account });
      setMessage("Token minted successfully!");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div>
      <h2>Mint ESTATE Token</h2>
      <input
        type="text"
        placeholder="Token URI"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
      />
      <button onClick={mint} style={buttonStyle}>Mint Token</button>
      {message && <p>{message}</p>}
    </div>
  );
};
