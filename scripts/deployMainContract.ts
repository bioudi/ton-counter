import { toNano } from '@ton/core';
import { MainContract } from '../wrappers/MainContract';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const mainContract = provider.open(MainContract.createFromConfig({}, await compile('MainContract')));

    await mainContract.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(mainContract.address);

    // run methods on `mainContract`
}