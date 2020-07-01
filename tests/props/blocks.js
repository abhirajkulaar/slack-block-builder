const { props, paramMap } = require('../../src/utility/constants');
const valid = require('../mocks/valid-prop-data-mapping');
const invalid = require('../mocks/invalid-prop-data-mapping');
const checks = require('../checks');

module.exports = (params) => {
  const config = {
    ...params,
    valid: valid.blocks,
    invalid: invalid.blocks,
    method: props.blocks,
    property: props.blocks,
    param: paramMap.blocks,
    expectArray: true,
  };

  return [
    checks.appendableProperty(config),
    checks.invalidValue(config),
    checks.builtChildBuild(config),
  ];
};