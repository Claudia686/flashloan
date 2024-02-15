# Leveraged Yield Farm using Flash Loans
Make use of a Flash loan from Balancer to earn more from Compound. 

## Technology Stack & Tools
- [Solidity](https://docs.soliditylang.org/en/v0.8.17/) (Writing Smart Contracts)
- Javascript (Testing)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Alchemy](https://www.alchemy.com/) (Blockchain Connection)
- [Metamask](https://metamask.io/) (Account Management)
- [Compound Protocol](https://app.compound.finance/) (Supply or Borrow Tokens and Earn cTokens)
- [Balancer](https://docs.balancer.fi/guides/arbitrageurs/flash-loans.html) (Flash Loan Provider)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/). We recommend using the latest LTS (Long-Term-Support) version, and preferably installing NodeJS via [NVM](https://github.com/nvm-sh/nvm#intro).
- Create an [Alchemy](https://www.alchemy.com/) account, you'll need to create an app for the Ethereum chain, on the mainnet network

## Setting Up
### 1. Clone/Download the Repository
Make sure to enter the project directory before attempting to run the project related commands:
`cd flashloan_masterclass_hardhat`

If the directory doesn't exist, you can execute `pwd` to find out your current path, and `ls` to see the files and folders available to you.

### 2. Install Dependencies:
`npm install`

### 3. Create and Setup .env
Before running any scripts, you'll want to create a .env file with the following values (see .env.example):

- **ALCHEMY_API_KEY=""**

### 4. Run tests:
`npx hardhat test`

## Other Notes
### Uses of Flash loans
  * Arbitrage - use the vast funds to make profits from price discrepencies e.g on Exchange.
    - [Example of our Trading Bot Masterclass](https://dappuniversity.teachable.com/courses/940808/lectures/24527435)
  * Leverage - increase exposure e.g earn more with Yield Farming on protocols like Compound.
  
### Other Flashloan Providers 
  * [DODO](https://docs.dodoex.io/english/contracts/dodo-v1-v2/guides/flash-loan)
    - Example of using a DODO Flash Loan can be found inside of BMU's [video vault](https://dappuniversity.teachable.com/courses/blockchain-mastery-university/lectures/39147770)
  * [Uniswap V2 Flashswaps](https://docs.uniswap.org/protocol/V2/concepts/core-concepts/flash-swaps)
    - Example Uniswap FlashSwap can be [found here](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/examples/ExampleFlashSwap.sol)
  * [Aave Flashloan](https://docs.aave.com/developers/guides/flash-loans)
  * [Kollateral](https://www.kollateral.co/) - A liquidity aggregator 

  // Swap script
  ### Leveraged Yield Farming Swap Script
   * The script facilitates the swap of Ethereum (ETH) for DAI on Uniswap, using a flash loan to enhance leveraged yield farming on the Compound protocol.

  ## Technology Stack & Tools
  - [Solidity](https://docs.soliditylang.org/en/v0.8.17/) (Writing Smart Contracts)
  - [Hardhat](https://hardhat.org/) (Development Framework)
  - [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
  - [Uniswap V2 Router](https://docs.uniswap.org/protocol/V2/concepts/core-concepts/swap) (Swap Execution)
  - [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts) (ERC20 Standard Implementation)
  ## 1. Run swap script
    `npx hardhat node`
    `npx hardhat run scripts/1_deploy.js --network localhost`
    `npx hardhat run scripts/2_swap.js --network localhost`

  ## 2. Expected Results
   - ETH Balance before swap
   - DAI Balance before swap
   - ETH Balance after swap
   - DAI Balance after swap
   * These results will be logged to the console, indicating the completion of the swap process.

  ## 3. Understanding the Script
   1. **Initialization:** variables and contract addresses are set up
   2. **Setup Contracts:** vontracts for DAI, Uniswap V2 Router
   3. **Balance Retrieval:** ETH and DAI balances are retrieved before the swap
   4. **Uniswap Transaction:** transaction is executed 
   5. **Wait for Confirmation:** the script waits for transaction to be confirmed
   6. **Balance Update:** ETH and DAI balances are updated after the swap

 // Deposit script
  ### Leveraged Yield Farming Deposit Script
    * The script automates the deposit of DAI into a leveraged yield farming contract.

  ## 1. Run Deposit Script
     `npx hardhat node`
     `npx hardhat run scripts/1_deploy.js --network localhost`
     `npx hardhat run scripts/2_swap.js --network localhost`
     `npx hardhat run scripts/3_deposit.js --network localhost`

  ## 2. Expected Results:
   - DAI Balance before deposit
   - cDAI Balance before deposit
   - DAI Balance after deposit
   - cDAI Balance after deposit
   * These results will be logged to the console, indicating the completion of the deposit.

   ## 3. Understanding the Script
    1. **Initialization:** variables and contract addresses are set up.
    2. **Setup Contracts:** contracts for DAI, cDAI, and the leveraged yield farm are  initialized.
    3. **Balance Retrieval:** DAI and cDAI balances are retrieved before the deposit.
    4. **Deposit Transaction:** DAI is deposited into the leveraged yield farming contract.
    5. **Wait for Confirmation:** the script waits for the deposit transaction to be confirmed.
    6. **Balance Update:** DAI and cDAI balances are updated after the deposit.

    // Withdraw script
  ### The script sets up contract addresses for DAI, cDAI, the leveraged    yield farming contract, and COMP token.
    * It also specifies the initial withdrawal amount in DAI.

  ## 1. Run Withdraw Script
     `npx hardhat node`
     `npx hardhat run scripts/1_deploy.js --network localhost`
     `npx hardhat run scripts/2_swap.js --network localhost`
     `npx hardhat run scripts/3_deposit.js --network localhost`
     `npx hardhat run scripts/4_withdraw.js --network localhost`

  ## 2. Expected Results:
   - ETH Balance before withdrawal 
   - DAI Balance before withdrawal 
   - cDAI Balance before withdrawal 
   - COMP Balance before withdrawal 
   - ETH Balance after withdrawal 
   - DAI Balance after withdrawal 
   - cDAI Balance after withdrawal 
   - COMP Balance after withdrawal 
   * These results will be logged to the console, indicating the completion of the withdraw.

  ## 3. Understanding the Script
   1. **Initialization:** Key contract addresses such as DAI, cDAI, COMP, and the leveraged yield farming contract are defined
   2. **Setup Contracts:** Instances of ERC20 contracts for DAI, cDAI, and COMP are created using their respective addresses and ABI (Application Binary Interface).
   3. **Balance Retrieval:** ETH, DAI, cDAI and COMP balances are retrieved before the withdraw.
   4. **Witdrawal Transaction:** The script initiates a withdrawal transaction by calling the withdrawDai function on the leveraged yield farming contract with the specified initial amount of DAI.
   5. **Wait for Confirmation:** the script waits for the withdrawal  transaction to be confirmed.
   6. **Balance Update:** ETH, DAI, cDAI and COMP balances are updated after the withdrawal.

