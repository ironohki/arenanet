export function validate(data: any, schema: Array<schema_definition>): validation_report {
  let output_report: string = "";
  let output_is_valid: boolean = true;

  const append_output_report = (newLine: string) => {
    output_report += output_report === "" ? "" : "\n";
    output_report += newLine;
  }

  schema.forEach((schema_item) => {
    if (data[schema_item.key] === undefined) {
      // the element defined by the schema is missing from the data.
      output_is_valid = false;
      append_output_report(`Item ${schema_item.key} is missing.`);
    } else if (typeof data[schema_item.key] !== schema_item.type) {
      // the element in the data is of a different type than the schema definition.
      output_is_valid = false;
      append_output_report(`Item ${schema_item.key} is not of type ${schema_item.type}.`);
    } else {
      if (schema_item.value !== undefined) {
        // an optional expected value has been defined by the schema
        if (schema_item.value === data[schema_item.key]) {
          // the value in the data matches the value required by schema.
          append_output_report(`Item ${schema_item.key} is of value ${data[schema_item.key]}, which matches required value.`);
        } else {
          // the value in the data does not match the value required by schema.
          output_is_valid = false;
          append_output_report(`Item ${schema_item.key} is value ${data[schema_item.key]}, which does not match required value ${schema_item.value}.`);
        }
      } else {
        // the value exists and is of a valid type
        append_output_report(`Item ${schema_item.key} exists and is of type ${schema_item.type}.`);
      }
    }
  });

  return { "valid": output_is_valid, "report": output_report };
}

export interface validation_report {
  "valid": boolean, 
  "report": string
}

export interface schema_definition {
  "key": string,
  "type": string,
  "value"? : any
}
