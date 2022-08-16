//manual way

const { ethers } = require("hardhat");

async function main() {
  const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin");
  const transparentProxy = await ethers.getContract("Box_Proxy");

  const proxyBox1 = await ethers.getContractAt("Box", transparentProxy.address);
  const version1 = await proxyBox1.version();
  console.log("V1: ", version1);

  const boxV2 = await ethers.getContract("BoxV2");
  const upgradeTx = await boxProxyAdmin.upgrade(
    transparentProxy.address,
    boxV2.address
  );
  await upgradeTx.wait(1);

  const proxyBoxV2 = await ethers.getContractAt(
    "BoxV2",
    transparentProxy.address
  );
  const versionV2 = await proxyBoxV2.version();
  console.log("V2: ", versionV2);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
