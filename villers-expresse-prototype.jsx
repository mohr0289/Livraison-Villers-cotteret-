import React, { useState, useEffect, useRef } from "react";

/**
 * VILLERS EXPRESSE — Prototype client (4 écrans)
 * Direction: plaque émaillée de village française — bleu nuit profond,
 * crème, filet or gravé. Coins légèrement arrondis façon plaque en tôle,
 * typographie display gravée pour les titres, sans-serif sobre pour le reste.
 */

// ---------- Design tokens ----------
const COLORS = {
  navy: "#152036",
  navyDeep: "#0D1526",
  cream: "#F3ECD8",
  creamSoft: "#EAE1C7",
  gold: "#C6A15B",
  goldBright: "#DDBB74",
  brick: "#9B3A2E",
  ink: "#0F1626",
};

const FONT_DISPLAY = "'Fraunces', 'Georgia', serif";
const FONT_BODY = "'Work Sans', 'Segoe UI', sans-serif";

// ---------- Données de démo ----------
const SHOPS = [
  {
    id: "resto-1",
    name: "Le Petit Villersois",
    category: "Restaurant",
    tag: "Cuisine française",
    time: "25–35 min",
    icon: "🍽️",
    products: [
      { id: "p1", name: "Menu du terroir", price: 18.5, desc: "Entrée, plat, dessert du jour" },
      { id: "p2", name: "Blanquette de veau", price: 14.9, desc: "Servie avec riz créole" },
      { id: "p3", name: "Tarte tatin", price: 6.5, desc: "Pomme caramélisée, maison" },
    ],
  },
  {
    id: "pharma-1",
    name: "Pharmacie Château",
    category: "Pharmacie",
    tag: "Ouvert · Livraison sur ordonnance",
    time: "15–20 min",
    icon: "➕",
    products: [
      { id: "p4", name: "Doliprane 1000mg", price: 2.4, desc: "Boîte de 8 comprimés" },
      { id: "p5", name: "Kit premiers secours", price: 12.0, desc: "Pansements, désinfectant" },
      { id: "p6", name: "Vitamine C", price: 5.9, desc: "Cure 30 jours" },
    ],
  },
  {
    id: "epicerie-1",
    name: "Épicerie de la Forêt",
    category: "Épicerie",
    tag: "Produits frais & locaux",
    time: "20–30 min",
    icon: "🧺",
    products: [
      { id: "p7", name: "Panier de saison", price: 15.0, desc: "Légumes du producteur" },
      { id: "p8", name: "Pain de campagne", price: 3.2, desc: "Cuit ce matin" },
      { id: "p9", name: "Fromage de l'Aisne", price: 7.8, desc: "Sélection affinée" },
    ],
  },
  {
    id: "cave-1",
    name: "Cave des Remparts",
    category: "Vins & Spiritueux",
    tag: "18+ · Vérification à la livraison",
    time: "20–25 min",
    icon: "🍷",
    products: [
      { id: "p10", name: "Côtes-de-Blaye 2021", price: 11.5, desc: "Bouteille 75cl" },
      { id: "p11", name: "Champagne brut", price: 24.0, desc: "Maison régionale" },
      { id: "p12", name: "Bière artisanale ×6", price: 13.0, desc: "Brasserie locale" },
    ],
  },
];

const TRACKING_STEPS = [
  { key: "confirmed", label: "Commande confirmée", detail: "Le commerçant a reçu votre commande" },
  { key: "prepared", label: "En préparation", detail: "Votre commande est en cours de préparation" },
  { key: "picked", label: "Récupérée par le livreur", detail: "En route à vélo électrique" },
  { key: "delivered", label: "Livrée", detail: "Bon appétit !" },
];

// ---------- Composants utilitaires ----------

function PlaqueHeader({ eyebrow, title, onBack, right }) {
  return (
    <div style={styles.header}>
      <div style={styles.headerRow}>
        {onBack ? (
          <button onClick={onBack} style={styles.backBtn} aria-label="Retour">
            ←
          </button>
        ) : (
          <div style={{ width: 34 }} />
        )}
        <div style={{ flex: 1, textAlign: "center" }}>
          {eyebrow && <div style={styles.eyebrow}>{eyebrow}</div>}
          <div style={styles.headerTitle}>{title}</div>
        </div>
        <div style={{ width: 34, display: "flex", justifyContent: "flex-end" }}>{right}</div>
      </div>
      <div style={styles.plaqueRule} />
    </div>
  );
}

