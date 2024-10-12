export const orderProperties = {
  id: { type: 'number' },
  number: { type: 'number' },
  status: { type: 'string' },
  receivedAt: { type: 'string' },
  updatedAt: { type: 'string' },
  payment: { type: 'string' },
  userId: { type: 'number' }
};

export const updateOrderProperties = {
  status: { type: 'string' },
}

export const validationProperties = {
  statusCode: { type: 'number' },
  error: { type: 'string' },
  message: { type: 'string' }
}
