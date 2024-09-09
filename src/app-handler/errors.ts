class ValidationExpressionError extends Error {
    constructor() {
      super('Выражение содержит ошибку'); 
      this.name = "ValidationExpressionError"; 
    }
  }

  export {ValidationExpressionError};