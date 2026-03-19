function getRangeClass(n) {
  if (n <= 10) return 'range-1';
  if (n <= 20) return 'range-2';
  if (n <= 30) return 'range-3';
  if (n <= 40) return 'range-4';
  return 'range-5';
}

function pickNumbers() {
  const pool = Array.from({ length: 45 }, (_, i) => i + 1);
  const picked = [];
  while (picked.length < 7) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  const main = picked.slice(0, 6).sort((a, b) => a - b);
  const bonus = picked[6];
  return { main, bonus };
}

function revealBall(slotId, number, isBonus, delay) {
  setTimeout(() => {
    const slot = document.getElementById(slotId);
    slot.textContent = number;
    slot.classList.add('revealed', getRangeClass(number), 'pop');
    if (isBonus) slot.classList.add('bonus');
  }, delay);
}

function drawNumbers() {
  const btn = document.getElementById('btn-draw');
  btn.disabled = true;

  const { main, bonus } = pickNumbers();
  const totalDelay = main.length * 300 + 400;

  main.forEach((n, i) => revealBall(`slot-${i}`, n, false, i * 300));
  revealBall('slot-bonus', bonus, true, main.length * 300 + 300);

  setTimeout(() => {
    addHistory(main, bonus);
    btn.disabled = false;
  }, totalDelay);
}

function resetNumbers() {
  for (let i = 0; i < 6; i++) {
    const slot = document.getElementById(`slot-${i}`);
    slot.textContent = '?';
    slot.className = 'ball-slot';
  }
  const bonusSlot = document.getElementById('slot-bonus');
  bonusSlot.textContent = '?';
  bonusSlot.className = 'ball-slot bonus';
}

function addHistory(main, bonus) {
  const historySection = document.getElementById('history-section');
  const historyList = document.getElementById('history-list');

  historySection.style.display = 'block';

  const li = document.createElement('li');
  li.className = 'history-item';

  main.forEach(n => {
    const span = document.createElement('span');
    span.className = `h-num ${getRangeClass(n)}`;
    span.textContent = n;
    li.appendChild(span);
  });

  const plus = document.createElement('span');
  plus.className = 'h-plus';
  plus.textContent = '+';
  li.appendChild(plus);

  const bonusSpan = document.createElement('span');
  bonusSpan.className = `h-num h-bonus ${getRangeClass(bonus)}`;
  bonusSpan.textContent = bonus;
  li.appendChild(bonusSpan);

  historyList.prepend(li);
}
