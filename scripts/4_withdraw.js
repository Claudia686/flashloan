 hre = require("hardhat")
 const {
   ethers
 } = require('ethers');
 const ERC20 = require('@openzeppelin/contracts/build/contracts/ERC20.json')

const hre = require("hardhat")

async function main() {
    // Withdraws DAI 
    const withdrawDaiAmount = ethers.utils.parseEther("5")
    await LeveragedYieldFarm.withdrawDai(withdrawDaiAmount)
    console.log(`Withdraw ${withdrawDaiAmount} DAI from leveraged YieldFarm`)
  let dai

  const [deployer] = await hre.ethers.getSigners();
  const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  const leveragedYieldFarm = "0x1c1521cf734CD13B02e8150951c3bF2B438be780"

   // Setup DAI contract...
   dai = new hre.ethers.Contract(daiAddress, ERC20.abi, deployer)

  const ethBalanceBefore = await hre.ethers.provider.getBalance(deployer.address)
  console.log('ETH Balance before withdrawing', ethers.formatEther(ethBalanceBefore));

  const ContractBalanceBefore = await hre.ethers.provider.getBalance(leveragedYieldFarm);
  console.log('Contract Balance before withdrawing', ethers.formatEther(ContractBalanceBefore));

  const daiBalanceBefore = await dai.balanceOf(leveragedYieldFarm)
  console.log('Dai Balance before withdrawing', ethers.formatUnits(daiBalanceBefore));

  const initialAmount = ethers.parseEther('10', 'ether');
  const withdrawTransaction = await leveragedYieldFarm.withdrawDai(initialAmount)
  await withdrawTransaction.wait()
  console.log(`Withdraw Successful!`)

  const ethBalanceAfter = await hre.ethers.provider.getBalance(deployer.address);
  console.log('ETH Balance after withdrawing', ethers.formatEther(ethBalanceAfter));

  const contractBalanceAfter = await hre.ethers.provider.getBalance(leveragedYieldFarm);
  console.log('Contract Balance after withdrawing', ethers.formatEther(contractBalanceAfter));

  const daiBalanceAfter = await dai.balanceOf(leveragedYieldFarm)
  console.log('Dai Balance after withdrawing', ethers.formatUnits(daiBalanceAfter));
}

main().catch((error) => {