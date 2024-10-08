let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const displayChangeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceScreen = document.getElementById('price-screen');
const cashDrawerDisplay = document.getElementById('change-drawer');

const formatResults = (status, change) => {
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
  change.map(
    money => (displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1].toFixed(2)}</p>`)
  );
};

const checkCashRegister = () => {
  const cashValue = Number(cash.value);

  if (cashValue < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = '';
    return;
  }

  if (cashValue === price) {
    displayChangeDue.innerHTML = '<p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }

  let changeDue = cashValue - price;
  let reversedCid = [...cid].reverse(); 
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let result = { status: 'OPEN', change: [] };
  let totalCID = parseFloat(cid.reduce((sum, item) => sum + item[1], 0).toFixed(2));

  if (totalCID === changeDue) {
    // Status closed, but only return the required change
    for (let i = 0; i < reversedCid.length; i++) {
      let coinName = reversedCid[i][0];
      let coinTotal = reversedCid[i][1];
      let coinValue = denominations[i];
      let amountToReturn = 0;

      while (changeDue >= coinValue && coinTotal > 0) {
        changeDue -= coinValue;
        coinTotal -= coinValue;
        amountToReturn += coinValue;
        changeDue = parseFloat(changeDue.toFixed(2)); 
      }

      if (amountToReturn > 0) {
        result.change.push([coinName, amountToReturn]);
      }
    }
    result.status = 'CLOSED';
    formatResults(result.status, result.change);
    updateUI(result.change);
    return;
  }

  if (totalCID < changeDue) {
    displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  for (let i = 0; i < reversedCid.length; i++) {
    let coinName = reversedCid[i][0];
    let coinTotal = reversedCid[i][1];
    let coinValue = denominations[i];
    let amountToReturn = 0;

    while (changeDue >= coinValue && coinTotal > 0) {
      changeDue -= coinValue;
      coinTotal -= coinValue;
      amountToReturn += coinValue;
      changeDue = parseFloat(changeDue.toFixed(2)); 
    }

    if (amountToReturn > 0) {
      result.change.push([coinName, amountToReturn]);
    }
  }

  if (changeDue > 0) {
    displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  formatResults(result.status, result.change);
  updateUI(result.change);
};

const checkResults = () => {
  if (!cash.value) {
    return;
  }
  checkCashRegister();
};

const updateUI = change => {
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    "ONE HUNDRED": 'Hundreds',
  };
  
  if (change) {
    change.forEach(changeArr => {
      const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
    });
  }

  cash.value = '';
  priceScreen.textContent = `Total: $${price}`;
  cashDrawerDisplay.innerHTML = `
    ${cid
      .map(money => `<p>${currencyNameMap[money[0]]}: $${money[1].toFixed(2)}</p>`)
      .join('')}  
  `;
};

purchaseBtn.addEventListener('click', checkResults);

cash.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults();
  }
});

updateUI();
