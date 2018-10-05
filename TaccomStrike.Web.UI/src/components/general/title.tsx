import * as React from "react";

export interface TitleComponentProps { titleLetter: string; }
export interface TitleComponentState { }

export class TitleComponent extends React.Component<TitleComponentProps, TitleComponentState>
{
	constructor(props: TitleComponentProps)
	{
		super(props);
	}

	render()
	{
		return (
			<div>
				{this.props.titleLetter}
			</div>
		);
	}
}