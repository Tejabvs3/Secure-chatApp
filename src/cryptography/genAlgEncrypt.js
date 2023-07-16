//import { randomBytes } from "crypto";
//import { randomInt } from "crypto";
//import { randomFillSync } from "crypto";
import { bbs } from "./BBS.js";
import { crossOver } from "./crossOver.js";
import { decrypt } from "./decrypt.js";
//const {bbs} = require('./BBS.js');
//const prompt = require('prompt-sync')({sigint: true});
//import prompt from 'prompt-sync';
//import dotenv from 'dotenv';
//dotenv.config();
//const input = prompt({ sigint: true });


const KEY_1 = parseInt(process.env.REACT_APP_KEY_1);
const KEY_2 = parseInt(process.env.REACT_APP_KEY_2);
const KEY_3 = parseInt(process.env.REACT_APP_KEY_3);
const KEY_4 = parseInt(process.env.REACT_APP_KEY_4);
const KEY_5 = parseInt(process.env.REACT_APP_KEY_5);
const KEY_6 = parseInt(process.env.REACT_APP_KEY_6);
const KEY_7 = parseInt(process.env.REACT_APP_KEY_7);
const KEY_8 = parseInt(process.env.REACT_APP_KEY_8);


export const genAlgEncrypt = (plainText) => {
    const KEY_9 = parseInt(process.env.REACT_APP_KEY_9)>=plainText.length?plainText.length-1:parseInt(process.env.REACT_APP_KEY_9);
// step 1

 //const plainText = "Narula";
//const plainText = "text text text welcome text hello hi iam typing some random test..sorry text to check whether its working or not..till now its working good but some text or characters are printing as they were which could potentillay lead to cracking so i need to correct before that first i need to find where the error then need to correct..so the update is better than i expected..but one bug is there in mutation :( let me fix that";
let bitPlainText = "";
function byteString(n) {
    if (n < 0 || n > 255 || n % 1 !== 0) {
        throw new Error(n + " does not fit in a byte");
    }
    n = n.toString(2); //console.log(n);
    while(n.length<KEY_1){
        n = '0'+n;
    }
   // console.log(n);
    return n;
  }
  let str = "";
  for(let i=0;i<plainText.length;i++){
    bitPlainText = bitPlainText + byteString(plainText.charCodeAt(i));
  }
  
  //console.log(bitPlainText);

/*if(bitPlainText==="010011100110000101110010011101010110110001100001"){
    console.log("true");
}
*/

// step 2

//may be write keys in .env file afer
//key.push(8); //key1
let n = bitPlainText.length;
let b = [];
 str = "";
for(let i=0;i<n;i++){
    str = str + bitPlainText[i];
    if(str.length===KEY_1){
        b.push(str);
        str = "";
    }
}
//console.log(b);


// step 3
//key.push(47);
//key.push(37);
//key.push(62);
let crossOverNums = [];
crossOverNums =  b.length===1?KEY_4%3:bbs(KEY_4, b.length-1,KEY_2,KEY_3,3);
console.log(crossOverNums);


let c = crossOver(crossOverNums,b,KEY_1);

console.log(c);

// step 4


let z = [];

//key.push(47);
//key.push(57);
//key.push(84);
//key.push(180);

z = bbs(84,b.length,47,57,180);
console.log(z);


for(let i=0;i<c.length;i++){
    c[i] = parseInt(c[i],2);   // need to check whether this correctly converts binary to decimal for other than 8 bit binary
}
console.log(c);

for(let i=0;i<c.length;i++){
    //c[i] = c[i]^(z[i]^(z[i]<<(c.length/2)));
    c[i] = c[i]^(z[i]^(z[i]<<(4)));
}
console.log(c);

// step 5 : mutation key 5 = 3
//key.push(3);
let flippedString = "";
let m = c[KEY_9].toString(2);
for(let i=1;i<m.length;i++){
    if(m[i]==='0') flippedString+='1';
    else flippedString+='0';
}
//key.push(flippedString.length);


c[KEY_9] = parseInt(m[0]+flippedString,2);
console.log(c[KEY_9],"flipped bit string");

/*
for(let i=0;i<c.length;i++){
    if(c[i]<0) c[i] = c[i]*(-1);
}
*/

//console.log(c);

// step 6   needs to be done properly...not sure about this step..!!!! now done i think!!!!


 let cipherText = "";
for(let i=0;i<plainText.length;i++){
    cipherText = cipherText + String.fromCharCode(c[i]);
}
console.log(cipherText);
console.log(plainText.length,cipherText.length);

//console.log(decrypt(cipherText));
//console.log(cipherText,"before return");
return cipherText;
}



//console.log(decrypt());
//return cipherText;
/*
let array = [];
for(let i=0;i<cipherText.length;i++){
    array.push(cipherText.charCodeAt([i]));
}
console.log(array);
if(JSON.stringify(array)===JSON.stringify(c)){
    console.log("true");
}
else console.log("false");
*/


// genAlgEncrypt.js   2431413911199249






