export async function asyncForEach(operations: Array<Function>): Promise<string> {
  let proceed: boolean = true;
  let result: string = "";

  const callbackOperation = async (returnProceed: boolean, returnValue: string, operation: Function) => {
    result += returnValue;
    result += returnProceed ? " > " : " |";
    proceed = returnProceed;
  };

  for (const operation of operations) {
    if (proceed) {
      await operation(proceed, callbackOperation);
    }
  };
  return result;
}

// no timeout, proceed is true
export async function alpha(proceed: boolean, callback: Function): Promise<void> { 
  callback(true, "alpha");
}

// no timeout, proceed is false
export async function beta(proceed: boolean, callback: Function): Promise<void>  { 
  callback(false, "beta");
}

// awaits a promise containing a timeout, proceed is true
export async function gamma(proceed: boolean, callback: Function): Promise<void> {
  const timeout = () => new Promise(
    resolve => setTimeout(() => resolve(callback(true, "gamma")), 1000)
  );
  await timeout();
}

// awaits a promise containing a timeout, proceed is false
export async function delta(proceed: boolean, callback: Function): Promise<void> { 
  const timeout = () => new Promise(
    resolve => setTimeout(() => resolve(callback(false, "delta")), 1000)
  );
  await timeout();
}

