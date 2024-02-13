 const config = require('../scripts/config.json');
 hre = require("hardhat")
 const {
   ethers
 } = require('ethers');
 const ERC20 = require('@openzeppelin/contracts/build/contracts/ERC20.json')

 async function main() {
   const [deployer] = await hre.ethers.getSigners();
   const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
   const leveragedYieldFarmAddress = "0x0B32a3F8f5b7E5d315b9E52E640a49A89d89c820";
   const cDAI = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643";
   const COMP = "0xc00e94Cb662C3520282E6f5717214004A7f26888";
   const comptrollerAddress = "0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B";
   const initialAmount = ethers.parseEther('1', 'ether');

   // Setup contracts...
   const dai = new ethers.Contract(daiAddress, ERC20.abi, deployer);
   const cDai = new ethers.Contract(cDAI, ERC20.abi, deployer);
   const compToken = new ethers.Contract(COMP, ERC20.abi, deployer);
   const comptroller = new ethers.Contract(comptrollerAddress, ERC20.abi, deployer);

   const leveragedYieldFarm = await new ethers.Contract(
     leveragedYieldFarmAddress,
     ['function withdrawDai(uint256 initialAmount) external returns(bool)',
      
     ],
     deployer
   );

   // Check balances before withdrawal
   const ethBalanceBefore = await hre.ethers.provider.getBalance(deployer.address)
   console.log("ETH Balance before:", ethers.formatEther(ethBalanceBefore));

   const daiBalanceBefore = await dai.balanceOf(leveragedYieldFarmAddress)
   console.log("DAI Balance before:", ethers.formatUnits(daiBalanceBefore, 18));

   const cDaiBalanceBefore = await cDai.balanceOf(leveragedYieldFarmAddress)
   console.log("cDai Balance before:", ethers.formatUnits(cDaiBalanceBefore, 8));

   // Get COMP balance before withdraw
   const compBalanceBefore = await compToken.balanceOf(deployer.address)
   console.log("Comp Balance before:", ethers.formatUnits(compBalanceBefore, 18));

   // Withdraw DAI 
   const withdrawTransaction = await leveragedYieldFarm.connect(deployer).withdrawDai(initialAmount)
   await withdrawTransaction.wait()

   // Check balances after withdrawal
   const ethBalanceAfter = await hre.ethers.provider.getBalance(deployer.address)
   console.log("ETH Balance after:", ethers.formatEther(ethBalanceAfter));

   const daiBalanceAfter = await dai.balanceOf(leveragedYieldFarmAddress)
   console.log("DAI Balance after:", ethers.formatUnits(daiBalanceAfter, 18));

   const cDaiBalanceAfter = await cDai.balanceOf(leveragedYieldFarmAddress)
   console.log("cDai Balance after:", ethers.formatUnits(cDaiBalanceAfter, 8));

   // Get COMP balance after withdraw
   const compBalanceAfter = await compToken.balanceOf(deployer.address)
   console.log("Comp Balance after:", ethers.formatUnits(compBalanceAfter, 18));
   console.log("Withdraw Successful!");
 }

 main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });