import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import verify from "../utils/verify";

const deployFlashLoanArbitrage: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  network,
}: HardhatRuntimeEnvironment) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number = network.config.chainId!;

  const aaveV3PoolAddressProvider =
    networkConfig[chainId]["aaveV3PoolAddressProvider"];

  const mockDex = await deployments.get("MockDex");
  const mockDexAddress = mockDex.address;

  const DAI_ADDRESS = networkConfig[chainId]["aaveDAIAddress"];
  const USDC_ADDRESS = networkConfig[chainId]["aaveUSDCAddress"];

  const flashLoanArgs = [
    aaveV3PoolAddressProvider,
    mockDexAddress,
    DAI_ADDRESS,
    USDC_ADDRESS,
  ];

  console.log(
    `Deploying FlashLoanArbiitrage with MockDex(${mockDexAddress})...`
  );

  const flashLoan = await deploy("FlashLoanArbitrage", {
    from: deployer,
    args: flashLoanArgs,
    log: true,
    waitConfirmations: networkConfig[chainId]?.blockConfirmations || 1,
  });

  console.log(`FlashLoanArbitrage dployed at ${flashLoan.address}!`);
  console.log("-------------------------------------------");

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(flashLoan.address, flashLoanArgs);
  }
};

export default deployFlashLoanArbitrage;
deployFlashLoanArbitrage.tags = ["all", "arbitrage"];
