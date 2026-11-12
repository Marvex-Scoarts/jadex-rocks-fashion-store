let cart = [];
const bagLink = document.querySelector('a[href="#bag"]');
const bagDrawer = document.getElementById('bagDrawer');
const bagOverlay = document.getElementById('bagOverlay');
const closeBag = document.getElementById('closeBag');
const bagItemsContainer = document.getElementById('bagItems');
const bagTotalEl = document.getElementById('bagTotal');
const addButtons = document.querySelectorAll('.add-btn');

function openDrawer(e) {
  if (e) e.preventDefault();
  bagDrawer.classList.add('open');
  bagOverlay.classList.add('open');
}

function closeDrawer() {
  bagDrawer.classList.remove('open');
  bagOverlay.classList.remove('open');
}

bagLink.addEventListener('click', openDrawer);
closeBag.addEventListener('click', closeDrawer);
bagOverlay.addEventListener('click', closeDrawer);

function renderBag() {
  bagLink.textContent = `Bag (${cart.length})`;
  if (cart.length === 0) {
    bagItemsContainer.innerHTML = '<p style="color:#7A7A7A; text-align:center; margin-top:2rem;">Your Jadex Rocks bag is empty.</p>';
    bagTotalEl.textContent = '$0';
    return;
  }

  let total = 0;
  bagItemsContainer.innerHTML = cart.map((item, index) => {
    total += item.price;
    return `
      <div class="bag-item">
        <div>
          <div class="bag-item-title">${item.name}</div>
          <div class="bag-item-price">$${item.price.toLocaleString()}</div>
        </div>
        <button class="remove-item" onclick="removeFromBag(${index})">Remove</button>
      </div>
    `;
  }).join('');

  bagTotalEl.textContent = `$${total.toLocaleString()}`;
}

window.removeFromBag = function(index) {
  cart.splice(index, 1);
  renderBag();
};

addButtons.forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const name = card.querySelector('h3').textContent;
    const priceText = card.querySelector('.price').textContent.replace(/[^0-9]/g, '');
    const price = parseInt(priceText, 10);

    cart.push({ name, price });
    renderBag();

    const originalText = button.textContent;
    button.textContent = 'Added ✓';
    button.style.backgroundColor = '#C5A059';
    button.style.borderColor = '#C5A059';
    button.style.color = '#111111';

    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = '';
      button.style.borderColor = '';
      button.style.color = '';
    }, 900);
  });
});
