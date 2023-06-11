import React, { useState } from "react";

interface RentTokenProps {
  contract: any;
  account: string;
}

export const RentToken: React.FC<RentTokenProps> = ({ contract, account }) => {
  const [tokenId, setTokenId] = useState("");
  const [message, setMessage] = useState("");

  const rent = async () => {
    try {
      await contract.methods.rent(tokenId).send({ from: account });
      setMessage("Token rented successfully!");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Rent ESTATE Token</h2>
      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={rent}>Rent Token</button>
      {message && <p>{message}</p>}
    </div>
  );
};
