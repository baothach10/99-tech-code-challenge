const pricesUrl = "https://interview.switcheo.com/prices.json";
const tokenIconBase =
  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/";

let tokenPrices = {};

const fromToken = document.getElementById("fromToken");
const toToken = document.getElementById("toToken");
const fromAmount = document.getElementById("input-amount");
const toAmount = document.getElementById("output-amount");
const rateDisplay = document.getElementById("rateDisplay");
const swapDirection = document.getElementById("swapDirection");

const fromLogo = document.getElementById("fromLogo");
const toLogo = document.getElementById("toLogo");

const fromError = document.getElementById("fromError");
const toError = document.getElementById("toError");

async function loadTokens() {
  try {
    const res = await fetch(pricesUrl);
    const data = await res.json();
    tokenPrices = Object.fromEntries(
      data.map((t) => [t.currency, t.price]).filter(([_, p]) => p !== null)
    );

    const tokens = Object.keys(tokenPrices);

    tokens.forEach((token) => {
      const opt1 = document.createElement("option");
      opt1.value = token;
      opt1.textContent = token;
      fromToken.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = token;
      opt2.textContent = token;
      toToken.appendChild(opt2);
    });

    // defaults
    fromToken.value = "SWTH";
    toToken.value = "ETH";
    updateLogos();
  } catch (e) {
    alert("Failed to load token prices");
  }
}

function updateLogos() {
  fromLogo.src = `${tokenIconBase}${fromToken.value}.svg`;
  toLogo.src = `${tokenIconBase}${toToken.value}.svg`;
}

function calculate() {
  const from = fromToken.value;
  const to = toToken.value;
  const amount = parseFloat(fromAmount.value);

  fromError.textContent = "";
  toError.textContent = "";
  rateDisplay.textContent = "";

  if (!amount || amount <= 0) {
    fromError.textContent = "Enter a valid amount";
    toAmount.value = "";
    return;
  }

  if (from === to) {
    toError.textContent = "Cannot swap the same token";
    toAmount.value = "";
    return;
  }

  const fromPrice = tokenPrices[from];
  const toPrice = tokenPrices[to];

  if (!fromPrice || !toPrice) {
    toError.textContent = "Price not available for selected token";
    toAmount.value = "";
    return;
  }

  const result = (amount * fromPrice) / toPrice;
  toAmount.value = result.toFixed(6);

  const rate = (fromPrice / toPrice).toFixed(6);
  rateDisplay.textContent = `1 ${from} ≈ ${rate} ${to}`;
}

fromToken.addEventListener("change", () => {
  updateLogos();
  calculate();
});
toToken.addEventListener("change", () => {
  updateLogos();
  calculate();
});
fromAmount.addEventListener("input", calculate);
swapDirection.addEventListener("click", () => {
  const tmp = fromToken.value;
  fromToken.value = toToken.value;
  toToken.value = tmp;
  updateLogos();
  calculate();
});

loadTokens();
