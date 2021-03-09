const DAI = artifacts.require("DAI");

const inWei = 10**18;

contract('RFT', async addresses => {
	const [admin, buyer1, buyer2, _] = addresses;

	it.only('ERC20 is working.', async () => {
		const dai = await DAI.new("Blueberry", "BBR");
		await dai.name().then(data=>console.log("Name: ", data));
		await dai.symbol().then(data=>console.log("Symbol: ", data));
		
		await dai.mint(buyer1, (10*inWei).toString());
		await dai.mint(buyer2, (10*inWei).toString());
		
		await dai.balanceOf(buyer1).then(data=>console.log("Buyer1: ", (data/inWei).toString()))
		await dai.balanceOf(buyer2).then(data=>console.log("Buyer2: ", (data/inWei).toString()))

		await dai.totalSupply().then(data=>console.log("Supply: ", (data/inWei).toString()));
	});
});