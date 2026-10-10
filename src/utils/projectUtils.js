export const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'beginner': return 'bg-green-100 text-green-800';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in progress': return 'bg-blue-100 text-blue-800';
    case 'planned': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getDifficultyLevel = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'beginner': return 1;
    case 'intermediate': return 2;
    case 'advanced': return 3;
    default: return 1;
  }
};

export const getProjectYearRange = (date) => {
  const years = String(date ?? '').match(/\d{4}/g)?.map(Number) ?? [];
  if (years.length === 0) return { start: null, end: null };

  const start = years[0];
  const end = years[1] ?? start;
  return { start: Math.min(start, end), end: Math.max(start, end) };
};

export const projectOverlapsYearRange = (project, startYear, endYear) => {
  const { start, end } = getProjectYearRange(project?.date);
  if (start === null || end === null) return false;

  const selectedStart = startYear ? Number(startYear) : -Infinity;
  const selectedEnd = endYear ? Number(endYear) : Infinity;
  return start <= selectedEnd && end >= selectedStart;
};
