export abstract class BasePageStyle 
{
    abstract large: () => BasePageStyle;

    abstract medium: () => BasePageStyle;

    abstract small: () => BasePageStyle;

    abstract verysmall: () => BasePageStyle;
}