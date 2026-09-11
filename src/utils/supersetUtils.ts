import type { WorkoutExercise } from '../types';

/**
 * Recomputes clean tactical numbering for workout exercises.
 * - Single exercises: 01, 02, 03...
 * - Grouped superset exercises: 01A, 01B, 02A, 02B...
 * If a superset group has fewer than 2 exercises, the supersetGroupId is cleared
 * and it turns into a standard single exercise.
 */
export function computeSupersetLabels(exercises: WorkoutExercise[]): WorkoutExercise[] {
  if (!exercises || exercises.length === 0) return [];

  // Count occurrences of each supersetGroupId
  const groupCounts: Record<string, number> = {};
  exercises.forEach(ex => {
    if (ex.supersetGroupId) {
      groupCounts[ex.supersetGroupId] = (groupCounts[ex.supersetGroupId] || 0) + 1;
    }
  });

  let mainIndex = 1;
  let currentGroupId: string | null = null;
  let subIndex = 0;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return exercises.map((ex, idx) => {
    const gid = ex.supersetGroupId;

    // If group only has 1 exercise, it is not a valid superset anymore
    if (!gid || (groupCounts[gid] || 0) < 2) {
      currentGroupId = null;
      const label = String(mainIndex++).padStart(2, '0');
      return {
        ...ex,
        supersetGroupId: undefined,
        supersetLabel: label
      };
    }

    if (gid !== currentGroupId) {
      currentGroupId = gid;
      subIndex = 0;
    } else {
      subIndex++;
    }

    const prefix = String(mainIndex).padStart(2, '0');
    const letter = alphabet[subIndex] || `_${subIndex + 1}`;
    const label = `${prefix}${letter}`;

    // If this is the last exercise in the current group, advance mainIndex for next exercises
    const isLastInGroup = (idx === exercises.length - 1) || (exercises[idx + 1]?.supersetGroupId !== gid);
    if (isLastInGroup) {
      mainIndex++;
    }

    return {
      ...ex,
      supersetGroupId: gid,
      supersetLabel: label
    };
  });
}
