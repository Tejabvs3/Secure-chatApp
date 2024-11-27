// need to add keys for cross over operations also if we use random numbers for find cross over points...will do this later!!
//min 5 bits (i.e key1 value) used here...can be changed later

export const crossOver = (sequence,b,key1) => {
    let c = [];

    for(let i=0;i<sequence.length;i++){
        let j = i+1;
        if(sequence[i]===0){
            //single point crossover

            //const point = Math.floor(Math.random()*(sequence.length));
            let point;
            if(key1%2===0) point = key1/2-1;
            else point = key1/2;
            //console.log(point);
            c.push(b[i].slice(0,point)+b[j].slice(point));
            b[j] = b[j].slice(0,point)+b[i].slice(point);
             
        }
        else if(sequence[i]===1){
            // uniform crossover
            let str = "";
            let s = "";
            if(key1%2===0) {
                let u = 0;
                for(let k=0;k<key1;k=k+2,u++){
                    if(u===1){
                        str+=(b[j][k]);
                        str+=(b[j][k+1]);
                        s+=(b[i][k]);
                        s+=(b[i][k+1]);
                        u = -1;
                    }
                    else {
                        str+=(b[i][k]);
                        str+=(b[i][k+1]);
                        s+=(b[j][k]);
                        s+=(b[j][k+1]);
                    }
                }
                c.push(str);
                b[j] = s;
            }
            else{
                let u = 0;
                for(let k=0;k<key1;k++,u++){
                    if(u===1){
                        str+=(b[j][k]);
                        s+=(b[i][k]);
                        u = -1;
                    }
                    else {
                        str+=(b[i][k]);
                        s+=(b[j][k]);
                    }
                }
                c.push(str);
                b[j] = s;
            }

    }

    else {
        //two point crossover

        //const point1 = Math.floor(Math.random()*(sequence.length));
        //const point2 = Math.floor(Math.random()*(sequence.length));
        let point1,point2;
        point1 = 3;
        point2 = key1-3;
        //console.log(point1,point2);
        c.push(b[i].slice(0,point1)+b[j].slice(point1,point2)+b[i].slice(point2));
        b[j] = b[j].slice(0,point1)+b[i].slice(point1,point2)+b[j].slice(point2);


    }


    }




    c.push(b[b.length-1]);

    //console.log(c);
    return c;

}