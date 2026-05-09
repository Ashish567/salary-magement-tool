import { expect, test } from 'vitest';
import theme from '@/lib/theme';

test('design system theme should export primary color token', () => {
  // This will fail until src/lib/theme.ts is implemented
  expect(theme).toHaveProperty('primary');
});
