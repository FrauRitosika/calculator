module.exports = {
    
    preset: 'ts-jest', 
    testEnvironment: 'node',
    transform: {
        '^.+\\.jsx?$': 'babel-jest', 
      },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', 
    },
  };