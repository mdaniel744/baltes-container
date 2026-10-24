import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { LEGAL_CONTENT, LEGAL_ROUTES, LEGAL_REVIEW_REQUIRED, getLegalContent } from "../src/lib/i18n/legalContent.js";
import { LEGAL_COMPANY } from "../src/lib/legalCompany.js";

test("all eight documents have matching sections in German, Czech and Dutch", () => {
  assert.deepEqual(Object.keys(LEGAL_CONTENT), ["de", "cs", "nl"]);
  assert.equal(Object.keys(LEGAL_ROUTES).length, 8);
  for (const content of Object.values(LEGAL_CONTENT)) {
    for (const key of Object.keys(LEGAL_ROUTES)) {
      const doc = content[key];
      assert.ok(doc.title && doc.intro && content.common.labels[key], key);
      assert.deepEqual(doc.sections.map(s => s.id), LEGAL_CONTENT.de[key].sections.map(s => s.id));
      assert.equal(new Set(doc.sections.map(s => s.id)).size, doc.sections.length);
      for (const section of doc.sections) {
        assert.match(section.id, /^[a-z]+$/);
        assert.ok(section.title && section.paragraphs.length);
        assert.ok(section.paragraphs.every(p => typeof p === "string" && p.trim()));
      }
    }
  }
  assert.equal(getLegalContent("unknown"), LEGAL_CONTENT.de);
});

test("policy navigation resolves to real, correctly bound local routes", () => {
  for (const [key, route] of Object.entries(LEGAL_ROUTES)) {
    const file = new URL(`../src/app/(site)${route}/page.jsx`, import.meta.url);
    assert.ok(existsSync(file), route);
    assert.ok(readFileSync(file, "utf8").includes(`documentKey="${key}"`), route);
  }
});

test("no policy publication-date fields or date labels are rendered", () => {
  for (const content of Object.values(LEGAL_CONTENT)) {
    assert.equal("updated" in content.common, false);
    for (const key of Object.keys(LEGAL_ROUTES)) {
      assert.equal("updatedAt" in content[key], false);
      assert.equal("publishedAt" in content[key], false);
    }
  }
  for (const component of ["LegalPage", "LocalizedLegalDocument"]) {
    const source = readFileSync(new URL(`../src/components/${component}.jsx`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /updatedAt|publishedAt|common\.updated/);
  }
  // A customer-entered date remains necessary on the withdrawal form.
  for (const content of Object.values(LEGAL_CONTENT)) {
    assert.match(content.withdrawal.sections.find(s => s.id === "form").paragraphs.join(" "), /Datum/);
  }
});

test("confirmed Baltes identity is consistent in every language", () => {
  assert.equal(LEGAL_COMPANY.managingDirector, "Thomas Wolfgang");
  assert.equal(LEGAL_COMPANY.vatId, "DE137858974");
  for (const content of Object.values(LEGAL_CONTENT)) {
    const imprint = JSON.stringify(content.imprint);
    assert.ok(imprint.includes(LEGAL_COMPANY.vatId));
    assert.ok(imprint.includes(LEGAL_COMPANY.managingDirector));
    assert.ok(imprint.includes(LEGAL_COMPANY.email));
  }
  assert.doesNotMatch(JSON.stringify(LEGAL_CONTENT), /olborg|diecontainers|Putzbrunn|Poddębice|DE330443785|\[VERIFY\]/i);
});

test("30-day offer and Baltes-paid return transport stay separate from statutory rights", () => {
  const freightStatements = { de: /Baltes Container GmbH übernimmt/, cs: /Baltes Container GmbH hradí/, nl: /Baltes Container GmbH draagt/ };
  for (const [locale, content] of Object.entries(LEGAL_CONTENT)) {
    assert.match(content.returns.sections.find(s => s.id === "voluntary").paragraphs.join(" "), /30/);
    assert.match(content.withdrawal.sections.find(s => s.id === "period").paragraphs.join(" "), /14/);
    const costs = content.returns.sections.find(s => s.id === "costs").paragraphs[0];
    assert.match(costs, freightStatements[locale]);
    assert.equal(costs, content.withdrawal.sections.find(s => s.id === "transport").paragraphs[0]);
    assert.ok(content.returns.sections.find(s => s.id === "defects"));
  }
});

test("open legal and production facts remain visibly marked for review", () => {
  assert.equal(LEGAL_REVIEW_REQUIRED, true);
  for (const content of Object.values(LEGAL_CONTENT)) {
    assert.ok(content.common.draft);
    for (const key of ["imprint", "privacy", "cookies", "shipping", "payments", "terms"]) {
      assert.ok(content[key].reviewItems.length, key);
    }
  }
});

test("legacy legal screens cannot reintroduce conflicting text or dates", () => {
  const screens = { AGB: "terms", Datenschutz: "privacy", Impressum: "imprint", Widerruf: "withdrawal", RueckgabeErstattung: "returns", Zahlungsarten: "payments" };
  for (const [screen, key] of Object.entries(screens)) {
    const source = readFileSync(new URL(`../src/screens/${screen}.jsx`, import.meta.url), "utf8");
    assert.ok(source.includes(`documentKey="${key}"`));
    assert.doesNotMatch(source, /updatedAt|\[VERIFY\]|Juli 2026/);
  }
});

test("SDK analytics are disclosed separately from essential cart storage", () => {
  for (const content of Object.values(LEGAL_CONTENT)) {
    assert.match(content.cookies.sections.find(s => s.id === "analytics").paragraphs.join(" "), /base44_analytics_session_id/);
    assert.match(content.privacy.sections.find(s => s.id === "browser").paragraphs.join(" "), /Base44/);
  }
});
