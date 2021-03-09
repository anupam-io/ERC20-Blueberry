const myERC20 = artifacts.require("myERC20");

const inWei = 10**18;

contract('RFT', async addresses => {
	const [admin, buyer1, buyer2, _] = addresses;

	it.only('ERC20 is working.', async () => {
		const con = await myERC20.new("Blueberry", "BBR", admin);
		await con.name().then(data=>console.log("Name: ", data));
		await con.symbol().then(data=>console.log("Symbol: ", data));
		
        const initAmount = (100*inWei).toString();
        const sendAmount = (10*inWei).toString();
		const burnAmount = (80*inWei).toString();

        await con.mint(admin, initAmount, {from: admin});
		await con.balanceOf(admin).then(data=>console.log("Admin: ", (data/inWei).toString()))
        await con.totalSupply().then(data=>console.log("Total supply: ", (data/inWei).toString()));		
        
        await con.transfer(buyer1, sendAmount, {from: admin});
        await con.transfer(buyer2, sendAmount, {from: admin});
		await con.balanceOf(admin).then(data=>console.log("Admin: ", (data/inWei).toString()))
		await con.balanceOf(buyer1).then(data=>console.log("Buyer1: ", (data/inWei).toString()))
		await con.balanceOf(buyer2).then(data=>console.log("Buyer2: ", (data/inWei).toString()))
		
        await con.burn(admin, burnAmount, {from: admin});
		await con.balanceOf(admin).then(data=>console.log("Admin: ", (data/inWei).toString()))
		await con.totalSupply().then(data=>console.log("Total supply: ", (data/inWei).toString()));
    });
});