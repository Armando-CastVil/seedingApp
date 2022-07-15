export default class Seed
{
    projectedPath: Seed[] | null;
	seedNum:number;
    constructor(projectedPath:Seed[]|null, seedNum:number) {
        this.seedNum = seedNum;
        this.projectedPath = projectedPath;
    }
}