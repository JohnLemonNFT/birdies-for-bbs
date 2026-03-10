import { useState, useEffect, useCallback } from "react";
import {
  CATEGORIES,
  STATUS_CONFIG,
  TIERS,
  TEMPLATES,
  SEED_BUSINESSES,
  getTemplateForCategory,
} from "../data/crm-businesses";

const STORAGE_KEY = "bbs-crm-data";

// Status colors for light theme
const STATUS_COLORS = {
  not_contacted: { text: "#6B7280", bg: "#F3F4F6" },
  reached_out: { text: "#2563EB", bg: "#DBEAFE" },
  follow_up: { text: "#D97706", bg: "#FEF3C7" },
  committed: { text: "#059669", bg: "#D1FAE5" },
  declined: { text: "#DC2626", bg: "#FEE2E2" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  const colors = STATUS_COLORS[status];
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
      style={{ background: colors.bg, color: colors.text }}
    >
      {cfg.label}
    </span>
  );
}

function CategoryTag({ category }) {
  const cfg = CATEGORIES[category] || CATEGORIES.retail;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-600">
      {cfg.icon} {cfg.label}
    </span>
  );
}

function buildMailto(biz) {
  if (!biz.email) return null;
  const templateKey = getTemplateForCategory(biz.category);
  const template = TEMPLATES[templateKey];
  const subject = template.subject;
  const body = template.body.replace(/\[BUSINESS_NAME\]/g, biz.name);
  return `mailto:${biz.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// --- Dashboard Tab ---
function Dashboard({ businesses, goal }) {
  const contacted = businesses.filter((b) => b.status !== "not_contacted").length;
  const committed = businesses.filter((b) => b.status === "committed").length;
  const declined = businesses.filter((b) => b.status === "declined").length;
  const totalRaised = businesses
    .filter((b) => b.status === "committed")
    .reduce((s, b) => s + (b.amount || 0), 0);
  const pct = Math.min(100, Math.round((totalRaised / goal) * 100));
  const nextUp = businesses.filter((b) => b.status === "not_contacted").slice(0, 6);

  return (
    <div className="space-y-5">
      {/* Goal Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="text-lg font-bold text-gray-900">Fundraising Goal</h2>
          <div className="text-right">
            <span className="text-3xl font-bold text-green-700">
              ${totalRaised.toLocaleString()}
            </span>
            <span className="text-lg text-gray-400 ml-1">/ ${goal.toLocaleString()}</span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 bg-green-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-sm text-gray-500 mt-2 text-right font-medium">{pct}% of goal</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: businesses.length, color: "text-gray-900" },
          { label: "Contacted", value: contacted, color: "text-blue-600" },
          { label: "Committed", value: committed, color: "text-green-600" },
          { label: "Declined", value: declined, color: "text-red-500" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-200">
            <div className={`text-4xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-gray-500 mt-1 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">By Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(CATEGORIES).map(([key, cfg]) => {
            const count = businesses.filter((b) => b.category === key).length;
            if (count === 0) return null;
            return (
              <div key={key} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50">
                <span className="text-lg">{cfg.icon}</span>
                <span className="text-base text-gray-700 flex-1">{cfg.label}</span>
                <span className="text-base font-bold text-gray-900">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Up */}
      {nextUp.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Next Up — Contact These</h2>
          {nextUp.map((b) => (
            <div
              key={b.id}
              className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="min-w-0 flex-1">
                <div className="text-base font-semibold text-gray-900">{b.name}</div>
                <div className="text-sm text-gray-500">{CATEGORIES[b.category]?.icon} {CATEGORIES[b.category]?.label}</div>
              </div>
              <div className="flex gap-2 shrink-0 ml-3">
                {b.phone && (
                  <a
                    href={`tel:${b.phone.replace(/\D/g, "")}`}
                    className="px-3 py-2 rounded-lg bg-green-50 text-green-700 text-sm font-semibold hover:bg-green-100 transition-colors"
                  >
                    Call
                  </a>
                )}
                {b.email && (
                  <a
                    href={buildMailto(b)}
                    className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100 transition-colors"
                  >
                    Email
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Business Card ---
function BusinessCard({ biz, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(biz.notes || "");
  const [copied, setCopied] = useState("");
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  const recommendedTemplate = getTemplateForCategory(biz.category);
  const mailtoLink = buildMailto(biz);

  const handleStatusChange = (newStatus) => {
    onUpdate({
      ...biz,
      status: newStatus,
      contactDate:
        newStatus !== "not_contacted"
          ? new Date().toISOString().split("T")[0]
          : biz.contactDate,
    });
  };

  const handleTierChange = (tierId) => {
    const tier = TIERS.find((t) => t.id === tierId);
    onUpdate({ ...biz, tier: tierId, amount: tier ? tier.amount : 0 });
  };

  const copyTemplate = (templateKey) => {
    const t = TEMPLATES[templateKey];
    const text = t.subject
      ? `Subject: ${t.subject}\n\n${t.body.replace(/\[BUSINESS_NAME\]/g, biz.name)}`
      : t.body.replace(/\[BUSINESS_NAME\]/g, biz.name);
    navigator.clipboard.writeText(text);
    setCopied(templateKey);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div
      className={`bg-white rounded-xl p-5 mb-3 border-2 transition-all cursor-pointer hover:shadow-md ${
        biz.status === "committed" ? "border-green-300" : "border-gray-200"
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header Row */}
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-lg font-bold text-gray-900 mb-2">{biz.name}</div>
          <div className="flex gap-2 flex-wrap items-center">
            <CategoryTag category={biz.category} />
            <StatusBadge status={biz.status} />
            {biz.tier && (
              <span className="text-sm font-bold text-amber-600">
                {TIERS.find((t) => t.id === biz.tier)?.label}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {biz.phone && (
            <a
              href={`tel:${biz.phone.replace(/\D/g, "")}`}
              onClick={(e) => e.stopPropagation()}
              className="w-11 h-11 rounded-xl flex items-center justify-center bg-green-50 hover:bg-green-100 transition-colors text-lg"
              title={biz.phone}
            >
              {"\u{1F4DE}"}
            </a>
          )}
          {biz.email ? (
            <a
              href={mailtoLink}
              onClick={(e) => e.stopPropagation()}
              className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors text-lg"
              title={`Email ${biz.email}`}
            >
              {"\u2709\uFE0F"}
            </a>
          ) : (
            <span
              className="w-11 h-11 rounded-xl flex items-center justify-center bg-gray-50 text-lg opacity-25 cursor-default"
              title="No email on file"
              onClick={(e) => e.stopPropagation()}
            >
              {"\u2709\uFE0F"}
            </span>
          )}
          {biz.website && (
            <a
              href={biz.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-11 h-11 rounded-xl flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors text-lg"
              title="Website"
            >
              {"\u{1F310}"}
            </a>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div
          className="mt-5 pt-5 border-t-2 border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {biz.address && (
            <p className="text-base text-gray-500 mb-4">
              {"\u{1F4CD}"} {biz.address}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-sm text-gray-500 font-semibold block mb-2">Status</label>
              <select
                value={biz.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-base font-medium focus:outline-none focus:border-blue-400"
              >
                {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-500 font-semibold block mb-2">Tier</label>
              <select
                value={biz.tier || ""}
                onChange={(e) => handleTierChange(e.target.value)}
                className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-base font-medium focus:outline-none focus:border-blue-400"
              >
                <option value="">Select tier...</option>
                {TIERS.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          {biz.amount > 0 && (
            <div className="mb-5">
              <label className="text-sm text-gray-500 font-semibold block mb-2">Custom Amount ($)</label>
              <input
                type="number"
                value={biz.amount}
                onChange={(e) => onUpdate({ ...biz, amount: parseInt(e.target.value) || 0 })}
                className="w-32 px-3 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-base font-medium focus:outline-none focus:border-blue-400"
              />
            </div>
          )}

          <div className="mb-5">
            <label className="text-sm text-gray-500 font-semibold block mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => onUpdate({ ...biz, notes })}
              rows={3}
              className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-base resize-y focus:outline-none focus:border-blue-400"
            />
          </div>

          {biz.contactDate && (
            <p className="text-sm text-gray-400 mb-4">
              Last contacted: {biz.contactDate}
            </p>
          )}

          {/* Smart copy buttons */}
          <div className="flex gap-2 flex-wrap items-center">
            <button
              onClick={() => copyTemplate(recommendedTemplate)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              {copied === recommendedTemplate
                ? "\u2713 Copied!"
                : `Copy ${TEMPLATES[recommendedTemplate].label}`}
            </button>
            <button
              onClick={() => copyTemplate("phone_script")}
              className="px-4 py-2.5 rounded-xl text-sm font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {copied === "phone_script" ? "\u2713 Copied!" : "Phone Script"}
            </button>
            <button
              onClick={() => setShowAllTemplates(!showAllTemplates)}
              className="px-3 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showAllTemplates ? "Less" : "More..."}
            </button>
          </div>
          {showAllTemplates && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {Object.entries(TEMPLATES)
                .filter(([k]) => k !== recommendedTemplate && k !== "phone_script")
                .map(([k, v]) => (
                  <button
                    key={k}
                    onClick={() => copyTemplate(k)}
                    className="px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    {copied === k ? "\u2713 Copied!" : v.label}
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// --- Add Business Modal ---
function AddBusinessForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: "", category: "retail", phone: "", email: "", website: "", address: "", notes: "",
  });

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onAdd({
      ...form,
      id: `b_${Date.now()}`,
      status: "not_contacted",
      tier: null,
      amount: 0,
      contactDate: null,
    });
    onClose();
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-base focus:outline-none focus:border-blue-400";

  return (
    <div className="fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-7 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-5">Add Business</h3>

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Business Name *</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="e.g. Fox Valley Dental" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Category</label>
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>
          {Object.entries(CATEGORIES).map(([k, v]) => (
            <option key={k} value={k}>{v.icon} {v.label}</option>
          ))}
        </select>

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Phone</label>
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="(920) 555-1234" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Email</label>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="info@business.com" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Website</label>
        <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inputClass} placeholder="https://..." />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Address</label>
        <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} placeholder="123 Main St, Appleton, WI" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Notes</label>
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className={`${inputClass} resize-y`} />

        <div className="flex gap-3 mt-6">
          <button onClick={handleSubmit} className="flex-1 py-3.5 rounded-xl font-bold text-base bg-green-600 text-white hover:bg-green-700 transition-colors">
            Add Business
          </button>
          <button onClick={onClose} className="flex-1 py-3.5 rounded-xl font-bold text-base border-2 border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Templates Tab ---
function TemplateView() {
  const [active, setActive] = useState("cold_email");
  const [copied, setCopied] = useState(false);
  const t = TEMPLATES[active];

  const handleCopy = () => {
    const text = t.subject ? `Subject: ${t.subject}\n\n${t.body}` : t.body;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-5">
        {Object.entries(TEMPLATES).map(([k, v]) => (
          <button
            key={k}
            onClick={() => { setActive(k); setCopied(false); }}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              active === k
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 border-2 border-gray-200 hover:border-green-300"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        {t.subject && (
          <div className="mb-5">
            <span className="text-sm text-gray-400 font-semibold">SUBJECT: </span>
            <span className="text-base text-gray-900 font-medium">{t.subject}</span>
          </div>
        )}
        <pre className="text-base text-gray-800 leading-relaxed whitespace-pre-wrap break-words" style={{ fontFamily: "inherit" }}>
          {t.body}
        </pre>
        <button
          onClick={handleCopy}
          className={`mt-6 px-6 py-3 rounded-xl font-bold text-base transition-colors ${
            copied ? "bg-green-600 text-white" : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {copied ? "\u2713 Copied!" : "Copy to Clipboard"}
        </button>
        <p className="text-sm text-gray-400 mt-3">
          Replace [BUSINESS_NAME] and [CONTACT_NAME] before sending.
        </p>
      </div>
    </div>
  );
}

// --- Main CRM Component ---
export default function CRM() {
  const [businesses, setBusinesses] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState("");
  const goal = 25000;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.businesses && parsed.businesses.length > 0) {
          const existingIds = new Set(parsed.businesses.map((b) => b.id));
          const newFromSeed = SEED_BUSINESSES.filter((b) => !existingIds.has(b.id));
          setBusinesses([...parsed.businesses, ...newFromSeed]);
          setLoaded(true);
          return;
        }
      }
    } catch (e) {}
    setBusinesses(SEED_BUSINESSES);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ businesses, goal }));
    } catch (e) {
      console.error("Save failed", e);
    }
  }, [businesses, loaded]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const updateBusiness = useCallback((updated) => {
    setBusinesses((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }, []);

  const addBusiness = useCallback((newBiz) => {
    setBusinesses((prev) => [newBiz, ...prev]);
    showToast(`Added ${newBiz.name}`);
  }, []);

  const filteredBiz = businesses.filter((b) => {
    if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus !== "all" && b.status !== filterStatus) return false;
    if (filterCategory !== "all" && b.category !== filterCategory) return false;
    return true;
  });

  const tabConfig = [
    { id: "dashboard", label: "Dashboard" },
    { id: "directory", label: "Directory" },
    { id: "templates", label: "Templates" },
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-5 pt-5 pb-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">W.Y.A.T.T.</h1>
              <p className="text-sm text-gray-400">Wyatt's Year-round Action & Tracking Tool</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-5 py-2.5 rounded-xl font-bold text-base bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              + Add
            </button>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {tabConfig.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-3 rounded-lg text-base font-semibold transition-colors ${
                  tab === t.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-5 py-5 pb-24">
        {tab === "dashboard" && <Dashboard businesses={businesses} goal={goal} />}

        {tab === "directory" && (
          <div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search businesses..."
              className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-base mb-4 focus:outline-none focus:border-blue-400 placeholder:text-gray-300"
            />
            <div className="flex gap-3 mb-5 flex-wrap items-center">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-gray-700 text-base font-medium focus:outline-none focus:border-blue-400"
              >
                <option value="all">All Statuses</option>
                {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-gray-700 text-base font-medium focus:outline-none focus:border-blue-400"
              >
                <option value="all">All Categories</option>
                {Object.entries(CATEGORIES).map(([k, v]) => (
                  <option key={k} value={k}>{v.icon} {v.label}</option>
                ))}
              </select>
              <span className="text-base text-gray-400 font-medium ml-auto">
                {filteredBiz.length} results
              </span>
            </div>
            {filteredBiz.map((b) => (
              <BusinessCard key={b.id} biz={b} onUpdate={updateBusiness} />
            ))}
            {filteredBiz.length === 0 && (
              <div className="text-center py-16 text-gray-400 text-lg">
                No businesses match your filters.
              </div>
            )}
          </div>
        )}

        {tab === "templates" && <TemplateView />}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-7 py-4 rounded-xl font-bold text-base shadow-lg z-[3000]">
          {"\u2713"} {toast}
        </div>
      )}

      {showAddForm && (
        <AddBusinessForm onAdd={addBusiness} onClose={() => setShowAddForm(false)} />
      )}
    </div>
  );
}
