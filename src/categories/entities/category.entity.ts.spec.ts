import { Category } from './category.entity.ts.js';

describe('Category', () => {
  it('should be defined', () => {
    expect(new Category()).toBeDefined();
  });
});
