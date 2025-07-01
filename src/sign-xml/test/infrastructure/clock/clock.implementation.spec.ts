import { ClockImplement } from "../../../infrastructure/clock/clock.implement";

describe("ClockImplement", () => {
  let clock: ClockImplement;

  beforeEach(() => {
    clock = new ClockImplement();
  });

  it("should return ISO string adjusted to UTC-5 (if not already)", () => {
    const original = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = () => 0;

    const result = clock.nowISO();

    Date.prototype.getTimezoneOffset = original;

    expect(result).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-05:00/);
  });

  it("should not adjust if already in UTC-5", () => {
    const original = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = () => -300;

    const result = clock.nowISO();

    Date.prototype.getTimezoneOffset = original;

    expect(result).toMatch(/-05:00$/);
  });
});
