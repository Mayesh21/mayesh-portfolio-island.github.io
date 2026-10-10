import {
  getDifficultyLevel,
  getProjectYearRange,
  projectOverlapsYearRange,
} from '../projectUtils';

describe('project utilities', () => {
  it('parses single years and year ranges consistently', () => {
    expect(getProjectYearRange('2024')).toEqual({ start: 2024, end: 2024 });
    expect(getProjectYearRange('2024 - 2026')).toEqual({ start: 2024, end: 2026 });
    expect(getProjectYearRange('unknown')).toEqual({ start: null, end: null });
  });

  it('matches projects whose timeline overlaps a selected year window', () => {
    const project = { date: '2024 - 2026' };

    expect(projectOverlapsYearRange(project, '2025', '2025')).toBe(true);
    expect(projectOverlapsYearRange(project, '2027', '2027')).toBe(false);
    expect(projectOverlapsYearRange(project, '', '')).toBe(true);
  });

  it('returns a safe default for missing difficulty values', () => {
    expect(getDifficultyLevel()).toBe(1);
  });
});
