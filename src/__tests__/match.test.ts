import { match } from "../match";

test("match() should return 0 for empty match string", () => {
    expect(match("asdasd", "")).toBe(0);
});

test("match() should return 0 for empty test string", () => {
    expect(match("", "asdasd")).toBe(0);
});

test("match() should return 0 for unmatching chars", () => {
    expect(match("a", "d")).toBe(0);
});

test("match() should return 0 for unmatching strings", () => {
    expect(match("abc", "def")).toBe(0);
});

test("match() should return position of first unmatch", () => {
    expect(match("abc", "abd")).toBe(2);
});
