import Competitor from "./Competitor";
export default function fillByes(list:Competitor[])
{
    //find the nearest power of 2 larger than the amount of entries
    console.log("fill byes with list of length:"+ list.length)
    var powerOfTwo=2;
    var counter=1;
    while(Math.pow(2,counter)<list.length)
    {
        counter++
        powerOfTwo=Math.pow(2,counter)
    }
   
    console.log("power of two is:"+ powerOfTwo)
    return powerOfTwo
}