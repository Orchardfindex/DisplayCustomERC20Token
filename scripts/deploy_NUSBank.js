async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Bank = await ethers.getContractFactory("NUSBank");
  const bankContract = await Bank.deploy();

  await bankContract.whitelistToken(
    ethers.utils.formatBytes32String("NUSMoney"),
    "0x7186721d6C40ddefa4C8E151964b02a4D24E3131"
  );

  await bankContract.whitelistToken(
    ethers.utils.formatBytes32String("SUPER"),
    "0x0D0e65B78599Fac00e317F3154ebc5c9103E67c0"
  );

  console.log("NUS Central Bank address:", bankContract.address);
}

main().then(() =>
  process.exit(0).catch((error) => {
    console.error(error);
    process.exit(1);
  })
);
