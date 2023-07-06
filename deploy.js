const hre = require("hardhat");

async function main() {
    const { abi } = require('../artifacts/contracts/Yul.yul/Yul.json');
    const { bytecode } = require('../artifacts/contracts/Yul.yul/Yul.json');

    const YulSmartContract = await hre.ethers.getContractFactory(abi, bytecode);
    const yulSmartContract = await YulSmartContract.deploy();
    await yulSmartContract.deployed();
    console.log(`Yul smart contract deployed at: ${yulSmartContract.address}`);

    const [signer, _] = await ethers.getSigners();
    const ethersYulSmartContract = new hre.ethers.Contract(
        yulSmartContract.address,
        [
            'function retrieve() public view returns (uint256)',
            'function store(uint256 newValue) public'
        ],
        signer
    );
    await ethersYulSmartContract.store(21);
    console.log('Congratulations! store(21) was executed successfully');

    const val = await ethersYulSmartContract.retrieve();
    console.log(`Congratulations! retrieve() was executed successfully and retrieved the value: ${val.toString()}`);

}

main();