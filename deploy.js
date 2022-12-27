const ethers = require("ethers")
// const solc = require("solc")
const fs = require("fs-extra")

async function main() {
    // First, compile this!
    // And make sure to have your ganache network up!
    // Make sure to change the server in Ganache settings to reflect WSL, otherwise the network error will occur. 
    let provider = new ethers.providers.JsonRpcProvider("http://172.24.0.1:7545");
    let wallet = new ethers.Wallet("6bf7ee8bf2f2ed6187f3256cf6179b3dd302087e8423f581d27ebc4d78ccfdb2", provider);
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
    // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    //   encryptedJson,
    //   process.env.PRIVATE_KEY_PASSWORD
    // );
    // wallet = wallet.connect(provider);
    const abi = fs.readFileSync("./simplestorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync(
        "./simplestorage_sol_SimpleStorage.bin",
        "utf8"
    )
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })