import * as React from "react";
import styled from "styled-components";
import { CardComponentStyle, CardComponent } from "../general/card";
import { DisplayStyle } from "../../styles/displaystyle";
import { ButtonComponent, ButtonComponentStyle } from "../general/button";
import { GetUser } from "../../models/rest/getuser";
import { GetGameState } from "../../models/rest/getgamestate";
import { ComboButtonComponent, ComboButtonComponentStyle, ComboButtonItem } from "../general/combobutton";
import { string, number } from "prop-types";
import { isNullOrUndefined, isNull } from "util";
import { LabelledListComponent, ListItem, LabelledListComponentStyle } from "../general/labelledlist";
import { LabelledInputComponentStyle } from "../general/labelledinput";
import { CardRank, GamePhase } from "../../services/game/gameservice";
import { GetGameCheat } from "../../models/rest/getgamecheat";
import { ColorStyle } from "../../styles/colorstyle";

const GameAction = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${ColorStyle.pallet3};
`;

const GameActionHistory = styled.div`
    height: 60%;
    width: 98%;
    margin: auto;
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 0.2);
`;

const GameActionHistoryItem = styled.p`
    margin: 5px 0px 5px 0px;
    padding-left: 5%;
    color: ${ColorStyle.pallet1};
`;

const GamePhaseTimer = styled.div`
    height: 10%;
    width: 100%;
    margin-top: 10%;
    display: flex;
`;

const GamePhaseTimerText = styled.p`
    text-align: center;
    margin: auto;
    font-size: 1.3em;
    color: ${ColorStyle.pallet2};
