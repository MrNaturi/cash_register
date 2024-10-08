let price = 1.87;
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
const denoms = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
]
const priceText = document.getElementById("price")
const purchaseBtn = document.getElementById("purchase-btn")
const changeDue = document.getElementById("change-due")
const changeDrawer = document.getElementById("change-drawer")

const cashList = () => {
  changeDrawer.innerHTML = '';
  cid.forEach(item => {
    const p = document.createElement("p")
    p.innerText = `${item[0]}: $${item[1].toFixed(2)}`
    changeDrawer.appendChild(p)
  });
}
cashList()
priceText.innerText = price;

const calcChange = () => {
  const inputVal = document.getElementById("cash").value;
  const cashAmount = parseFloat(inputVal);
  
  if (cashAmount < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cashAmount === price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
    return;
  } else {
    let calculatedChange = cashAmount - price;
    changeDue.innerText = `$${calculatedChange.toFixed(2)}`;
    
    const result = [];
    
    for (let i = denoms.length - 1; i >= 0; i--) {
      const denomName = denoms[i][0];
      const denomValue = denoms[i][1];
      
      while (calculatedChange >= denomValue) {
        result.push(`${denomName} = $${denomValue}`);
        calculatedChange -= denomValue;

      }
    }
    console.log(result);
    cashList()
  }
}

purchaseBtn.addEventListener("click", calcChange);
