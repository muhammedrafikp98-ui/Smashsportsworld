/* ============================================================
   index.js  —  Homepage only
   Requires: main.js loaded first
   ============================================================ */

const products = [
  { brand:'Yonex',  name:'Astrox 88D Pro',    price:'₹12,799', old:'₹14,999', rating:92, badge:'sale' },
  { brand:'Yonex',  name:'Nanoflare 1000Z',   price:'₹18,499', old:null,      rating:95, badge:'new'  },
  { brand:'Li-Ning',name:'Axforce 90 Max',     price:'₹11,200', old:'₹13,000', rating:88, badge:'hot'  },
  { brand:'Victor', name:'Thruster K Falcon',  price:'₹9,800',  old:null,      rating:85, badge:null   },
  { brand:'Yonex',  name:'Arcsaber 11 Pro',    price:'₹15,999', old:null,      rating:91, badge:'new'  },
  { brand:'Carlton',name:'Vapour Trail 90',    price:'₹7,500',  old:'₹8,999',  rating:80, badge:'sale' },
  { brand:'Victor', name:'Auraspeed 100X',     price:'₹13,200', old:null,      rating:89, badge:null   },
  { brand:'Apacs',  name:'Ziggler Light 68',   price:'₹4,299',  old:'₹5,500',  rating:76, badge:'sale' },
];

function badgeHTML(b) {
  if (!b) return '';
  return `<span class="card-badge badge-${b}">${b}</span>`;
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = products.map(p => `
    <div class="product-card" onclick="window.location='product.html?id=1'">
      <div class="card-img">
        ${badgeHTML(p.badge)}
        <button class="card-wishlist" onclick="event.stopPropagation();wishlistItem('${p.name}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21C12 21 3 14 3 8a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 13-9 13z"/></svg>
        </button>
        <img src="images/products/racket.png" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:4px" alt="${p.name}">
        <div class="card-actions">
          <button class="card-add-btn" onclick="event.stopPropagation();addItem('${p.name}')">Add to cart</button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-price-row">
          <span class="card-price">${p.price}</span>
          ${p.old ? `<span class="card-price-old">${p.old}</span>` : ''}
        </div>
        <div class="card-rating">
          <div class="rating-bar"><div class="rating-fill" style="width:${p.rating}%"></div></div>
          <span class="rating-num">${(p.rating / 20).toFixed(1)}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function addItem(name) {
  addToCartCount();          /* from main.js */
  showToast(name + ' added to cart');
}

function wishlistItem(name) {
  showToast(name + ' saved to wishlist');
}

/* Init */
renderProducts();