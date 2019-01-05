import { BasePageComponent, BasePageComponentState, BasePageComponentProps } from "./base";

export class GamePageComponentState extends BasePageComponentState {}

export interface GamePageComponentProps extends BasePageComponentProps {}

export class GamePageComponent extends BasePageComponent<GamePageComponentProps, GamePageComponentState> 
{

}