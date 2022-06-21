import UserBuilder from '../utils/builders/user-builder';

export const user1Id = '123';
export const user1 = new UserBuilder().withId(user1Id).build();
export const user2 = new UserBuilder().withId('456').build();
export const user3 = new UserBuilder().withId('789').build();
