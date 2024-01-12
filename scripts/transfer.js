const hre = require("hardhat")
const ERC20 = require('@openzeppelin/contracts/build/contracts/ERC20.json')

async function main() {
  let dai, deployer

  [deployer] = await hre.ethers.getSigners()
  const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  const leveragedYieldFarm = "0x1c1521cf734CD13B02e8150951c3bF2B438be780"

  // Setup DAI contract...
  dai = new hre.ethers.Contract(daiAddress, ERC20.abi, deployer)

  let transaction = await dai.connect(deployer).transfer(
    leveragedYieldFarm,
    hre.ethers.parseUnits('1.0', 'ether')
)
  await transaction.wait()
  
  // Transfer DAI to leveragedYieldFarm
  const transferTransaction = await dai.connect(deployer).transfer(
    leveragedYieldFarm,
    hre.ethers.parseUnits('1.0', 'ether')
  )
  await transferTransaction.wait()

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});