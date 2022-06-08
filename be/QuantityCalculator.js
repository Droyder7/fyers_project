const placeOrder = (accountSize, entry, sl, percentOfRisk) => {

}

const calculateQuantity = (accountSize, entry, sl, percentageOfRisk) => {
    const riskCapital = Math.ceil(accountSize * percentageOfRisk * 0.01);
    const lossAmount = Math.abs(entry - sl);
    return Math.ceil(riskCapital / lossAmount);
}