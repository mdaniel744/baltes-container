import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { getPageContent } from "@/lib/i18n/pageContent";
import { LEGAL_COMPANY } from "@/lib/legalCompany";

export default function Contact() {
  const { locale } = useLocale();
  const copy = getPageContent(locale).contact;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "Allgemeine Anfrage", message: "" });
  const set = (k, v) => setForm({ ...form, [k]: v });

  return (
    <div className="min-h-screen">
      <div className="bg-card/50">
        <div className="max-w-terminal mx-auto px-6 page-heading-space">
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight">{copy.title}</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            {copy.intro}
          </p>
        </div>
      </div>

      <div className="max-w-terminal mx-auto px-6 page-heading-space">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div>
            <SectionHeading title={copy.directTitle} />
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-foreground shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold mb-1">{copy.phone}</h3>
                  <a href={LEGAL_COMPANY.phoneHref} className="text-muted-foreground hover:text-primary transition-colors">{LEGAL_COMPANY.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-foreground shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold mb-1">{copy.email}</h3>
                  <a href="mailto:contact@baltescontainer.com" className="text-muted-foreground hover:text-primary transition-colors">contact@baltescontainer.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-foreground shrink-0 mt-1" />
                <div>
                  <h3 className="font-heading font-bold mb-1">{copy.hours}</h3>
                  <p className="text-muted-foreground">{copy.hoursValue}</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-heading font-bold mb-4">{copy.locationsTitle}</h3>
              <div className="space-y-4">
                {copy.locations.map((loc) => (
                  <div key={loc.name} className="flex items-start gap-3 bg-card p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                    <MapPin className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{loc.name}</div>
                      <div className="text-sm text-muted-foreground">{loc.address}</div>
                      <div className="font-mono-tech text-xs text-primary mt-1">{loc.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            {sent ? (
              <div className="bg-card p-10 text-center shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
                <div className="w-14 h-14 mx-auto flex items-center justify-center bg-success text-success-foreground mb-5">
                  <Check className="w-7 h-7" />
                </div>
                <h2 className="font-heading text-2xl font-extrabold mb-2">{copy.sentTitle}</h2>
                <p className="text-muted-foreground">{copy.sentCopy}</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5 bg-card p-8 shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
                <h2 className="font-heading text-xl font-extrabold">{copy.formTitle}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label={copy.name} value={form.name} onChange={(v) => set("name", v)} required />
                  <Input label={copy.email} value={form.email} onChange={(v) => set("email", v)} type="email" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label={copy.telephone} value={form.phone} onChange={(v) => set("phone", v)} />
                  <div>
                    <label className="block font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mb-2">{copy.subject}</label>
                    <select value={form.subject} onChange={(e) => set("subject", e.target.value)} className="w-full bg-input px-4 py-3 text-sm text-foreground shadow-inner">
                      {copy.subjects.map((subject) => <option key={subject.value} value={subject.value}>{subject.label}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mb-2">{copy.message}</label>
                  <textarea value={form.message} onChange={(e) => set("message", e.target.value)} rows={5} required className="w-full bg-input px-4 py-3 text-sm text-foreground shadow-inner placeholder:text-muted-foreground" placeholder={copy.placeholder} />
                </div>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" required className="mt-1 w-4 h-4 accent-[hsl(var(--primary))]" />
                  <span>{copy.privacy}</span>
                </label>
                <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors">
                  <Send className="w-5 h-5" /> {copy.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required }) {
  return (
    <div>
      <label className="block font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required className="w-full bg-input px-4 py-3 text-sm text-foreground shadow-inner placeholder:text-muted-foreground" />
    </div>
  );
}
