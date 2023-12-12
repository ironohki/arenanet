import {describe, expect, test} from '@jest/globals';
import {validate, validation_report, schema_definition} from './6-validate';

const data_one = {
  "alpha": "hello world",
  "beta": 7,
  "gamma": true
};

const data_two = {
  "alpha": "goodbye land",
  "beta": "seven",
  "gamma": true
};

const data_three = {
  "alpha": "greetings realm"
};

const data_four = {
  "cat": "meow",
  "dog": 20,
  "bird": "tweet",
  "fish": true
};

const data_five = {
  "cat": "purr",
  "dog": 75,
  "bird": "ribbit",
  "fish": false
}

const schema_a: Array<schema_definition> = [
  {"key": "alpha", "type": "string"},
  {"key": "beta", "type": "number"},
  {"key": "gamma", "type": "boolean"}
];

const schema_b: Array<schema_definition> = [
  {"key": "cat", "type": "string"},
  {"key": "dog", "type": "number", "value": 20},
  {"key": "bird", "type": "string", "value": "tweet"},
  {"key": "fish", "type": "boolean"}
];

describe('Validate that data in an object matches a schema definition.', () => {
  test('Valid data in format of schema_a is reported as valid.', () => {
    const output = validate(data_one,schema_a);
    expect(output.valid).toBe(true);
    expect(output.report).toContain("Item alpha exists and is of type string.");
    expect(output.report).toContain("Item beta exists and is of type number.");
    expect(output.report).toContain("Item gamma exists and is of type boolean.");
  });
  test('Data in format of schema_a with one wrong typ[e is reported as not valid.', () => {
    const output = validate(data_two,schema_a);
    expect(output.valid).toBe(false);
    expect(output.report).toContain("Item alpha exists and is of type string.");
    expect(output.report).toContain("Item beta is not of type number.");
    expect(output.report).toContain("Item gamma exists and is of type boolean.");
  });
  test('Data in format of schema_a with missing elements is reported as not valid.', () => {
    const output = validate(data_three,schema_a);
    expect(output.valid).toBe(false);
    expect(output.report).toContain("Item alpha exists and is of type string.");
    expect(output.report).toContain("Item beta is missing.");
    expect(output.report).toContain("Item gamma is missing.");
  });
  test('Data in format of schema_b with valid elements and valid values is reported as valid.', () => {
    const output = validate(data_four,schema_b);
    expect(output.valid).toBe(true);
    expect(output.report).toContain("Item cat exists and is of type string.");
    expect(output.report).toContain("Item dog is of value 20, which matches required value.");
    expect(output.report).toContain("Item bird is of value tweet, which matches required value.");
    expect(output.report).toContain("Item fish exists and is of type boolean.");
  });
  test('Data in format of schema_b with valid elements and invalid values is reported as not valid.', () => {
    const output = validate(data_five,schema_b);
    expect(output.valid).toBe(false);
    expect(output.report).toContain("Item cat exists and is of type string.");
    expect(output.report).toContain("Item dog is value 75, which does not match required value 20.");
    expect(output.report).toContain("Item bird is value ribbit, which does not match required value tweet.");
    expect(output.report).toContain("Item fish exists and is of type boolean.");
  });
});




