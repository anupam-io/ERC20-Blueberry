const BBR = artifacts.require("Blueberry");

const inWei = 10**18;

contract('Blueberry token', async addresses => {
	const [admin, user1, user2, _] = addresses;

	it('has simple functionality.', async () => {
		const con = await BBR.new("Blueberry", "BBR", admin);
		await con.name().then(data=>console.log("Name: ", data));
		await con.symbol().then(data=>console.log("Symbol: ", data));
		
        const initAmount = (100*inWei).toString();
        const sendAmount = (10*inWei).toString();
		const burnAmount = (80*inWei).toString();

        await con.mint(admin, initAmount, {from: admin});
		await con.balanceOf(admin).then(data=>console.log("Admin: ", (data/inWei).toString()));
        await con.totalSupply().then(data=>console.log("Total supply: ", (data/inWei).toString()));		
        
        await con.transfer(user1, sendAmount, {from: admin});
        await con.transfer(user2, sendAmount, {from: admin});
		await con.balanceOf(admin).then(data=>console.log("Admin: ", (data/inWei).toString()));
		await con.balanceOf(user1).then(data=>console.log("Buyer1: ", (data/inWei).toString()));
		await con.balanceOf(user2).then(data=>console.log("Buyer2: ", (data/inWei).toString()));
		
        await con.burn(admin, burnAmount, {from: admin});
		await con.balanceOf(admin).then(data=>console.log("Admin: ", (data/inWei).toString()))
		await con.totalSupply().then(data=>console.log("Total supply: ", (data/inWei).toString()));
    });

	it('has a dual transaction conflict.', async()=>{
		const con = await BBR.new("Blueberry", "BBR", admin);
		await con.name().then(data=>console.log("Name: ", data));
		await con.symbol().then(data=>console.log("Symbol: ", data));
		
        const initAmount = (100*inWei).toString();
        const allowAmount = (100*inWei).toString();

        await con.mint(admin, initAmount, {from: admin});
		await con.balanceOf(admin).then(data=>console.log("Admin: ", (data/inWei).toString()));
        await con.totalSupply().then(data=>console.log("Total supply: ", (data/inWei).toString()));
		
		await con.approve(user1, allowAmount, {from: admin});
		await con.approve(user2, allowAmount, {from: admin});
		await con.transferFrom(admin, user1, allowAmount, {from: user1});
		try {
			await con.transferFrom(admin, user2, allowAmount, {from: user2});
		} catch (error) {
			console.log(error.reason);
		}
		
		await con.balanceOf(user1).then(data=>console.log("user1: ", (data/inWei).toString()));
		await con.balanceOf(user2).then(data=>console.log("user2: ", (data/inWei).toString()));		
	});
	
	it.only('only minter is allowed.', async()=>{
		const con = await BBR.new("Blueberry", "BBR", admin);	
        const initAmount = (100*inWei).toString();
        const transferAmount = (20*inWei).toString();
		
        await con.mint(admin, initAmount, {from: admin});
		await con.transfer(user1, transferAmount, {from: admin});
		
		try {
			await con.mint(user1, transferAmount, {from: user1});
			assert(false);
		} catch (error) {}
		try {
			await con.burn(user1, transferAmount, {from: user1});
			assert(false);
		} catch (error) {}
	});
});