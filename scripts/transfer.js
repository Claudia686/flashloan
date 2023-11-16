const hre = require("hardhat")

async function main() {
  // Execute flash loan
  await flashLoanTemplate.getFlashloan(flashLoanTemplate.DAI, transferDaiAmount)
  console.log(`Flash loan executed: ${getFlashloan}`)

  // Transfer DAI to LeveragedYieldFarm
  const transferDaiAmount = ethers.utils.parseEther("4")
  await LeveragedYieldFarm.transfer(LeveragedYieldFarm.address, transferDaiAmount)
  console.log(`Transfer: ${transferDaiAmount} DAI to leveraged YieldFarm`)

  // Repay flash loan
  await flashLoanTemplate.repayFlashLoan(flashLoanTemplate.DAI)
  console.log(`Flash loan repaid`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

