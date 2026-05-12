import { useMemo, useState } from "react";
import {
  Check,
  ChevronRight,
  MessageCircle,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import {
  catalogConfig,
  categoryLabels,
  formatCad,
  Product,
  ProductCategory,
  products,
} from "./catalog";

const categories: Array<ProductCategory | "all"> = [
  "all",
  "grooming",
  "feeding",
  "walking",
  "cleaning",
];

function createWhatsAppUrl(items: Product[]) {
  const itemLines = items
    .map((item) => `- ${item.nameEn} / ${item.nameZh}, ${formatCad(item.priceCad)}`)
    .join("\n");
  const message =
    items.length === 1
      ? `Hi, I'm interested in ${items[0].nameEn} / ${items[0].nameZh}, ${formatCad(items[0].priceCad)}. Is it available?`
      : `Hi, I'm interested in these products:\n${itemLines}\nAre they available?`;

  return `https://wa.me/${catalogConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function ProductCard({
  product,
  selected,
  onToggleSelected,
  onOpen,
}: {
  product: Product;
  selected: boolean;
  onToggleSelected: () => void;
  onOpen: () => void;
}) {
  const specEntries = Object.entries(product.specs).slice(0, 2);

  return (
    <article className="product-card">
      <button
        className="product-image-button"
        type="button"
        onClick={onOpen}
        aria-label={`View ${product.nameEn}`}
      >
        <img src={product.images[0]} alt={product.nameEn} />
      </button>
      <div className="product-copy">
        <div className="product-heading">
          <div>
            <h3>{product.nameEn}</h3>
            <p>{product.nameZh}</p>
          </div>
          <strong>{formatCad(product.priceCad)}</strong>
        </div>
        <dl className="spec-list">
          {specEntries.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="product-actions">
          <button
            className={`select-button ${selected ? "is-selected" : ""}`}
            type="button"
            onClick={onToggleSelected}
          >
            {selected ? <Check size={16} /> : <Sparkles size={16} />}
            {selected ? "Selected 已选" : "Add to ask 加入询价"}
          </button>
          <a className="whatsapp-button" href={createWhatsAppUrl([product])}>
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function ProductDetail({
  product,
  selected,
  onToggleSelected,
  onClose,
}: {
  product: Product;
  selected: boolean;
  onToggleSelected: () => void;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="detail-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.nameEn} details`}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="icon-button close-button" type="button" onClick={onClose}>
          <X size={20} />
        </button>
        <img className="detail-image" src={product.images[0]} alt={product.nameEn} />
        <div className="detail-body">
          <div className="detail-title">
            <div>
              <h2>{product.nameEn}</h2>
              <p>{product.nameZh}</p>
            </div>
            <strong>{formatCad(product.priceCad)}</strong>
          </div>
          <p className="description">{product.descriptionEn}</p>
          <p className="description zh">{product.descriptionZh}</p>
          <dl className="detail-specs">
            {Object.entries(product.specs).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="tag-row">
            {product.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="detail-actions">
            <button
              className={`select-button ${selected ? "is-selected" : ""}`}
              type="button"
              onClick={onToggleSelected}
            >
              {selected ? <Check size={16} /> : <Sparkles size={16} />}
              {selected ? "Selected 已选" : "Add to ask 加入询价"}
            </button>
            <a className="primary-button" href={createWhatsAppUrl([product])}>
              <MessageCircle size={18} />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const selectedProducts = products.filter((product) =>
    selectedIds.includes(product.id),
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesQuery =
        !normalizedQuery ||
        [
          product.nameEn,
          product.nameZh,
          product.descriptionEn,
          product.descriptionZh,
          ...product.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const featuredProducts = products.filter((product) => product.featured);

  function toggleSelected(productId: string) {
    setSelectedIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  return (
    <main className="app-shell">
      <section className="hero-section">
        <header className="topbar">
          <div>
            <p>{catalogConfig.city}</p>
            <h1>{catalogConfig.brandName}</h1>
          </div>
          <a
            className="icon-button"
            href={`https://wa.me/${catalogConfig.whatsappNumber}`}
            aria-label="Contact on WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
        </header>

        <div className="intro-copy">
          <h2>Groomer-selected pet products</h2>
          <p>美容师精选用品，适合洗护后直接给客户查看、询价和预订。</p>
        </div>

        <div className="search-panel">
          <label className="search-box">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products / 搜索产品"
            />
          </label>
          <button
            className="filter-button"
            type="button"
            aria-label="Reset filters"
            title="Reset filters"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <nav className="category-tabs" aria-label="Product categories">
          {categories.map((item) => (
            <button
              key={item}
              className={item === category ? "active" : ""}
              type="button"
              onClick={() => setCategory(item)}
            >
              <span>{categoryLabels[item].en}</span>
              <small>{categoryLabels[item].zh}</small>
            </button>
          ))}
        </nav>
      </section>

      <section className="featured-section" aria-labelledby="featured-title">
        <div className="section-heading">
          <div>
            <h2 id="featured-title">Featured picks</h2>
            <p>常被美容客户问到的实用单品</p>
          </div>
          <span>{featuredProducts.length} items</span>
        </div>
        <div className="featured-rail">
          {featuredProducts.map((product) => (
            <button
              className="featured-card"
              type="button"
              key={product.id}
              onClick={() => setActiveProduct(product)}
            >
              <img src={product.images[0]} alt="" />
              <span>{product.nameEn}</span>
              <strong>{formatCad(product.priceCad)}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="catalog-section" aria-labelledby="catalog-title">
        <div className="section-heading">
          <div>
            <h2 id="catalog-title">Product catalog</h2>
            <p>产品图片、参数和价格</p>
          </div>
          <span>{filteredProducts.length} shown</span>
        </div>

        <div className="product-list">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selected={selectedIds.includes(product.id)}
              onToggleSelected={() => toggleSelected(product.id)}
              onOpen={() => setActiveProduct(product)}
            />
          ))}
        </div>
      </section>

      {selectedProducts.length > 0 && (
        <aside className="sticky-inquiry" aria-label="Selected products inquiry">
          <div>
            <strong>{selectedProducts.length} selected</strong>
            <span>已选商品，可一起询价</span>
          </div>
          <a className="primary-button" href={createWhatsAppUrl(selectedProducts)}>
            <MessageCircle size={18} />
            Ask now
            <ChevronRight size={18} />
          </a>
        </aside>
      )}

      {activeProduct && (
        <ProductDetail
          product={activeProduct}
          selected={selectedIds.includes(activeProduct.id)}
          onToggleSelected={() => toggleSelected(activeProduct.id)}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </main>
  );
}
