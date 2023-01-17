import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PIVATE_KEY = process.env.PIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.10",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PIVATE_KEY!],
    },
  },
};

export default config;
