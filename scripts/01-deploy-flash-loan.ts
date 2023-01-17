import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import verify from "../utils/verify";

const deployFlashLoan: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  network,
}: HardhatRuntimeEnvironment) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number = network.config.chainId!;

  const flashLoanArgs = ["0xc4dCB5126a3AfEd129BC3668Ea19285A9f56D15D"];

  const flashLoan = await deploy("FlashLoan", {
    from: deployer,
    args: flashLoanArgs,
    log: true,
    waitConfirmations: networkConfig[chainId]?.blockConfirmations || 1,
  });

  console.log(`FlashLoan dployed at ${flashLoan.address}!`);
  console.log("-------------------------------------------");

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(flashLoan.address, flashLoanArgs);
  }
};