`;

export class GameActionComponentProps 
{
    loggedInUser: GetUser;
    gameCheat: GetGameCheat;
    gameState: GetGameState;

    gameActionComponentStyle: GameActionComponentStyle;

    claimRankSelectedOnChangeHandler: (value: string) => void;
    submitClaimButtonClickHandler: () => void;
    callCheatButtonClickHandler: () => void;
}

export class GameActionComponentState 
{
    currentPhaseDuration: number;
    timerID: number;

    callCheatComboBox: ComboButtonItem[];
    submitClaimOptionsComboBox: ComboButtonItem[];
}

export class GameActionComponentStyle 
{
    cardComponentStyle: CardComponentStyle;

    constructor() 
    {
        this.cardComponentStyle = new CardComponentStyle();
    }
}

export class GameActionComponent extends React.Component<GameActionComponentProps, GameActionComponentState>
{
    constructor(props: GameActionComponentProps) 
    {
        super(props);
        this.state = {
            currentPhaseDuration: null,
            timerID: null,

            submitClaimOptionsComboBox: [
                new ComboButtonItem(this.props.gameState.lowerBoundRank, false, this.lowerBoundButtonClickHandler),
                new ComboButtonItem(this.props.gameState.middleBoundRank, false, this.middleBoundButtonClickHandler),
                new ComboButtonItem(this.props.gameState.upperBoundRank, false, this.upperBoundButtonClickHandler)
            ],

            callCheatComboBox: [
                new ComboButtonItem("Call Cheat", false, this.callCheatButtonClickHandler)
            ]
        };
    }

    render() 
    {
        let gameActionComponent: JSX.Element;

        if(this.props.gameState.currentGamePhase===GamePhase.TurnPhase) 
        {
            gameActionComponent = this.getTurnPhaseActionComponent();
        }
        else if(this.props.gameState.currentGamePhase===GamePhase.CallPhase) 
        {
            gameActionComponent = this.getCallPhaseActionComponent();
        }
        
        return (
			<CardComponent
				front={gameActionComponent}
				cardStyle={this.props.gameActionComponentStyle.cardComponentStyle}>
			</CardComponent>
		);
    }

    componentDidMount() 
    {
        this.startPhaseTimer();
    }

    componentDidUpdate(prevProps: GameActionComponentProps) 
    {
        if(prevProps.gameState.currentGamePhase!==this.props.gameState.currentGamePhase) 
        {
            this.startPhaseTimer();
        }
    }

    startPhaseTimer() 
    {
        if(this.state.timerID!==null) 
        {
            window.clearInterval(this.state.timerID);
        }

        let duration: number;
        if(this.props.gameState.currentGamePhase===GamePhase.TurnPhase) 
        {
            duration = this.props.gameState.turnPhaseDuration;
        }
        if(this.props.gameState.currentGamePhase===GamePhase.CallPhase) 
        {
            duration = this.props.gameState.callPhaseDuration;
        }
        this.setState({currentPhaseDuration: duration});
        let handlerID = window.setInterval(() => {
            if(this.state.currentPhaseDuration<=0) 
            {
                this.setState({currentPhaseDuration: 0});
                window.clearInterval(this.state.timerID);
                this.setState({timerID: null});
            }
            else 
            {
                let nextInterval = this.state.currentPhaseDuration - 15;
                this.setState({currentPhaseDuration: nextInterval});
            }
        }, 15);
        this.setState({timerID: handlerID});
    }

    lowerBoundButtonClickHandler = () => 
    {
        this.setState({
            submitClaimOptionsComboBox: [
                new ComboButtonItem(this.props.gameState.lowerBoundRank, true, this.lowerBoundButtonClickHandler),
                new ComboButtonItem(this.props.gameState.middleBoundRank, false, this.middleBoundButtonClickHandler),
                new ComboButtonItem(this.props.gameState.upperBoundRank, false, this.upperBoundButtonClickHandler)
            ]
        });
        this.props.claimRankSelectedOnChangeHandler(this.props.gameState.lowerBoundRank);
    }

    middleBoundButtonClickHandler = () => 
    {
        this.setState({
            submitClaimOptionsComboBox: [
                new ComboButtonItem(this.props.gameState.lowerBoundRank, false, this.lowerBoundButtonClickHandler),
                new ComboButtonItem(this.props.gameState.middleBoundRank, true, this.middleBoundButtonClickHandler),
                new ComboButtonItem(this.props.gameState.upperBoundRank, false, this.upperBoundButtonClickHandler)
            ]
        });
        this.props.claimRankSelectedOnChangeHandler(this.props.gameState.middleBoundRank);
    }

    upperBoundButtonClickHandler = () => 
    {
        this.setState({
            submitClaimOptionsComboBox: [
                new ComboButtonItem(this.props.gameState.lowerBoundRank, false, this.lowerBoundButtonClickHandler),
                new ComboButtonItem(this.props.gameState.middleBoundRank, false, this.middleBoundButtonClickHandler),
                new ComboButtonItem(this.props.gameState.upperBoundRank, true, this.upperBoundButtonClickHandler)
            ]
        });
        this.props.claimRankSelectedOnChangeHandler(this.props.gameState.upperBoundRank);
    }

    callCheatButtonClickHandler = () => 
    {
        this.setState({
            callCheatComboBox: [
                new ComboButtonItem("Call Cheat", true, this.callCheatButtonClickHandler)
            ]
        });
        this.props.callCheatButtonClickHandler();
    }

    getCallPhaseActionComponent = () => 
    {
        let buttonStyle = new ComboButtonComponentStyle();
        buttonStyle.displayStyle.widthPercentage = 80;
        buttonStyle.displayStyle.heightPercentage = 10;
        buttonStyle.displayStyle.marginLeftPercentage = 10;

        if(this.props.loggedInUser.userID!==this.props.gameState.userTurn.user.userID) 
        {
            return (
                <GameAction>
                    {this.getGameHistoryListComponent()}
                    {this.getPhaseTimerComponent()}
                    <ComboButtonComponent
                        comboButtonComponentStyle={buttonStyle}
                        comboButtons={this.state.callCheatComboBox}>
                    </ComboButtonComponent>
                </GameAction>
            );
        }
        else 
        {
            return (
                <GameAction>
                    {this.getGameHistoryListComponent()}
                    {this.getPhaseTimerComponent()}
                </GameAction>
            );
        }
    }

    getTurnPhaseActionComponent = () => 
    {
        let claimOptions: JSX.Element;
        let buttonStyle = new ButtonComponentStyle();
        buttonStyle.displayStyle.widthPercentage = 80;
        buttonStyle.displayStyle.heightPercentage = 10;
        buttonStyle.displayStyle.marginLeftPercentage = 10;

        if(this.props.loggedInUser.userID===this.props.gameState.userTurn.user.userID) 
        {
            if(isNullOrUndefined(this.props.gameState.lowerBoundRank)
            &&isNullOrUndefined(this.props.gameState.middleBoundRank)
            &&isNullOrUndefined(this.props.gameState.upperBoundRank)) 
            {
                let listItems = Object.keys(CardRank).map((key: any) => {
                    return new ListItem(CardRank[key], CardRank[key]);
                });
                let labelledListComponentStyle = new LabelledListComponentStyle(new DisplayStyle({
                    heightPercentage: 10,
                    widthPercentage: 80,
                    marginLeftPercentage: 10
                }));
                claimOptions=(
                    <LabelledListComponent
                        labelledListComponentStyle={labelledListComponentStyle}
                        listOnChangeHandler={this.props.claimRankSelectedOnChangeHandler}
                        labelValue={""}
                        listItems={listItems}>
                    </LabelledListComponent>
                )
            }
            else 
            {
                let comboButtonComponentStyle = new ComboButtonComponentStyle(new DisplayStyle({
                    widthPercentage: 80,
                    heightPercentage: 10,
                    marginLeftPercentage: 10
                }));
                claimOptions=(
                    <ComboButtonComponent
                        comboButtons={this.state.submitClaimOptionsComboBox}
                        comboButtonComponentStyle={comboButtonComponentStyle}>
                    </ComboButtonComponent>
                );
            }

            return (
                <GameAction>
                    {this.getGameHistoryListComponent()}
                    {this.getPhaseTimerComponent()}
                    {claimOptions}
                    <ButtonComponent
                        buttonText="Submit Claim"
                        buttonComponentStyle={buttonStyle}
                        buttonClickHandler={this.props.submitClaimButtonClickHandler}>
                    </ButtonComponent>
                </GameAction>
            );
        }
        else 
        {
            return (
                <GameAction>
                    {this.getGameHistoryListComponent()}
                    {this.getPhaseTimerComponent()}
                </GameAction>
            );
        }
    }

    getGameHistoryListComponent = () => 
    {
        let actionHistoryItems = this.props.gameState.actionHistory.map((item: string, index: number) => {
            return (
                <GameActionHistoryItem key={index}>{item}</GameActionHistoryItem>
            );
        });
        return (
            <GameActionHistory>
                {actionHistoryItems}
            </GameActionHistory>
        );
    }

    getPhaseTimerComponent = () => 
    {
        let currentPhaseDurationSeconds = Math.floor(this.state.currentPhaseDuration / 1000) + " Seconds";
        return (
            <GamePhaseTimer>
                <GamePhaseTimerText>
                    {currentPhaseDurationSeconds}
                </GamePhaseTimerText>
            </GamePhaseTimer>
        );
    }

    getSnapshotBeforeUpdate(prevProps: GameActionComponentProps) 
    {
        if(prevProps.gameState.lowerBoundRank!==this.props.gameState.lowerBoundRank ||
            prevProps.gameState.middleBoundRank!==this.props.gameState.middleBoundRank ||
            prevProps.gameState.upperBoundRank!==this.props.gameState.upperBoundRank) 
        {
            this.setState({
                submitClaimOptionsComboBox: [
                    new ComboButtonItem(this.props.gameState.lowerBoundRank, false, this.lowerBoundButtonClickHandler),
                    new ComboButtonItem(this.props.gameState.middleBoundRank, false, this.middleBoundButtonClickHandler),
                    new ComboButtonItem(this.props.gameState.upperBoundRank, false, this.upperBoundButtonClickHandler)
                ]
            });
        }
    }
}