import test from "node:test";
import assert from "node:assert/strict";
import { positiveMeasurement, formatMeasurement, getProductDimensions } from "../src/lib/productDimensions.js";
import { TECHNICAL_CONTENT, getTechnicalContent } from "../src/lib/i18n/technicalContent.js";
import { demoProducts } from "./data/demo-products.mjs";
import { diagramPoints, getDimensionDiagram } from "../src/lib/dimensionDiagram.js";

test("every sample uses its own exterior and interior dimensions without assumptions", () => {
  for (const product of demoProducts) {
    for (const mode of ["exterior", "interior"]) {
      const prefix = mode === "exterior" ? "ext" : "int";
      const dimensions = getProductDimensions(product, mode);
      assert.deepEqual(dimensions.map(({ axis }) => axis), ["length", "width", "height"]);
      for (const { axis, value } of dimensions) assert.equal(value, product[`${prefix}_${axis}_mm`]);
    }
  }
});

test("High Cube and special sizes keep their stored height and length", () => {
  const cube = demoProducts.find(({ sku }) => sku === "DEMO-020");
  const special = demoProducts.find(({ sku }) => sku === "DEMO-017");
  assert.equal(getProductDimensions(cube)[2].value, cube.ext_height_mm);
  assert.notEqual(cube.ext_height_mm, 2591);
  assert.equal(getProductDimensions(special)[0].value, special.ext_length_mm);
  assert.notEqual(special.ext_length_mm, 6058);
});

test("missing and invalid measurements remain unknown instead of becoming standard dimensions", () => {
  for (const value of [null, undefined, 0, -1, "", " ", "unknown", NaN, Infinity, true, false]) {
    assert.equal(positiveMeasurement(value), null);
    assert.equal(formatMeasurement(value, "de", "m", 1000), "—");
  }
  assert.deepEqual(getProductDimensions({ size_ft: "40" }).map(({ value }) => value), [null, null, null]);
  assert.equal(positiveMeasurement("6058"), 6058);
});

test("localized measurements preserve millimetre precision and correct units", () => {
  for (const locale of ["de", "cs", "nl"]) {
    assert.equal(formatMeasurement(6058, locale, "m", 1000), "6,058 m");
    assert.equal(formatMeasurement(76.4, locale, "m³"), "76,4 m³");
  }
  assert.equal(formatMeasurement(12192, "de", "m", 1000), "12,192 m");
  assert.equal(formatMeasurement(30480, "de", "kg"), "30.480 kg");
});

test("technical overview labels cover German, Czech and Dutch", () => {
  for (const locale of ["de", "cs", "nl"]) {
    assert.deepEqual(Object.keys(TECHNICAL_CONTENT[locale]), Object.keys(TECHNICAL_CONTENT.de));
    assert.ok(Object.values(TECHNICAL_CONTENT[locale]).every((value) => value.length > 0));
  }
  assert.equal(getTechnicalContent("unknown"), TECHNICAL_CONTENT.de);
});

test("3D volume geometry fits the drawing and keeps guides attached to the correct axes", () => {
  for (const product of demoProducts) {
    for (const mode of ["exterior", "interior"]) {
      const { points, guides, complete } = getDimensionDiagram(getProductDimensions(product, mode));
      assert.equal(complete, true);
      assert.equal(Object.keys(points).length, 8);
      for (const [x, y] of Object.values(points)) {
        assert.ok(Number.isFinite(x) && Number.isFinite(y));
        assert.ok(x >= 100 && x <= 460);
        assert.ok(y >= 50 && y <= 236);
      }
      assert.deepEqual(guides.map(({ axis }) => axis), ["length", "width", "height"]);
      assert.deepEqual(guides[0].from, points.a);
      assert.deepEqual(guides[0].to, points.b);
      assert.deepEqual(guides[1].from, points.b);
      assert.deepEqual(guides[1].to, points.c);
      assert.deepEqual(guides[2].from, points.a);
      assert.deepEqual(guides[2].to, points.A);
      assert.equal(diagramPoints(points, ["a", "b"]).split(" ").length, 2);
      for (const { from, to, offset, labelOffset } of guides) {
        const label = from.map((value, i) => (value + to[i]) / 2 + offset[i] + labelOffset[i]);
        assert.ok(label[0] >= 40 && label[0] <= 510);
        assert.ok(label[1] >= 20 && label[1] <= 300);
      }
    }
  }
});

test("3D projection preserves real size ratios instead of drawing every product identically", () => {
  const dims = (length, width, height) => [length, width, height].map((value) => ({ value }));
  const normalizedHeight = ({ points: p }) => Math.abs(p.a[1] - p.A[1]) / Math.hypot(p.b[0] - p.a[0], p.b[1] - p.a[1]);
  const standard = getDimensionDiagram(dims(6058, 2438, 2591));
  const long = getDimensionDiagram(dims(12192, 2438, 2591));
  const tall = getDimensionDiagram(dims(6058, 2438, 2896));
  assert.ok(normalizedHeight(long) < normalizedHeight(standard));
  assert.ok(normalizedHeight(tall) > normalizedHeight(standard));
  assert.ok(Math.abs(normalizedHeight(long) / normalizedHeight(standard) - 6058 / 12192) < 1e-10);
});

test("missing dimensions use only a generic visual without inventing measurement values", () => {
  const dimensions = getProductDimensions({ ext_length_mm: 6058 });
  const result = getDimensionDiagram(dimensions);
  assert.equal(result.complete, false);
  assert.deepEqual(dimensions.map(({ value }) => value), [6058, null, null]);
  assert.deepEqual(result.points, getDimensionDiagram(getProductDimensions({})).points);
  assert.ok(Object.values(result.points).flat().every(Number.isFinite));
});
