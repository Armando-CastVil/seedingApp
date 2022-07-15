
export default class Seed
{
    projectedPath: Seed[];
	seedNum:number;
    constructor(projectedPath:Seed[], seedNum:number) {
        this.seedNum = seedNum;
        this.projectedPath = projectedPath;
    }
}