function CartBadge({ count, onClick }) {
  if (!count) return null;
  return (
    <button onClick={onClick} style={styles.cartFab} aria-label="Voir le panier">
      <span style={{ fontSize: 18 }}>🧺</span>
      <span style={styles.cartFabCount}>{count}</span>
    </button>
  );
}

// ---------- Écran 1 : Accueil ----------
function HomeScreen({ onOpenShop, cartCount, onOpenCart }) {
  const [filter, setFilter] = useState("Tous");
  const categories = ["Tous", "Restaurant", "Pharmacie", "Épicerie", "Vins & Spiritueux"];
  const filtered = filter === "Tous" ? SHOPS : SHOPS.filter((s) => s.category === filter);

  return (
    <div style={styles.screen}>
      <div style={styles.homeHero}>
        <div style={styles.homeHeroInner}>
          <div style={styles.villageIcon}>◆</div>
          <div style={styles.homeEyebrow}>Villers-Cotterêts · 02290</div>
          <div style={styles.homeTitle}>Villers Expresse</div>
          <div style={styles.homeSub}>Vos commerces, livrés à vélo électrique</div>
        </div>
      </div>

      <div style={styles.chipsRow}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              ...styles.chip,
              ...(filter === c ? styles.chipActive : {}),
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={styles.sectionLabel}>Commerces disponibles</div>

      <div style={styles.shopList}>
        {filtered.map((shop) => (
          <button key={shop.id} onClick={() => onOpenShop(shop)} style={styles.shopCard}>
            <div style={styles.shopIconWrap}>
              <span style={{ fontSize: 26 }}>{shop.icon}</span>
            </div>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={styles.shopName}>{shop.name}</div>
              <div style={styles.shopTag}>{shop.tag}</div>
              <div style={styles.shopTime}>{shop.time}</div>
            </div>
            <div style={styles.shopChevron}>›</div>
          </button>
        ))}
      </div>

      <CartBadge count={cartCount} onClick={onOpenCart} />
    </div>
  );
}

// ---------- Écran 2 : Détail commerce ----------
function ShopScreen({ shop, onBack, onAddToCart, cartCount, onOpenCart }) {
  const [added, setAdded] = useState({});

  const handleAdd = (product) => {
    onAddToCart(shop, product);
    setAdded((a) => ({ ...a, [product.id]: true }));
    setTimeout(() => setAdded((a) => ({ ...a, [product.id]: false })), 900);
  };

  return (
    <div style={styles.screen}>
      <PlaqueHeader eyebrow={shop.category} title={shop.name} onBack={onBack} />
      <div style={styles.shopBanner}>
        <span style={{ fontSize: 40 }}>{shop.icon}</span>
        <div style={styles.shopBannerMeta}>{shop.tag} · {shop.time}</div>
      </div>

      <div style={styles.sectionLabel}>Produits</div>
      <div style={styles.productList}>
        {shop.products.map((p) => (
          <div key={p.id} style={styles.productRow}>
            <div style={{ flex: 1 }}>
              <div style={styles.productName}>{p.name}</div>
              <div style={styles.productDesc}>{p.desc}</div>
              <div style={styles.productPrice}>{p.price.toFixed(2)} €</div>
            </div>
            <button
              onClick={() => handleAdd(p)}
              style={{
                ...styles.addBtn,
                ...(added[p.id] ? styles.addBtnActive : {}),
              }}
            >
              {added[p.id] ? "✓" : "+"}
            </button>
          </div>
        ))}
      </div>

      <CartBadge count={cartCount} onClick={onOpenCart} />
    </div>
  );
}

