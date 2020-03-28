import generateUniqueId from '../../src/app/utils/generateUniqueId';

describe('Generate Unique ID', () => {
  it('should be generate unique ID', () => {
    const id = generateUniqueId();
    expect(id).toHaveLength(8);
  });
});
