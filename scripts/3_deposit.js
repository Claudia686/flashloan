const config = require('../scripts/config.json');
hre = require("hardhat");
const {
  ethers
} = require("ethers");

const ERC20 = require("@openzeppelin/contracts/build/contracts/ERC20.json")
async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const cDAI = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643";
  const leveragedYieldFarmAddress = config["31337"].leveragedYieldFarmAddress.address;
  const initialAmount = ethers.parseEther('1', 'ether');

  // Setup contracts...
  const dai = new ethers.Contract(daiAddress, ERC20.abi, deployer);
  const cDai = new ethers.Contract(cDAI, ERC20.abi, deployer);

  const leveragedYieldFarm = await new ethers.Contract(
    leveragedYieldFarmAddress,
    ['function depositDai(uint256 initialAmount) external returns(bool)',
     ],
    deployer
    );

  const daiBalanceBefore = await dai.balanceOf(leveragedYieldFarmAddress);
  console.log("DAI Balance before:", ethers.formatUnits(daiBalanceBefore, 18));

  const cDaiBalanceBefore = await cDai.balanceOf(leveragedYieldFarmAddress);
  console.log("cDai Balance before:", ethers.formatUnits(cDaiBalanceBefore, 8));

  const depositTransaction = await leveragedYieldFarm.depositDai(initialAmount);
  await depositTransaction.wait();

  const daiBalanceAfter = await dai.balanceOf(leveragedYieldFarmAddress);
  console.log("DAI Balance after:", ethers.formatUnits(daiBalanceAfter, 18));

  const cDaiBalanceAfter = await cDai.balanceOf(leveragedYieldFarmAddress);
  console.log("cDai Balance after:", ethers.formatUnits(cDaiBalanceAfter, 8));
  console.log("Deposit complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
})