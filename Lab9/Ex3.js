attributes  =  "Dan;50;50.5;-49.5";
let peices = attributes.split(';');
for(let part of peices) {
    console.log(`${part} is type ${typeof part}`);
}

let invert = peices.join(',');
console.log(invert);