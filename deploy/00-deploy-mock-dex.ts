import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { networkConfig } from "../helper-hardhat-config";

const deployMockDex: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  network,
}: HardhatRuntimeEnvironment) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number = network.config.chainId!;

  const DAI_ADDRESS = networkConfig[chainId]["aaveDAIAddress"];
  const USDC_ADDRESS = networkConfig[chainId]["aaveUSDCAddress"];

  console.log("Deploying Mock Dex...");

  await deploy("MockDex", {
    contract: "MockDex",
    from: deployer,
    log: true,
    args: [DAI_ADDRESS, USDC_ADDRESS],
  });

  console.log("Mock Dex dployed!");
  console.log("-------------------------------------------");
};

export default deployMockDex;
deployMockDex.tags = ["all", "arbitrage"];
