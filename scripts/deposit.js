const hre = require("hardhat")

async function main() {
// Deposits DAI into Leveraged Yield Farm
  const depositDaiAmount = ethers.utils.parseEther("10")
  await LeveragedYieldFarm.depositDai(depositDaiAmount)
  console.log(`Deposited ${depositDaiAmount} DAI to leveraged YieldFarm`);
  
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


