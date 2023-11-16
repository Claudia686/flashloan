
const hre = require("hardhat")

async function main() {
    // Withdraws DAI 
    const withdrawDaiAmount = ethers.utils.parseEther("5")
    await LeveragedYieldFarm.withdrawDai(withdrawDaiAmount)
    console.log(`Withdraw ${withdrawDaiAmount} DAI from leveraged YieldFarm`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});