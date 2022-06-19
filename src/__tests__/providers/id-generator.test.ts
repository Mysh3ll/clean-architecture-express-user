import { UuidGenerator } from '../../secondary-driven-adapters/services/uuid-generator';

describe('IdGeneratorProvider', () => {
  const idGeneratorProvider = new UuidGenerator();

  it('Should return a random id', () => {
    // Arrange
    const id = '12345678901234567890123456789012';
    jest.spyOn(idGeneratorProvider, 'generate').mockImplementation(() => id);

    // Act
    const expectedResult = idGeneratorProvider.generate();

    // Assert
    expect(id).toEqual(expectedResult);
  });
});
