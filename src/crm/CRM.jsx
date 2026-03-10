import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";
import {
  CATEGORIES,
  STATUS_CONFIG,
  TIERS,
  TEMPLATES,
  getTemplateForCategory,
} from "../data/crm-businesses";

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
            {biz.status === "committed" && biz.amount > 0 && (
              <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                ${biz.amount.toLocaleString()}
              </span>
            )}
            {biz.tier && (
              <span className="text-xs font-semibold text-amber-600">
                {TIERS.find((t) => t.id === biz.tier)?.label.split(" ")[0]}
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

          {/* Amount - always show when committed or has tier/amount */}
          {(biz.status === "committed" || biz.tier || biz.amount > 0) && (
            <div className="mb-5 p-4 bg-green-50 rounded-xl border border-green-200">
              <label className="text-sm text-green-700 font-semibold block mb-2">Amount Committed ($)</label>
              <div className="flex items-center gap-3">
                <span className="text-green-600 text-xl font-bold">$</span>
                <input
                  type="number"
                  value={biz.amount || ""}
                  placeholder="0"
                  onChange={(e) => onUpdate({ ...biz, amount: parseInt(e.target.value) || 0 })}
                  className="w-32 px-3 py-3 rounded-xl border-2 border-green-300 bg-white text-gray-900 text-xl font-bold focus:outline-none focus:border-green-500"
                />
              </div>
              {biz.tier && biz.amount > 0 && (
                <p className="text-xs text-green-600 mt-2">
                  {TIERS.find(t => t.id === biz.tier)?.label} sponsor
                </p>
              )}
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

// --- Contacts Tab ---
const CONTACT_TYPES = {
  golfer: { label: "Golfer", icon: "⛳" },
  sponsor: { label: "Sponsor", icon: "🏆" },
  donor: { label: "Donor", icon: "💚" },
  volunteer: { label: "Volunteer", icon: "🙋" },
  raffle_donor: { label: "Raffle Donor", icon: "🎁" },
  other: { label: "Other", icon: "👤" },
};

function ContactsView({ contacts }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filtered = contacts.filter((c) => {
    const matchSearch = !search ||
      (c.name && c.name.toLowerCase().includes(search.toLowerCase())) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
      (c.company && c.company.toLowerCase().includes(search.toLowerCase()));
    const matchType = filterType === "all" || c.type === filterType;
    return matchSearch && matchType;
  });

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Company", "Type", "Source", "Notes"];
    const rows = contacts.map((c) => [
      c.name || "",
      c.email || "",
      c.phone || "",
      c.company || "",
      c.type || "",
      c.source || "",
      (c.notes || "").replace(/"/g, '""'),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `birdies-contacts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">Email List</h2>
        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
        >
          Export CSV
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search contacts..."
        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-base mb-4 focus:outline-none focus:border-blue-400 placeholder:text-gray-300"
      />

      <div className="flex gap-3 mb-5 flex-wrap items-center">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-gray-700 text-base font-medium focus:outline-none focus:border-blue-400"
        >
          <option value="all">All Types</option>
          {Object.entries(CONTACT_TYPES).map(([k, v]) => (
            <option key={k} value={k}>{v.icon} {v.label}</option>
          ))}
        </select>
        <span className="text-base text-gray-400 font-medium ml-auto">
          {filtered.length} contacts
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-lg">
          {contacts.length === 0 ? "No contacts yet. Add your first contact!" : "No contacts match your search."}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((c) => (
            <div key={c.id} className="bg-white rounded-xl p-4 border-2 border-gray-200">
              <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-bold text-gray-900">{c.name || c.email}</span>
                    <span className="text-sm px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {CONTACT_TYPES[c.type]?.icon} {CONTACT_TYPES[c.type]?.label || "Other"}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">{c.email}</div>
                  {c.company && <div className="text-sm text-gray-400">{c.company}</div>}
                </div>
                <div className="flex gap-2 shrink-0 ml-3">
                  {c.phone && (
                    <a
                      href={`tel:${c.phone.replace(/\D/g, "")}`}
                      className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-50 hover:bg-green-100 transition-colors text-base"
                    >
                      📞
                    </a>
                  )}
                  <a
                    href={`mailto:${c.email}`}
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 hover:bg-blue-100 transition-colors text-base"
                  >
                    ✉️
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Add Contact Form ---
function AddContactForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", type: "other", source: "manual", notes: "",
  });

  const handleSubmit = () => {
    if (!form.email.trim()) return;
    onAdd(form);
    onClose();
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-base focus:outline-none focus:border-blue-400";

  return (
    <div className="fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-7 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-5">Add Contact</h3>

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Email *</label>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="email@example.com" type="email" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Name</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="John Smith" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Phone</label>
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="(920) 555-1234" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Company</label>
        <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass} placeholder="Company name" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Type</label>
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputClass}>
          {Object.entries(CONTACT_TYPES).map(([k, v]) => (
            <option key={k} value={k}>{v.icon} {v.label}</option>
          ))}
        </select>

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Source</label>
        <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className={inputClass}>
          <option value="manual">Manual Entry</option>
          <option value="website_signup">Website Signup</option>
          <option value="tournament_2024">2024 Tournament</option>
          <option value="tournament_2025">2025 Tournament</option>
          <option value="tournament_2026">2026 Tournament</option>
          <option value="referral">Referral</option>
        </select>

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Notes</label>
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className={`${inputClass} resize-y`} />

        <div className="flex gap-3 mt-6">
          <button onClick={handleSubmit} className="flex-1 py-3.5 rounded-xl font-bold text-base bg-green-600 text-white hover:bg-green-700 transition-colors">
            Add Contact
          </button>
          <button onClick={onClose} className="flex-1 py-3.5 rounded-xl font-bold text-base border-2 border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Golfers Tab ---
function GolfersView({ golfers, onUpdate }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all, paid, unpaid

  const filtered = golfers.filter((g) => {
    const matchSearch = !search ||
      (g.name && g.name.toLowerCase().includes(search.toLowerCase())) ||
      (g.email && g.email.toLowerCase().includes(search.toLowerCase())) ||
      (g.company && g.company.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "all" ||
      (filter === "paid" && g.paid) ||
      (filter === "unpaid" && !g.paid);
    return matchSearch && matchFilter;
  });

  const totalPlayers = golfers.reduce((sum, g) => sum + (g.num_players || 1), 0);
  const totalPaid = golfers.filter(g => g.paid).reduce((sum, g) => sum + (g.num_players || 1), 0);
  const totalRevenue = golfers.reduce((sum, g) => sum + (parseFloat(g.amount) || 0), 0);

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{golfers.length}</div>
          <div className="text-xs text-gray-500">Teams</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">{totalPlayers}</div>
          <div className="text-xs text-gray-500">Players</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Collected</div>
        </div>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search golfers..."
        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-base mb-4 focus:outline-none focus:border-blue-400 placeholder:text-gray-300"
      />

      <div className="flex gap-2 mb-4">
        {[
          { id: "all", label: "All" },
          { id: "paid", label: "Paid" },
          { id: "unpaid", label: "Unpaid" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filter === f.id
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="text-sm text-gray-400 ml-auto self-center">{filtered.length} teams</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">No golfers found</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((g) => (
            <GolferCard key={g.id} golfer={g} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}

function GolferCard({ golfer, onUpdate }) {
  const [expanded, setExpanded] = useState(false);

  const togglePaid = (e) => {
    e.stopPropagation();
    onUpdate({ ...golfer, paid: !golfer.paid });
  };

  const toggleConfirmed = (e) => {
    e.stopPropagation();
    onUpdate({ ...golfer, players_confirmed: !golfer.players_confirmed });
  };

  return (
    <div
      className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all ${
        golfer.paid ? "border-green-200" : "border-gray-200"
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-gray-900">{golfer.name}</span>
            {golfer.num_players > 1 && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {golfer.num_players} players
              </span>
            )}
          </div>
          {golfer.company && <div className="text-sm text-gray-500">{golfer.company}</div>}
          <div className="flex gap-2 mt-2 flex-wrap">
            <button
              onClick={togglePaid}
              className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                golfer.paid
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {golfer.paid ? "✓ Paid" : "Unpaid"}
            </button>
            <button
              onClick={toggleConfirmed}
              className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                golfer.players_confirmed
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {golfer.players_confirmed ? "✓ Confirmed" : "Unconfirmed"}
            </button>
            {golfer.logo_received && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 font-semibold">
                Logo ✓
              </span>
            )}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-lg font-bold text-green-600">
            ${parseFloat(golfer.amount || 0).toLocaleString()}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
          {golfer.email && (
            <a href={`mailto:${golfer.email}`} className="text-sm text-blue-600 block mb-2">
              {golfer.email}
            </a>
          )}
          {golfer.notes && <p className="text-sm text-gray-500">{golfer.notes}</p>}
        </div>
      )}
    </div>
  );
}

function AddGolferForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", team_name: "",
    num_players: 4, amount: "", paid: false, notes: "",
  });

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onAdd(form);
    onClose();
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-base focus:outline-none focus:border-blue-400";

  return (
    <div className="fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-7 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-5">Add Golfer/Team</h3>

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Name *</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="John Smith" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Email</label>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="email@example.com" type="email" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Company/Team Name</label>
        <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass} placeholder="Company or team name" />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm text-gray-500 font-semibold block mb-1.5"># Players</label>
            <input type="number" value={form.num_players} onChange={(e) => setForm({ ...form, num_players: parseInt(e.target.value) || 1 })} className={inputClass} min="1" max="4" />
          </div>
          <div>
            <label className="text-sm text-gray-500 font-semibold block mb-1.5">Amount ($)</label>
            <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className={inputClass} placeholder="0" />
          </div>
        </div>

        <label className="flex items-center gap-3 mt-4 cursor-pointer">
          <input type="checkbox" checked={form.paid} onChange={(e) => setForm({ ...form, paid: e.target.checked })} className="w-5 h-5 rounded" />
          <span className="text-base font-medium text-gray-700">Paid</span>
        </label>

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Notes</label>
        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className={`${inputClass} resize-y`} />

        <div className="flex gap-3 mt-6">
          <button onClick={handleSubmit} className="flex-1 py-3.5 rounded-xl font-bold text-base bg-green-600 text-white hover:bg-green-700 transition-colors">
            Add Golfer
          </button>
          <button onClick={onClose} className="flex-1 py-3.5 rounded-xl font-bold text-base border-2 border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Raffle Tab ---
function RaffleView({ items, onUpdate }) {
  const [filter, setFilter] = useState("all");

  const filtered = items.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const totalValue = items.reduce((sum, i) => sum + (parseFloat(i.value) || 0), 0);
  const receivedValue = items.filter(i => i.status === "received").reduce((sum, i) => sum + (parseFloat(i.value) || 0), 0);

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{items.length}</div>
          <div className="text-xs text-gray-500">Items</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-green-600">${receivedValue.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Received</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">${totalValue.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Total Value</div>
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { id: "all", label: "All" },
          { id: "pending", label: "Pending" },
          { id: "received", label: "Received" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filter === f.id
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">No raffle items</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl p-4 border-2 ${
                item.status === "received" ? "border-green-200" : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-gray-900">{item.item}</div>
                  {item.donor && <div className="text-sm text-gray-500">From: {item.donor}</div>}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-green-600">${parseFloat(item.value || 0).toLocaleString()}</div>
                  <button
                    onClick={() => onUpdate({ ...item, status: item.status === "received" ? "pending" : "received" })}
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold mt-1 ${
                      item.status === "received"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.status === "received" ? "✓ Received" : "Pending"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddRaffleForm({ onAdd, onClose }) {
  const [form, setForm] = useState({ item: "", donor: "", value: "", status: "pending", notes: "" });

  const handleSubmit = () => {
    if (!form.item.trim()) return;
    onAdd(form);
    onClose();
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-base focus:outline-none focus:border-blue-400";

  return (
    <div className="fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-7 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-5">Add Raffle Item</h3>

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Item *</label>
        <input value={form.item} onChange={(e) => setForm({ ...form, item: e.target.value })} className={inputClass} placeholder="e.g. Golf Bag, Gift Card" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Donor</label>
        <input value={form.donor} onChange={(e) => setForm({ ...form, donor: e.target.value })} className={inputClass} placeholder="Who donated this?" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Value ($)</label>
        <input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} className={inputClass} placeholder="0" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Status</label>
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
          <option value="pending">Pending</option>
          <option value="received">Received</option>
        </select>

        <div className="flex gap-3 mt-6">
          <button onClick={handleSubmit} className="flex-1 py-3.5 rounded-xl font-bold text-base bg-green-600 text-white hover:bg-green-700 transition-colors">
            Add Item
          </button>
          <button onClick={onClose} className="flex-1 py-3.5 rounded-xl font-bold text-base border-2 border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Volunteers Tab ---
function VolunteersView({ volunteers, onUpdate }) {
  const assignments = [...new Set(volunteers.map(v => v.assignment).filter(Boolean))];

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{volunteers.length}</div>
          <div className="text-xs text-gray-500">Volunteers</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{volunteers.filter(v => v.confirmed).length}</div>
          <div className="text-xs text-gray-500">Confirmed</div>
        </div>
      </div>

      {/* By Assignment */}
      {assignments.length > 0 && (
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">By Assignment</h3>
          <div className="flex gap-2 flex-wrap">
            {assignments.map((a) => (
              <span key={a} className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">
                {a}: {volunteers.filter(v => v.assignment === a).length}
              </span>
            ))}
          </div>
        </div>
      )}

      {volunteers.length === 0 ? (
        <div className="text-center py-16 text-gray-400">No volunteers yet</div>
      ) : (
        <div className="space-y-2">
          {volunteers.map((v) => (
            <div
              key={v.id}
              className={`bg-white rounded-xl p-4 border-2 ${
                v.confirmed ? "border-green-200" : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-gray-900">{v.name}</div>
                  {v.assignment && (
                    <div className="text-sm text-gray-500">{v.assignment}</div>
                  )}
                </div>
                <button
                  onClick={() => onUpdate({ ...v, confirmed: !v.confirmed })}
                  className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                    v.confirmed
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {v.confirmed ? "✓ Confirmed" : "Unconfirmed"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddVolunteerForm({ onAdd, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", assignment: "", notes: "" });

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onAdd(form);
    onClose();
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-900 text-base focus:outline-none focus:border-blue-400";

  return (
    <div className="fixed inset-0 bg-black/50 z-[2000] flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-7 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-5">Add Volunteer</h3>

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Name *</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Full name" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Email</label>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="email@example.com" type="email" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Phone</label>
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="(920) 555-1234" />

        <label className="text-sm text-gray-500 font-semibold block mb-1.5 mt-4">Assignment</label>
        <input value={form.assignment} onChange={(e) => setForm({ ...form, assignment: e.target.value })} className={inputClass} placeholder="e.g. Registration, Raffle, 50/50" />

        <div className="flex gap-3 mt-6">
          <button onClick={handleSubmit} className="flex-1 py-3.5 rounded-xl font-bold text-base bg-green-600 text-white hover:bg-green-700 transition-colors">
            Add Volunteer
          </button>
          <button onClick={onClose} className="flex-1 py-3.5 rounded-xl font-bold text-base border-2 border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Playbook Tab ---
const REVENUE_IDEAS = [
  { title: "Mulligan Sales", desc: "$5-10 each or 'Mulligan Pack' (3 mulligans + 10 raffle tickets = $30)", potential: "$500-1,500" },
  { title: "Mega Raffle", desc: "$20/ticket or 3 for $50. Draw at dinner for big prize.", potential: "$3,000-8,000" },
  { title: "50/50 Drawing", desc: "Sell tickets all day, winner gets half the pot.", potential: "$500-1,500" },
  { title: "Closest to Pin / Longest Drive", desc: "$20 entry per contest.", potential: "$400-800" },
  { title: "Beat the Pro", desc: "Hire local pro, teams pay $50 to use their drive.", potential: "$1,000-2,500" },
  { title: "Helicopter Ball Drop", desc: "Sell numbered balls $20-50, closest to hole wins.", potential: "$2,000-5,000" },
  { title: "Wine/Beer Pull", desc: "$20 per pull from mystery bag (bottles $10-$100+ value).", potential: "$500-1,500" },
  { title: "Golden Tee", desc: "$10 to hit from 50 yards closer on select holes.", potential: "$500-1,500" },
  { title: "String Game", desc: "$5/foot of string to move ball closer to hole.", potential: "$500-1,500" },
  { title: "Whiskey & Cigar Hole", desc: "Sponsored tasting station. Great for photos/social.", potential: "Sponsor covers" },
];


function PlaybookView() {
  const [section, setSection] = useState("ideas");
  const [activeTemplate, setActiveTemplate] = useState("cold_email");
  const [copied, setCopied] = useState(false);

  const handleCopyTemplate = () => {
    const t = TEMPLATES[activeTemplate];
    const text = t.subject ? `Subject: ${t.subject}\n\n${t.body}` : t.body;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    { id: "ideas", label: "Revenue Ideas" },
    { id: "templates", label: "Templates" },
  ];

  return (
    <div className="space-y-4">
      {/* Section Pills */}
      <div className="flex gap-2 flex-wrap">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              section === s.id
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Revenue Ideas */}
      {section === "ideas" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500 mb-4">On-course revenue generators ranked by impact</p>
          {REVENUE_IDEAS.map((idea, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h4 className="font-bold text-gray-900">{idea.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{idea.desc}</p>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full whitespace-nowrap">
                  {idea.potential}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* Templates */}
      {section === "templates" && (
        <div>
          <div className="flex gap-2 flex-wrap mb-4">
            {Object.entries(TEMPLATES).map(([k, v]) => (
              <button
                key={k}
                onClick={() => { setActiveTemplate(k); setCopied(false); }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeTemplate === k
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            {TEMPLATES[activeTemplate].subject && (
              <div className="mb-4 pb-3 border-b border-gray-100">
                <span className="text-xs text-gray-400 font-semibold">SUBJECT: </span>
                <span className="text-sm text-gray-900">{TEMPLATES[activeTemplate].subject}</span>
              </div>
            )}
            <pre className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap break-words" style={{ fontFamily: "inherit" }}>
              {TEMPLATES[activeTemplate].body}
            </pre>
            <button
              onClick={handleCopyTemplate}
              className={`mt-4 w-full py-3 rounded-xl font-bold text-sm transition-colors ${
                copied ? "bg-green-600 text-white" : "bg-green-600 text-white"
              }`}
            >
              {copied ? "\u2713 Copied!" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main CRM Component ---
export default function CRM() {
  const { signOut } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [golfers, setGolfers] = useState([]);
  const [raffleItems, setRaffleItems] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddGolfer, setShowAddGolfer] = useState(false);
  const [showAddRaffle, setShowAddRaffle] = useState(false);
  const [showAddVolunteer, setShowAddVolunteer] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState("");
  const goal = 25000;

  // Load data from Supabase
  useEffect(() => {
    async function loadData() {
      // Load businesses
      const { data: bizData, error: bizError } = await supabase
        .from("businesses")
        .select("*")
        .order("name", { ascending: true });

      if (bizError) {
        console.error("Error loading businesses:", bizError);
      } else {
        setBusinesses(bizData || []);
      }

      // Load contacts
      const { data: contactData, error: contactError } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!contactError && contactData) {
        setContacts(contactData);
      }

      // Load golfers
      const { data: golferData } = await supabase
        .from("golfers")
        .select("*")
        .order("name", { ascending: true });
      if (golferData) setGolfers(golferData);

      // Load raffle items
      const { data: raffleData } = await supabase
        .from("raffle_items")
        .select("*")
        .order("item", { ascending: true });
      if (raffleData) setRaffleItems(raffleData);

      // Load volunteers
      const { data: volunteerData } = await supabase
        .from("volunteers")
        .select("*")
        .order("name", { ascending: true });
      if (volunteerData) setVolunteers(volunteerData);

      setLoaded(true);
    }
    loadData();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const updateBusiness = useCallback(async (updated) => {
    // Update local state immediately
    setBusinesses((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));

    // Update in Supabase
    const { error } = await supabase
      .from("businesses")
      .update({
        name: updated.name,
        category: updated.category,
        phone: updated.phone,
        email: updated.email,
        website: updated.website,
        address: updated.address,
        notes: updated.notes,
        status: updated.status,
        tier: updated.tier,
        amount: updated.amount,
        contact_date: updated.contactDate || updated.contact_date,
      })
      .eq("id", updated.id);

    if (error) {
      console.error("Error updating business:", error);
      showToast("Error saving changes");
    }
  }, []);

  const addBusiness = useCallback(async (newBiz) => {
    // Insert into Supabase
    const { data, error } = await supabase
      .from("businesses")
      .insert({
        name: newBiz.name,
        category: newBiz.category,
        phone: newBiz.phone,
        email: newBiz.email,
        website: newBiz.website,
        address: newBiz.address,
        notes: newBiz.notes,
        status: newBiz.status || "not_contacted",
        tier: newBiz.tier,
        amount: newBiz.amount || 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding business:", error);
      showToast("Error adding business");
      return;
    }

    setBusinesses((prev) => [data, ...prev]);
    showToast(`Added ${newBiz.name}`);
  }, []);

  const addContact = useCallback(async (newContact) => {
    const { data, error } = await supabase
      .from("contacts")
      .insert({
        email: newContact.email,
        name: newContact.name,
        phone: newContact.phone,
        company: newContact.company,
        type: newContact.type || "other",
        source: newContact.source || "manual",
        notes: newContact.notes,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding contact:", error);
      if (error.code === "23505") {
        showToast("Email already exists");
      } else {
        showToast("Error adding contact");
      }
      return;
    }

    setContacts((prev) => [data, ...prev]);
    showToast(`Added ${newContact.name || newContact.email}`);
  }, []);

  // Golfer CRUD
  const addGolfer = useCallback(async (newGolfer) => {
    const { data, error } = await supabase
      .from("golfers")
      .insert({
        name: newGolfer.name,
        email: newGolfer.email,
        phone: newGolfer.phone,
        company: newGolfer.company,
        team_name: newGolfer.team_name,
        num_players: newGolfer.num_players || 4,
        amount: parseFloat(newGolfer.amount) || 0,
        paid: newGolfer.paid || false,
        notes: newGolfer.notes,
        event_year: 2026,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding golfer:", error);
      showToast("Error adding golfer");
      return;
    }

    setGolfers((prev) => [data, ...prev]);
    showToast(`Added ${newGolfer.name}`);
  }, []);

  const updateGolfer = useCallback(async (updated) => {
    setGolfers((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
    await supabase.from("golfers").update(updated).eq("id", updated.id);
  }, []);

  // Raffle CRUD
  const addRaffleItem = useCallback(async (newItem) => {
    const { data, error } = await supabase
      .from("raffle_items")
      .insert({
        item: newItem.item,
        donor: newItem.donor,
        value: parseFloat(newItem.value) || 0,
        status: newItem.status || "pending",
        notes: newItem.notes,
        event_year: 2026,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding raffle item:", error);
      showToast("Error adding item");
      return;
    }

    setRaffleItems((prev) => [data, ...prev]);
    showToast(`Added ${newItem.item}`);
  }, []);

  const updateRaffleItem = useCallback(async (updated) => {
    setRaffleItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    await supabase.from("raffle_items").update(updated).eq("id", updated.id);
  }, []);

  // Volunteer CRUD
  const addVolunteer = useCallback(async (newVol) => {
    const { data, error } = await supabase
      .from("volunteers")
      .insert({
        name: newVol.name,
        email: newVol.email,
        phone: newVol.phone,
        assignment: newVol.assignment,
        confirmed: false,
        notes: newVol.notes,
        event_year: 2026,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding volunteer:", error);
      showToast("Error adding volunteer");
      return;
    }

    setVolunteers((prev) => [data, ...prev]);
    showToast(`Added ${newVol.name}`);
  }, []);

  const updateVolunteer = useCallback(async (updated) => {
    setVolunteers((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
    await supabase.from("volunteers").update(updated).eq("id", updated.id);
  }, []);

  const filteredBiz = businesses.filter((b) => {
    if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus !== "all" && b.status !== filterStatus) return false;
    if (filterCategory !== "all" && b.category !== filterCategory) return false;
    return true;
  });

  const tabConfig = [
    { id: "dashboard", label: "Home" },
    { id: "directory", label: "Sponsors" },
    { id: "golfers", label: "Golfers" },
    { id: "raffle", label: "Raffle" },
    { id: "volunteers", label: "Helpers" },
    { id: "playbook", label: "Ideas" },
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
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (tab === "golfers") setShowAddGolfer(true);
                  else if (tab === "raffle") setShowAddRaffle(true);
                  else if (tab === "volunteers") setShowAddVolunteer(true);
                  else if (tab === "contacts") setShowAddContact(true);
                  else setShowAddForm(true);
                }}
                className="px-5 py-2.5 rounded-xl font-bold text-base bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                + Add
              </button>
              <button
                onClick={signOut}
                className="px-4 py-2.5 rounded-xl font-bold text-base text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                title="Sign Out"
              >
                ↪
              </button>
            </div>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
            {tabConfig.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
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

        {tab === "contacts" && (
          <ContactsView contacts={contacts} />
        )}

        {tab === "golfers" && (
          <GolfersView golfers={golfers} onUpdate={updateGolfer} />
        )}

        {tab === "raffle" && (
          <RaffleView items={raffleItems} onUpdate={updateRaffleItem} />
        )}

        {tab === "volunteers" && (
          <VolunteersView volunteers={volunteers} onUpdate={updateVolunteer} />
        )}

        {tab === "playbook" && <PlaybookView />}
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

      {showAddContact && (
        <AddContactForm onAdd={addContact} onClose={() => setShowAddContact(false)} />
      )}

      {showAddGolfer && (
        <AddGolferForm onAdd={addGolfer} onClose={() => setShowAddGolfer(false)} />
      )}

      {showAddRaffle && (
        <AddRaffleForm onAdd={addRaffleItem} onClose={() => setShowAddRaffle(false)} />
      )}

      {showAddVolunteer && (
        <AddVolunteerForm onAdd={addVolunteer} onClose={() => setShowAddVolunteer(false)} />
      )}
    </div>
  );
}
