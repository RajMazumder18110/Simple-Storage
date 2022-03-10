const SimpleStorage = artifacts.require("SimpleStorage")

contract('Simple Storage', () => {
    describe('Initializing', async () => {
        let simpleStorage;
        before(async () => {
            simpleStorage = await SimpleStorage.deployed();
        })

        it('Should not contain any invalid address', async () => {
            let address = await simpleStorage.address;
            assert(address !== '');
            assert(address !== undefined);
            assert(address !== '0x0');
            assert(address !== null);
        })

        it('Should contain `0` as initital value of `_store`', async () => {
            let value = await simpleStorage.getStoreValue();
            value = value.toNumber();
            assert(value === 0);
        })
    })

    describe('Set & get value', async () => {
        let simpleStorage;
        before(async () => {
            simpleStorage = await SimpleStorage.deployed();
        })

        it('Should set `_store` value to 10', async () => {
            await simpleStorage.setStoreValue(10);
            let value = await simpleStorage.getStoreValue();
            value = value.toNumber();
            assert(value === 10);
        })
    })
})