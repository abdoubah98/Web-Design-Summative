const products = [
  { id:'ps5-slim', name:'PlayStation 5 Slim Console', price:449.99, category:'Consoles', badge:'Best seller', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Playstation%205%20mod%C3%A8le%20slim%20%28%C3%A9dition%20standard%20avec%20lecteur%20de%20disque%20amovible.png', description:'PS5 Slim disc console with fast SSD storage and immersive gaming.' },
  { id:'ps5-bundle', name:'PlayStation 5 Slim Starter Bundle', price:499.99, category:'Bundles', badge:'Bundle', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Playstation%205%20mod%C3%A8le%20slim%20%28%C3%A9dition%20standard%20avec%20lecteur%20de%20disque%20amovible.png', description:'A PS5 Slim console bundle prepared for a complete starter setup.' },
  { id:'xbox-series-x', name:'Xbox Series X Console', price:479.99, category:'Consoles', badge:'Popular', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Xbox%20series%20X%20%2850648118708%29.jpg', description:'Powerful Xbox console with fast loading and high-resolution gaming.' },
  { id:'switch-oled', name:'Nintendo Switch OLED', price:299.99, category:'Consoles', badge:'Portable', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Nintendo-Switch-OLED-Docked.jpg', description:'Hybrid Nintendo console with a bright OLED display and TV dock.' },
  { id:'switch-bundle', name:'Nintendo Switch OLED Family Bundle', price:339.99, category:'Bundles', badge:'Bundle', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Nintendo-Switch-OLED-Docked.jpg', description:'Nintendo Switch OLED bundle for portable and living-room play.' },
  { id:'dualsense-white', name:'PlayStation DualSense Controller', price:59.99, category:'Controllers', badge:'Official style', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Playstation%20DualSense%20Controller.png', description:'White wireless PlayStation controller with adaptive triggers.' },
  { id:'dualsense-black', name:'DualSense Midnight Black Controller', price:64.99, category:'Controllers', badge:'New colour', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Black%20dualsense%20controller%20microtexture.jpg', description:'Midnight black DualSense controller for PlayStation 5.' },
  { id:'xbox-controller', name:'Xbox Wireless Controller', price:54.99, category:'Controllers', badge:'PC compatible', image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Microsoft-Xbox-One-controller.jpg', description:'Wireless Xbox-style controller suitable for console and PC gaming.' },
  { id:'gaming-headset', name:'Over-Ear Gaming Headset', price:89.99, category:'Audio', badge:'Clear chat', image:'https://images.unsplash.com/photo-1679429973860-d430a100db8c?auto=format&fit=crop&w=1200&q=82', description:'Over-ear gaming headset with a microphone for team communication.' },
  { id:'gaming-keyboard', name:'RGB Mechanical Gaming Keyboard', price:79.99, category:'PC Gaming', badge:'RGB', image:'https://images.unsplash.com/photo-1636487658596-daa25387d112?auto=format&fit=crop&w=1200&q=82', description:'Full-size gaming keyboard with mechanical-style keys and lighting.' },
  { id:'gaming-mouse', name:'Adjustable-DPI Gaming Mouse', price:49.99, category:'PC Gaming', badge:'Precision', image:'https://images.unsplash.com/photo-1554876194-024e06bbc3cf?auto=format&fit=crop&w=1200&q=82', description:'Ergonomic gaming mouse with adjustable sensitivity settings.' },
  { id:'spiderman-figure', name:'Spider-Man Gaming Collectible', price:34.99, category:'Collectibles', badge:'Collector pick', image:'https://images.unsplash.com/photo-1761295908868-a222bbeff6b1?auto=format&fit=crop&w=1200&q=82', description:'A Spider-Man display collectible for a gaming desk or shelf.' }
];

function getCart(){ return JSON.parse(localStorage.getItem('gamezoneCart')) || []; }
function saveCart(cart){ localStorage.setItem('gamezoneCart', JSON.stringify(cart)); updateCartCount(); }
function formatPrice(amount){ return `£${amount.toFixed(2)}`; }
function updateCartCount(){ const count=getCart().reduce((sum,item)=>sum+item.quantity,0); document.querySelectorAll('#cart-count').forEach(el=>el.textContent=count); }

function showToast(message){
  let toast=document.getElementById('toast');
  if(!toast){ toast=document.createElement('div'); toast.id='toast'; toast.className='toast'; toast.setAttribute('role','status'); document.body.appendChild(toast); }
  toast.textContent=message; toast.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>toast.classList.remove('show'),2200);
}

function createProductCard(product){
  const card=document.createElement('article'); card.className='product-card';
  card.innerHTML=`<div class="image-wrap"><span class="badge">${product.badge}</span><img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='media/images/${product.id}.svg'"></div><div class="product-info"><p class="category">${product.category}</p><h3>${product.name}</h3><p>${product.description}</p><strong>${formatPrice(product.price)}</strong><div class="card-actions"><button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button><button class="link-btn view-detail" data-id="${product.id}">View details</button></div></div>`;
  return card;
}
function renderProducts(list,targetId,limit){ const target=document.getElementById(targetId); if(!target)return; target.innerHTML=''; const items=limit?list.slice(0,limit):list; if(!items.length){target.innerHTML='<p class="empty-state">No products match your search.</p>';return;} items.forEach(p=>target.appendChild(createProductCard(p))); }
function addToCart(id){ const product=products.find(p=>p.id===id); if(!product)return; const cart=getCart(); const existing=cart.find(i=>i.id===id); existing?existing.quantity++:cart.push({id:product.id,name:product.name,price:product.price,image:product.image,quantity:1}); saveCart(cart); showToast(`${product.name} added to cart`); }
function showProductDetail(id){ const p=products.find(x=>x.id===id),panel=document.getElementById('product-detail'); if(!p||!panel)return; panel.innerHTML=`<img src="${p.image}" alt="${p.name}"><div><p class="category">${p.category}</p><h2>${p.name}</h2><p>${p.description}</p><strong>${formatPrice(p.price)}</strong><br><button class="btn add-to-cart" data-id="${p.id}">Add to Cart</button></div>`; panel.scrollIntoView({behavior:'smooth',block:'center'}); }
function renderCart(){ const c=document.getElementById('cart-items'),t=document.getElementById('cart-total'); if(!c||!t)return; const cart=getCart(); c.innerHTML=''; if(!cart.length){c.innerHTML='<p class="empty-cart">Your cart is empty. Add some gaming products first.</p>';t.textContent=formatPrice(0);return;} let total=0; cart.forEach(item=>{total+=item.price*item.quantity; const row=document.createElement('article');row.className='cart-item';row.innerHTML=`<img src="${item.image}" alt="${item.name}"><div><h3>${item.name}</h3><p>${formatPrice(item.price)} each</p></div><div class="quantity-controls"><button data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-action="increase" data-id="${item.id}" aria-label="Increase quantity">+</button></div><strong>${formatPrice(item.price*item.quantity)}</strong><button class="remove-btn" data-action="remove" data-id="${item.id}">Remove</button>`;c.appendChild(row);});t.textContent=formatPrice(total); }
function updateCartItem(id,action){ let cart=getCart();const item=cart.find(i=>i.id===id);if(!item)return;if(action==='increase')item.quantity++;if(action==='decrease')item.quantity--;if(action==='remove'||item.quantity<1)cart=cart.filter(i=>i.id!==id);saveCart(cart);renderCart(); }
function setupContactForm(){const form=document.getElementById('contact-form');if(!form)return;form.addEventListener('submit',e=>{e.preventDefault();let valid=true;form.querySelectorAll('input,textarea').forEach(field=>{const err=field.parentElement.querySelector('.error-message');err.textContent='';if(!field.checkValidity()){valid=false;err.textContent=field.type==='email'?'Please enter a valid email address.':'Please complete this field correctly.';}});document.getElementById('form-success').textContent=valid?'Thank you. Your form has passed validation.':'';});}
function applyFilters(){const category=document.getElementById('category-filter')?.value||'all';const term=(document.getElementById('product-search')?.value||'').toLowerCase().trim();const filtered=products.filter(p=>(category==='all'||p.category===category)&&(`${p.name} ${p.description} ${p.category}`.toLowerCase().includes(term)));renderProducts(filtered,'product-list');}
document.addEventListener('click',e=>{const add=e.target.closest('.add-to-cart'),detail=e.target.closest('.view-detail'),action=e.target.closest('[data-action]');if(add)addToCart(add.dataset.id);if(detail)showProductDetail(detail.dataset.id);if(action)updateCartItem(action.dataset.id,action.dataset.action);});
document.getElementById('category-filter')?.addEventListener('change',applyFilters);document.getElementById('product-search')?.addEventListener('input',applyFilters);
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.main-nav');menu?.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'));});
renderProducts(products,'featured-products',4);renderProducts(products,'product-list');renderCart();setupContactForm();updateCartCount();


function renderCheckout(){
  const itemsContainer=document.getElementById('checkout-items');
  const subtotalElement=document.getElementById('checkout-subtotal');
  const totalElement=document.getElementById('checkout-total');
  const form=document.getElementById('checkout-form');
  const placeOrderButton=document.getElementById('place-order-button');
  if(!itemsContainer||!subtotalElement||!totalElement)return;
  const cart=getCart();
  itemsContainer.innerHTML='';
  if(!cart.length){
    itemsContainer.innerHTML='<p class="empty-cart">Your cart is empty. Add products before checking out.</p>';
    subtotalElement.textContent=formatPrice(0);
    totalElement.textContent=formatPrice(0);
    if(placeOrderButton)placeOrderButton.disabled=true;
    if(form)form.querySelectorAll('input').forEach(input=>input.disabled=true);
    return;
  }
  let subtotal=0;
  cart.forEach(item=>{
    subtotal+=item.price*item.quantity;
    const row=document.createElement('div');
    row.className='checkout-summary-item';
    row.innerHTML=`<img src="${item.image}" alt=""><div><h3>${item.name}</h3><p>Quantity: ${item.quantity}</p></div><strong>${formatPrice(item.price*item.quantity)}</strong>`;
    itemsContainer.appendChild(row);
  });
  subtotalElement.textContent=formatPrice(subtotal);
  totalElement.textContent=formatPrice(subtotal);
}

function fieldErrorMessage(field){
  if(field.validity.valueMissing)return 'Please complete this field.';
  if(field.type==='email'&&field.validity.typeMismatch)return 'Please enter a valid email address.';
  if(field.name==='postcode'&&field.validity.patternMismatch)return 'Please enter a valid UK-style postcode.';
  if(field.name==='cardNumber'&&field.validity.patternMismatch)return 'Enter a 16-digit demo card number.';
  if(field.name==='expiry'&&field.validity.patternMismatch)return 'Use the format MM/YY.';
  if(field.name==='cvv'&&field.validity.patternMismatch)return 'Enter a 3 or 4 digit security code.';
  if(field.validity.tooShort)return `Please enter at least ${field.minLength} characters.`;
  return 'Please check this field.';
}

function setupCheckoutForm(){
  const form=document.getElementById('checkout-form');
  if(!form)return;
  const cardNumber=document.getElementById('card-number');
  const expiry=document.getElementById('expiry');
  cardNumber?.addEventListener('input',()=>{
    const digits=cardNumber.value.replace(/\D/g,'').slice(0,16);
    cardNumber.value=digits.replace(/(.{4})/g,'$1 ').trim();
  });
  expiry?.addEventListener('input',()=>{
    const digits=expiry.value.replace(/\D/g,'').slice(0,4);
    expiry.value=digits.length>2?`${digits.slice(0,2)}/${digits.slice(2)}`:digits;
  });
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const cart=getCart();
    if(!cart.length)return;
    let valid=true;
    form.querySelectorAll('input').forEach(field=>{
      const error=field.parentElement.querySelector('.error-message');
      if(error)error.textContent='';
      if(!field.checkValidity()){
        valid=false;
        if(error)error.textContent=fieldErrorMessage(field);
      }
    });
    if(!valid){
      form.querySelector(':invalid')?.focus();
      return;
    }
    const orderNumber=`GZ-${Date.now().toString().slice(-8)}`;
    localStorage.removeItem('gamezoneCart');
    updateCartCount();
    form.innerHTML=`<div class="order-confirmation"><h2>Order placed successfully</h2><p>Thank you, ${document.getElementById('first-name')?.value||'customer'}.</p><p>Your demo order number is <strong>${orderNumber}</strong>.</p><p>No real payment has been taken because this is a front-end coursework demonstration.</p><a class="btn" href="products.html">Continue shopping</a></div>`;
    const summary=document.querySelector('.checkout-summary');
    if(summary)summary.innerHTML='<h2>Order complete</h2><p>Your cart has been cleared.</p>';
  });
}

function updateCheckoutButton(){
  const button=document.getElementById('checkout-button');
  if(!button)return;
  if(getCart().length===0){
    button.classList.add('disabled-link');
    button.setAttribute('aria-disabled','true');
    button.addEventListener('click',event=>event.preventDefault());
  }
}

renderCheckout();
setupCheckoutForm();
updateCheckoutButton();
