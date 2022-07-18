export default function seedToPlacement(seed:any)
 {
     var expectedPlacement1=0;
     var expectedPlacement2=0;
     var expectedPlacement=0;
     let lastPowerOf2 = Math.pow(2,Math.floor(Math.log2(seed-1)));
    expectedPlacement1 = lastPowerOf2*1.5+1;
    expectedPlacement2 = lastPowerOf2+1;
     if(seed==1)
     {
        expectedPlacement=seed;
        console.log("seed is "+ seed +" expected placement is "+ expectedPlacement);
        return expectedPlacement;
     }
     else
     {  
        //2^(floor(log_2(seed-1))-1)*3+1
        //expectedPlacement1=Math.pow(2,Math.floor(Math.log2(seed-1)-1))
        expectedPlacement1 = lastPowerOf2*1.5+1;
        
        //2^(floor(log_2(seed-1)))+1
        expectedPlacement2= lastPowerOf2+1;
        
         if(expectedPlacement1<=seed)
         {
            console.log("seed is "+ seed +" expected placement is "+ expectedPlacement1);
            return expectedPlacement1
         }
         else
         {
            console.log("seed is "+ seed +" expected placement is "+ expectedPlacement2);
            return expectedPlacement2
         }
         
     }
 }
