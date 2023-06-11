import React, { useState } from "react";

interface WhitelistRequestProps {
  contract: any;
  account: string;
}

export const WhitelistRequest: React.FC<WhitelistRequestProps> = ({ contract, account }) => {
  const [message, setMessage] = useState("");

  const requestWhitelist = async () => {
    try {
      // Implement the logic to request to be added to the whitelist.
      // For example, you can send a request to your server to save the address for review.
      setMessage("Whitelist request has been sent.");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Request to be added to the whitelist</h2>
      <button onClick={requestWhitelist}>Request</button>
      {message && <p>{message}</p>}
    </div>
  );
};
