const hre = require("hardhat");

async function main() {
  const LoR = await hre.ethers.getContractFactory("LoR");
  const lor = await LoR.deploy();
  await lor.waitForDeployment(); 
  console.log(`Contract deployed to: ${lor.target}`); 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
