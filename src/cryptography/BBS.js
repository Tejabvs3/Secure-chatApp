// import bigInt from 'big-integer';
//import prompt from 'prompt-sync';
//const input = prompt({ sigint: true });
//var bigInt = require("big-integer");



 export const bbs = (seed, length,p,q, mod) => {
  //const p = 47;//32843; //prompt('Enter a prime number p: ');
   //const p =  30000000091;
  //const q = 37;//32887; //prompt('Enter a prime number q: '); 
  //const q = 40000000003;
  //if(p % 4 !== 3 || q % 4 !== 3) throw new Error('p and q must be prime numbers congruent to 3 (mod 4)');
  if(p === q) throw new Error('p and q must be distinct')
  if(p%q===0 || q%p===0) throw new Error('p and q should be relative primes');
  if(p * q < 256) throw new Error('p * q must be greater than 256');
  if(seed % p === 0 || seed % q === 0) throw new Error('seed must be relatively prime to p and q');
  if(length < 1) throw new Error('length must be greater than 0');
  //if(length > 100) throw new Error('length must be less than 100');
  
  //const n = bigInt(p).multiply(bigInt(q));
  const n = p*q;
  let x0 = seed % n;

  let randomInt = [];
  for (let i = 0; i < length; i++) {
    //x0 = bigInt(x0).multiply(bigInt(x0)) % n;
    x0 = x0*x0 % n;
    mod!==0?randomInt.push(x0%mod):randomInt.push(x0);
   // console.log((x0%2));
  }
  return randomInt;

 }





 //bbs(2188162291, 10);
 //bbs(5, 10);
//exports.bbs = bbs;