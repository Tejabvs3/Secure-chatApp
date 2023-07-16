//import dotenv from 'dotenv';
import { bbs } from "./BBS.js";
import { crossOver } from "./crossOver.js";
//import prompt from 'prompt-sync';
//import { parse } from "path";
//const input = prompt({ sigint: true });

//dotenv.config();

const KEY_1 = parseInt(process.env.REACT_APP_KEY_1);
const KEY_2 = parseInt(process.env.REACT_APP_KEY_2);
const KEY_3 = parseInt(process.env.REACT_APP_KEY_3);
const KEY_4 = parseInt(process.env.REACT_APP_KEY_4);
const KEY_5 = parseInt(process.env.REACT_APP_KEY_5);
const KEY_6 = parseInt(process.env.REACT_APP_KEY_6);
const KEY_7 = parseInt(process.env.REACT_APP_KEY_7);
const KEY_8 = parseInt(process.env.REACT_APP_KEY_8);


export const decrypt = (cipherText) => {
if(cipherText===null) return "nothing to decrypt";
const KEY_9 = parseInt(process.env.REACT_APP_KEY_9)>=cipherText.length?cipherText.length-1:parseInt(process.env.REACT_APP_KEY_9);
//console.log(cipherText.length);

// step 1: charcodes of each character in cipherText
let c = [];

for(let i=0;i<cipherText.length;i++){
    c[i] = cipherText.charCodeAt(i);
}
console.log(c);
/*
for(let i=0;i<c.length;i++){
    if(c[i]<0) c[i] = c[i]*(-1);
}
*/
//step 2 : Mutation 
let flippedString = "";
console.log(KEY_9,c[KEY_9]);
let m = c[KEY_9].toString(2);
console.log(m);
for(let i=1;i<m.length;i++){
    if(m[i]==='0') flippedString+='1';
    else flippedString+='0';
}
console.log(parseInt(flippedString,2));
console.log(c[KEY_9],"flipped bit string");
c[KEY_9] = parseInt(m[0]+flippedString,2);


  
  //step 3 :
  let z = [];
    z = bbs(KEY_7, c.length, KEY_5, KEY_6, KEY_8);
    for(let i=0;i<c.length;i++){
        c[i] = c[i]^(z[i]^(z[i]<<(4)));
    }

    //step 4 :

    let crossOverNums = [];
    crossOverNums =  c.length===1?KEY_4%3:bbs(KEY_4, c.length-1,KEY_2,KEY_3,3);
    console.log(crossOverNums);
    if(c.length!==1) crossOverNums.reverse();
    c.reverse();
    console.log(c);
    for(let i=0;i<c.length;i++){
        c[i] = c[i].toString(2);
        while(c[i].length<KEY_1){
            c[i] = '0'+c[i];
        }
    }
    console.log(c);
    let b = crossOver(crossOverNums,c,KEY_1);
    b.reverse();
    console.log(b);
    //console.log(b);

    let plainText = "";
    for(let i=0;i<b.length;i++){
        plainText = plainText + String.fromCharCode(parseInt(b[i],2));
    }
    //console.log(plainText);
    return plainText;

}















/*
async function addKeyValuePair() {
    try {
      // Read the existing .env file
      const envData = await fs.readFile('.env');
  
      // Convert the .env file content to an object
      const envConfig = parse(envData);
  
      // Add the new key-value pair to the object
      envConfig.KEY_10 = flippedString.length.toString();
  
      // Convert the object back to a string
      const updatedEnvContent = Object.entries(envConfig)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
  
      // Write the updated content back to the .env file
      await fs.writeFile('.env', updatedEnvContent);
      //console.log(decrypt(cipherText));
  
      console.log('.env file updated successfully!');
    } catch (error) {
      console.error('Error updating .env file:', error);
    }
  }
  
  addKeyValuePair();
  */