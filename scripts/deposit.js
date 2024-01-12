 hre = require("hardhat")
 const {
   ethers
 } = require('ethers');
 const ERC20 = require('@openzeppelin/contracts/build/contracts/ERC20.json')

 async function main() {
   let dai, uRouter, leveragedYieldFarmAddress

   const [deployer] = await hre.ethers.getSigners();
   const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
   const leveragedYieldFarm = "0x1c1521cf734CD13B02e8150951c3bF2B438be780"
   const UNISWAP_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"

   // Setup DAI contract...
   dai = new hre.ethers.Contract(daiAddress, ERC20.abi, deployer)

   // Swap ETH for DAI..Router contract 
   const UniswapV2Router02 = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json')
   uRouter = new hre.ethers.Contract(UNISWAP_ROUTER, UniswapV2Router02.abi, deployer);

   const ethBalanceBefore = await hre.ethers.provider.getBalance(deployer.address);
   console.log("ETH Balance Before swap:", ethers.formatEther(ethBalanceBefore));

   // Get DAI balance after the swap
   const daiBalanceBefore = await dai.balanceOf(leveragedYieldFarm);
   console.log("DAI Balance Before swap:", ethers.formatEther(daiBalanceBefore));

   const amountToSwap = ethers.parseUnits('1', 'ether');
   const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes

   const path = ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", daiAddress];
   const uniswapTransaction = await uRouter.swapExactETHForTokens(

     0,
     path,
     leveragedYieldFarm,
     deadline, {
       value: amountToSwap
     }
   );
   await uniswapTransaction.wait();

   const ethBalanceAfter = await hre.ethers.provider.getBalance(deployer.address);
   console.log("ETH Balance After swap:", ethers.formatEther(ethBalanceAfter));

   const daiBalanceAfter = await dai.balanceOf(leveragedYieldFarm);
   console.log("DAI Balance After swap:", ethers.formatEther(daiBalanceAfter))
   console.log("Swap complete!");
 }

 main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 })