// app.js
const form = document.getElementById('tip-form');
const billEl = document.getElementById('bill');
const percentEl = document.getElementById('percent');
const peopleEl = document.getElementById('people');
const currencyEl = document.getElementById('currency');

const statusEl = document.getElementById('status');
const tipPerPersonEl = document.getElementById('tipPerPerson');
const totalPerPersonEl = document.getElementById('totalPerPerson');
const summaryEl = document.getElementById('summary');

function fmtCurrency(value, code) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }).format(value);
  } catch {
    return value.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  }
}

function setStatus(msg, cls = '') {
  statusEl.textContent = msg;
  statusEl.className = cls;
}

function parsePositive(el) {
  const v = parseFloat(el.value);
  return Number.isFinite(v) ? v : NaN;
}

function update() {
  if (!form.checkValidity()) {
    setStatus('Enter valid numbers (bill ≥ 0, percent 0–100, people ≥ 1).', 'error');
    tipPerPersonEl.textContent = '—';
    totalPerPersonEl.textContent = '—';
    summaryEl.textContent = 'Fix inputs to see the split.';
    return;
  }

  const bill = parsePositive(billEl);
  const pct = parsePositive(percentEl);
  const people = parsePositive(peopleEl);
  const code = currencyEl.value;

  if (!(bill >= 0) || !(pct >= 0 && pct <= 100) || !(people >= 1)) {
    setStatus('Enter valid numbers (bill ≥ 0, percent 0–100, people ≥ 1).', 'error');
    tipPerPersonEl.textContent = '—';
    totalPerPersonEl.textContent = '—';
    summaryEl.textContent = 'Fix inputs to see the split.';
    return;
  }

  const tip = bill * (pct / 100);
  const total = bill + tip;
  const tipPer = tip / people;
  const totalPer = total / people;

  tipPerPersonEl.textContent = fmtCurrency(tipPer, code);
  totalPerPersonEl.textContent = fmtCurrency(totalPer, code);
  summaryEl.textContent = `Bill ${fmtCurrency(bill, code)} + ${pct}% tip split among ${people} people.`;
  setStatus('Calculated.', 'ok');
}

form.addEventListener('input', update);
currencyEl.addEventListener('change', update);
update();
