import { isNullOrUndefined } from "util";

export class PerspectiveStyle 
{
    rotateY?: number;

    public constructor(init?: Partial<PerspectiveStyle>)
	{
		Object.assign(this, init);
    }
    
    getTransformString = ():string => 
    {
        let rotateY = 0;
        if(!isNullOrUndefined(this.rotateY)) 
        {
            rotateY = this.rotateY;
        }

        return `rotateY(${rotateY})`;
    }
}