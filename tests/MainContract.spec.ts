import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { MainContract } from '../wrappers/MainContract';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('MainContract', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('MainContract');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let mainContract: SandboxContract<MainContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        mainContract = blockchain.openContract(MainContract.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await mainContract.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: mainContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and mainContract are ready to use
    });
});
