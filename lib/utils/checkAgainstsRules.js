export const checkAgainstRules = (payload, ruleName, ruleType) => {
  Object.keys(payload).forEach(parameter => {
    const typeChecker = {
      array: parameter => Array.isArray(parameter),
      integer: parameter => typeof parameter === 'number',
      string: parameter => {
        return typeof parameter === 'string'
      },
      object: parameter => parameter.constructor === Object,
    }

    if (!typeChecker[ruleType](payload[parameter])) {
      throw new Error('All parameter data types should be correct!')
    }
  })

  if (!payload.hasOwnProperty(ruleName)) {
    throw new Error(
      'All required parameters should be present and no extraneous parameters should be passed!'
    )
  }
}
