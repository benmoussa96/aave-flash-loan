export interface networkConfigItem {
  name?: string;
  aaveV3PoolAddressProvider?: string;
  aaveDAIAddress?: string;
  aaveUSDCAddress?: string;
  blockConfirmations?: number;
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem;
}

export const networkConfig: networkConfigInfo = {
  1: {
    name: "mainnet",
    blockConfirmations: 6,
  },
  5: {
    name: "goerli",
    aaveV3PoolAddressProvider: "0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D",
    aaveDAIAddress: "0xDF1742fE5b0bFc12331D8EAec6b478DfDbD31464",
    aaveUSDCAddress: "0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43",
    blockConfirmations: 6,
  },
  137: {
    name: "polygon",
    blockConfirmations: 6,
  },
  31337: {
    name: "hardhat",
    aaveV3PoolAddressProvider: "0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D",
    aaveDAIAddress: "0xDF1742fE5b0bFc12331D8EAec6b478DfDbD31464",
    aaveUSDCAddress: "0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43",
  },
};

// export const developmentChains = [31337];

export const developmentChains = ["hardhat", "localhost"];
