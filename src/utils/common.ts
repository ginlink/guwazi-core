/**
 * check the input config is valid
 * config must be object such as { xxx: 'xxx' }
 * && can't be array
 * @param config
 * @returns
 */
export const isInputConfigValid = (config: any): boolean => {
  if (typeof config === 'object' && !Array.isArray(config) && Object.keys(config).length > 0) {
    return true
  }
  return false
}