// ---------- Écran 3 : Panier ----------
function CartScreen({ cart, onBack, onUpdateQty, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const deliveryFee = cart.length ? 2.5 : 0;

  return (
    <div style={styles.screen}>
      <PlaqueHeader eyebrow="Récapitulatif" title="Votre panier" onBack={onBack} />

      {cart.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={{ fontSize: 34, marginBottom: 10 }}>🧺</div>
          <div style={styles.emptyTitle}>Panier vide</div>
          <div style={styles.emptyText}>Ajoutez des produits depuis un commerce pour commencer</div>
        </div>
      ) : (
        <>
          <div style={styles.cartList}>
            {cart.map((item) => (
              <div key={item.product.id} style={styles.cartRow}>
                <div style={{ flex: 1 }}>
                  <div style={styles.cartShopName}>{item.shop.name}</div>
                  <div style={styles.productName}>{item.product.name}</div>
                  <div style={styles.productPrice}>{item.product.price.toFixed(2)} €</div>
                </div>
                <div style={styles.qtyControl}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => onUpdateQty(item.product.id, item.qty - 1)}
                  >
                    −
                  </button>
                  <span style={styles.qtyValue}>{item.qty}</span>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => onUpdateQty(item.product.id, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summaryCard}>
            <div style={styles.summaryRow}>
              <span>Sous-total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Livraison à vélo</span>
              <span>{deliveryFee.toFixed(2)} €</span>
            </div>
            <div style={styles.plaqueRuleThin} />
            <div style={{ ...styles.summaryRow, fontWeight: 700 }}>
              <span>Total</span>
              <span>{(total + deliveryFee).toFixed(2)} €</span>
            </div>
          </div>

          <button style={styles.ctaBtn} onClick={onCheckout}>
            Commander · {(total + deliveryFee).toFixed(2)} €
          </button>
        </>
      )}
    </div>
  );
}

// ---------- Écran 4 : Suivi de commande ----------
function TrackingScreen({ onBack, onNewOrder }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex >= TRACKING_STEPS.length - 1) return;
    const t = setTimeout(() => setStepIndex((i) => i + 1), 2200);
    return () => clearTimeout(t);
  }, [stepIndex]);

  const progress = (stepIndex / (TRACKING_STEPS.length - 1)) * 100;

  return (
    <div style={styles.screen}>
      <PlaqueHeader eyebrow="Commande #VE-2481" title="Suivi de livraison" onBack={onBack} />

      <div style={styles.trackingHero}>
        <div style={styles.bikeTrack}>
          <div style={styles.bikeTrackFill(progress)} />
          <div style={styles.bikeIcon(progress)}>🚲</div>
        </div>
        <div style={styles.trackingEta}>
          {stepIndex < TRACKING_STEPS.length - 1 ? "Arrivée estimée · 12 min" : "Livrée !"}
        </div>
      </div>

      <div style={styles.stepsList}>
        {TRACKING_STEPS.map((step, i) => {
          const state = i < stepIndex ? "done" : i === stepIndex ? "active" : "pending";
          return (
            <div key={step.key} style={styles.stepRow}>
              <div
                style={{
                  ...styles.stepDot,
                  ...(state === "done" ? styles.stepDotDone : {}),
                  ...(state === "active" ? styles.stepDotActive : {}),
                }}
              >
                {state === "done" ? "✓" : ""}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    ...styles.stepLabel,
                    opacity: state === "pending" ? 0.45 : 1,
                  }}
                >
                  {step.label}
                </div>
                {state === "active" && <div style={styles.stepDetail}>{step.detail}</div>}
              </div>
            </div>
          );
        })}
      </div>

      {stepIndex >= TRACKING_STEPS.length - 1 && (
        <button style={styles.ctaBtn} onClick={onNewOrder}>
          Nouvelle commande
        </button>
      )}
    </div>
  );
}

