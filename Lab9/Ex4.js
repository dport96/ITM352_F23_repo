function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}

attributes  =  "Dan;50;50.5;-49.5";
let peices = attributes.split(';');
for(let part of peices) {
    console.log(`${part} is a quantity ${isNonNegInt(part, true)}`);
}