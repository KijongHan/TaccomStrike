import { isNullOrUndefined } from "util";

export class PerspectiveStyle 
{
    perspective?: number;
    rotateY?: number;

    public constructor(init?: Partial<PerspectiveStyle>)
	{
		Object.assign(this, init);
    }

    getPerspectiveString = () => 
    {
        if(!isNullOrUndefined(this.perspective)) 
        {
            return `${this.perspective}px`;
        }
    }
    
    getTransformString = () => 
    {
        let rotateY = 0;
        if(!isNullOrUndefined(this.rotateY)) 
        {
            rotateY = this.rotateY;
        }

        return `rotateY(${rotateY})`;
    }
}