// ---------- App racine ----------
export default function App() {
  const [screen, setScreen] = useState("home");
  const [activeShop, setActiveShop] = useState(null);
  const [cart, setCart] = useState([]);

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  const handleAddToCart = (shop, product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { shop, product, qty: 1 }];
    });
  };

  const handleUpdateQty = (productId, qty) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== productId)
        : prev.map((i) => (i.product.id === productId ? { ...i, qty } : i))
    );
  };

  const handleCheckout = () => {
    setScreen("tracking");
  };

  const handleNewOrder = () => {
    setCart([]);
    setActiveShop(null);
    setScreen("home");
  };

  return (
    <div style={styles.appWrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Work+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        button { font-family: inherit; cursor: pointer; }
      `}</style>
      <div style={styles.phoneFrame}>
        {screen === "home" && (
          <HomeScreen
            onOpenShop={(shop) => {
              setActiveShop(shop);
              setScreen("shop");
            }}
            cartCount={cartCount}
            onOpenCart={() => setScreen("cart")}
          />
        )}
        {screen === "shop" && activeShop && (
          <ShopScreen
            shop={activeShop}
            onBack={() => setScreen("home")}
            onAddToCart={handleAddToCart}
            cartCount={cartCount}
            onOpenCart={() => setScreen("cart")}
          />
        )}
        {screen === "cart" && (
          <CartScreen
            cart={cart}
            onBack={() => setScreen(activeShop ? "shop" : "home")}
            onUpdateQty={handleUpdateQty}
            onCheckout={handleCheckout}
          />
        )}
        {screen === "tracking" && (
          <TrackingScreen onBack={() => setScreen("home")} onNewOrder={handleNewOrder} />
        )}
      </div>
    </div>
  );
}

// ---------- Styles ----------
const styles = {
  appWrap: {
    minHeight: "100vh",
    background: "#0A0F1C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: FONT_BODY,
  },
  phoneFrame: {
    width: 380,
    maxWidth: "100%",
    height: 780,
    maxHeight: "92vh",
    background: COLORS.cream,
    borderRadius: 28,
    overflow: "hidden",
    position: "relative",
    boxShadow: `0 0 0 8px ${COLORS.navyDeep}, 0 20px 60px rgba(0,0,0,0.5)`,
    display: "flex",
    flexDirection: "column",
  },
  screen: {
    flex: 1,
    overflowY: "auto",
    position: "relative",
    paddingBottom: 90,
  },

  // Home
  homeHero: {
    background: `linear-gradient(160deg, ${COLORS.navy} 0%, ${COLORS.navyDeep} 100%)`,
    padding: "36px 24px 28px",
    borderBottom: `3px solid ${COLORS.gold}`,
  },
  homeHeroInner: { textAlign: "center" },
  villageIcon: { color: COLORS.gold, fontSize: 14, marginBottom: 8, letterSpacing: 4 },
  homeEyebrow: {
    color: COLORS.goldBright,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
    fontWeight: 600,
  },
  homeTitle: {
    color: COLORS.cream,
    fontFamily: FONT_DISPLAY,
    fontSize: 32,
    fontWeight: 600,
    letterSpacing: 0.5,
  },
  homeSub: { color: "#C9C2AA", fontSize: 13, marginTop: 6 },

  chipsRow: {
    display: "flex",
    gap: 8,
    padding: "18px 20px 4px",
    overflowX: "auto",
  },
  chip: {
    border: `1px solid ${COLORS.navy}33`,
    background: "transparent",
    color: COLORS.navy,
    padding: "7px 14px",
    borderRadius: 20,
    fontSize: 12.5,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  chipActive: {
    background: COLORS.navy,
    color: COLORS.gold,
    borderColor: COLORS.navy,
  },

  sectionLabel: {
    padding: "18px 20px 8px",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: `${COLORS.navy}99`,
    fontWeight: 600,
  },

  shopList: { padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 },
  shopCard: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: "#FFFFFF",
    border: `1px solid ${COLORS.navy}22`,
    borderRadius: 14,
    padding: 14,
    textAlign: "left",
  },
  shopIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    background: COLORS.creamSoft,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  shopName: { fontFamily: FONT_DISPLAY, fontSize: 16.5, fontWeight: 600, color: COLORS.ink },
  shopTag: { fontSize: 12, color: `${COLORS.ink}99`, marginTop: 2 },
  shopTime: { fontSize: 11.5, color: COLORS.brick, marginTop: 4, fontWeight: 600 },
  shopChevron: { fontSize: 22, color: `${COLORS.navy}55` },

  // Header (plaque)
  header: {
    background: `linear-gradient(160deg, ${COLORS.navy} 0%, ${COLORS.navyDeep} 100%)`,
    padding: "18px 14px 14px",
  },
  headerRow: { display: "flex", alignItems: "center" },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    border: `1px solid ${COLORS.gold}55`,
    background: "transparent",
    color: COLORS.gold,
    fontSize: 16,
  },
  eyebrow: {
    color: COLORS.goldBright,
    fontSize: 10.5,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontWeight: 600,
  },
  headerTitle: {
    color: COLORS.cream,
    fontFamily: FONT_DISPLAY,
    fontSize: 19,
    fontWeight: 600,
    marginTop: 2,
  },
  plaqueRule: { height: 2, background: COLORS.gold, marginTop: 14, opacity: 0.8 },
  plaqueRuleThin: { height: 1, background: `${COLORS.navy}33`, margin: "8px 0" },

  // Shop screen
  shopBanner: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "18px 20px",
    background: "#FFFFFF",
    margin: "16px 16px 0",
    borderRadius: 14,
    border: `1px solid ${COLORS.navy}1A`,
  },
  shopBannerMeta: { fontSize: 12.5, color: `${COLORS.ink}99` },

  productList: { padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 },
  productRow: {
    display: "flex",
    alignItems: "center",
    background: "#FFFFFF",
    border: `1px solid ${COLORS.navy}1A`,
    borderRadius: 12,
    padding: 14,
  },
  productName: { fontSize: 14.5, fontWeight: 600, color: COLORS.ink },
  productDesc: { fontSize: 12, color: `${COLORS.ink}88`, marginTop: 2 },
  productPrice: { fontSize: 13.5, color: COLORS.brick, fontWeight: 700, marginTop: 6 },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: "none",
    background: COLORS.navy,
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: 700,
    flexShrink: 0,
  },
  addBtnActive: { background: "#3E6B4F", color: "#fff" },

  // Cart
  cartList: { padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 10 },
  cartRow: {
    display: "flex",
    alignItems: "center",
    background: "#FFFFFF",
    border: `1px solid ${COLORS.navy}1A`,
    borderRadius: 12,
    padding: 14,
  },
  cartShopName: {
    fontSize: 10.5,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: `${COLORS.navy}88`,
    fontWeight: 600,
    marginBottom: 2,
  },
  qtyControl: { display: "flex", alignItems: "center", gap: 10 },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 8,
    border: `1px solid ${COLORS.navy}33`,
    background: COLORS.creamSoft,
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: 700,
  },
  qtyValue: { fontSize: 14, fontWeight: 600, minWidth: 14, textAlign: "center" },

  summaryCard: {
    margin: "18px 16px 0",
    background: "#FFFFFF",
    border: `1px solid ${COLORS.navy}1A`,
    borderRadius: 14,
    padding: 16,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13.5,
    color: COLORS.ink,
    padding: "4px 0",
  },

  ctaBtn: {
    display: "block",
    width: "calc(100% - 32px)",
    margin: "18px 16px 0",
    background: COLORS.navy,
    color: COLORS.gold,
    border: `1.5px solid ${COLORS.gold}`,
    borderRadius: 14,
    padding: "15px 0",
    fontSize: 14.5,
    fontWeight: 700,
    letterSpacing: 0.3,
  },

  emptyState: { padding: "60px 30px", textAlign: "center" },
  emptyTitle: { fontFamily: FONT_DISPLAY, fontSize: 18, fontWeight: 600, color: COLORS.ink },
  emptyText: { fontSize: 13, color: `${COLORS.ink}88`, marginTop: 6 },

  // Tracking
  trackingHero: { padding: "26px 24px 10px" },
  bikeTrack: { position: "relative", height: 6, background: COLORS.creamSoft, borderRadius: 3 },
  bikeTrackFill: (progress) => ({
    position: "absolute",
    left: 0,
    top: 0,
    height: 6,
    width: `${progress}%`,
    background: COLORS.gold,
    borderRadius: 3,
    transition: "width 1.8s ease",
  }),
  bikeIcon: (progress) => ({
    position: "absolute",
    top: -16,
    left: `calc(${progress}% - 14px)`,
    fontSize: 24,
    transition: "left 1.8s ease",
  }),
  trackingEta: {
    textAlign: "center",
    marginTop: 20,
    fontFamily: FONT_DISPLAY,
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.ink,
  },

  stepsList: { padding: "18px 24px 0", display: "flex", flexDirection: "column", gap: 4 },
  stepRow: { display: "flex", gap: 14, paddingBottom: 22, position: "relative" },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    border: `2px solid ${COLORS.navy}44`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    color: "#fff",
    flexShrink: 0,
  },
  stepDotDone: { background: "#3E6B4F", borderColor: "#3E6B4F" },
  stepDotActive: { background: COLORS.navy, borderColor: COLORS.navy },
  stepLabel: { fontSize: 14, fontWeight: 600, color: COLORS.ink },
  stepDetail: { fontSize: 12, color: `${COLORS.ink}88`, marginTop: 3 },

  cartFab: {
    position: "absolute",
    bottom: 18,
    right: 18,
    background: COLORS.navy,
    border: `1.5px solid ${COLORS.gold}`,
    borderRadius: 30,
    padding: "12px 18px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  },
  cartFabCount: {
    background: COLORS.gold,
    color: COLORS.navyDeep,
    width: 20,
    height: 20,
    borderRadius: "50%",
    fontSize: 11,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
