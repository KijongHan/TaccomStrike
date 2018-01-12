using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using TaccomStrike.Library.Data.ViewModel;
using TaccomStrike.Library.Data.Model;
using TaccomStrike.Library.Utility.Security;

public class GameLogicController {

    private int turnsIndex;

    public List<GameUserEntity> GameUsers {get;set;}
    public List<GameClaim> CurrentClaims {get;set;}

    public GameState GetGameState(ClaimsPrincipal user) {
        GameUserEntity gameUser = GetPlayer(user);
        GameState gameState = new GameState();
        gameState.CurrentTurnUserName = GetCurrentPlayerTurn().UserPrincipal.GetUserName();
        gameState.Hand = gameUser.Hand;
        gameState.Claims = CurrentClaims;

        foreach(var g in GameUsers) {
            gameState.OpponentInformations.Add(
                new OpponentInformation { 
                    UserName = g.UserPrincipal.GetUserName(),
                    HandCount = g.Hand.Count
                });
        }

        return gameState;
    }

    public bool CallCheat(ClaimsPrincipal user) {
        var gameUser = GetPlayer(user);

        var lastClaim = CurrentClaims.Last();
        for(int i = 0; i < lastClaim.Claims.Count; i++) {
            if(lastClaim.Claims[i].Rank != lastClaim.Actual[i].Rank) {
                var lastClaimUser = GetPlayer(lastClaim.ClaimUserName);

                foreach(var claim in CurrentClaims) {
                    foreach(var actualCard in claim.Actual) {        
                        lastClaimUser.Hand.Add(actualCard);
                    }
                }

                CurrentClaims = new List<GameClaim>();
                return true;
            }
        }

        foreach(var claim in CurrentClaims) {
            foreach(var actualCard in claim.Actual) {        
                gameUser.Hand.Add(actualCard);
            }
        }
        CurrentClaims = new List<GameClaim>();
        return true;
    }

    public bool SubmitClaim(ClaimsPrincipal user, List<GameCardEntity> claims, List<GameCardEntity> actual) {
        if(claims.Count != actual.Count) {
            return false;
        }

        var referenceCard = claims[0];
        foreach(var card in claims) {
            if(card.Rank != referenceCard.Rank) {
                return false;
            }
        }

        if(CurrentClaims.Count > 0) {
            var referenceCardIndex = GameCardEntity.Ranks.FindIndex((item) => { return item==referenceCard.Rank; });
            var recentClaimIndex = GameCardEntity.Ranks.FindIndex((item) => { return item==CurrentClaims.Last().Claims[0].Rank; });

            if(referenceCardIndex>recentClaimIndex+1 || referenceCardIndex<recentClaimIndex-1) {
                return false;
            }
        }

        var gameUser = GetPlayer(user);
        CurrentClaims.Add(new GameClaim(claims, actual, gameUser.UserPrincipal.GetUserName()));

        foreach(var card in actual) {
            gameUser.Hand.Remove(card);
        }
        return true;
    }

    public bool IsVictory() {
        var gameUser = GetCurrentPlayerTurn();
        if(gameUser.Hand.Count<=0) {
            return true;
        }
        return false;
    }

    public void EndTurn() {
        turnsIndex++;
        if(turnsIndex>=GameUsers.Count) {
            turnsIndex=0;
        }
    }

    public bool IsCurrentTurn(ClaimsPrincipal user) {
        var gamePlayer = GetPlayer(user);
        return CurrentTurn(gamePlayer);
    }

    public bool CurrentTurn(GameUserEntity gameUser) {
        GameUserEntity currentUserTurn = GetCurrentPlayerTurn();
        if(currentUserTurn.UserPrincipal.GetUserLoginID()==gameUser.UserPrincipal.GetUserLoginID()) {
            return true;
        }
        return false;
    } 

    public GameUserEntity GetCurrentPlayerTurn() {
        return GameUsers[turnsIndex];
    }

    public GameUserEntity GetPlayer(ClaimsPrincipal user) {
        return GameUsers
        .Where(item => item.UserPrincipal.GetUserLoginID() == user.GetUserLoginID())
        .FirstOrDefault();
    }

    public GameUserEntity GetPlayer(string userName) {
        return GameUsers
        .Where(item => item.UserPrincipal.GetUserName() == userName)
        .FirstOrDefault();
    }

    public void StartGame(List<ClaimsPrincipal> users) {
        List<GameCardEntity> deck = instantiateDeck();
        GameUsers = new List<GameUserEntity>();
        CurrentClaims = new List<GameClaim>();

        int interval = deck.Count / users.Count;
        for(int i = 0; i < users.Count; i++) {
            if(i == users.Count-1) {
                List<GameCardEntity> hand = deck;
                GameUsers.Add(new GameUserEntity(users[i], hand));
            }
            else {
                List<GameCardEntity> hand = new List<GameCardEntity>();
                for(int j = 0; j < interval; j++) {
                    GameCardEntity lastCard = deck.Last();
                    hand.Add(lastCard);
                    deck.RemoveAt(deck.Count-1);
                }
                GameUsers.Add(new GameUserEntity(users[i], hand));
            }
        }
    }

    private List<GameCardEntity> instantiateDeck() {
        List<GameCardEntity> deck = new List<GameCardEntity>();
        foreach(string suit in GameCardEntity.Suits) {
            foreach(string rank in GameCardEntity.Ranks) {
                GameCardEntity card = new GameCardEntity(rank, suit);
                deck.Add(card);
            }
        }

        shuffleDeck(deck);
        return deck;
    }

    private void shuffleDeck(List<GameCardEntity> deck) {
        Random r = new Random();
        for (int n = deck.Count - 1; n > 0; --n)
        {
            int k = r.Next(n+1);
            GameCardEntity temp = deck[n];
            deck[n] = deck[k];
            deck[k] = temp;
        }
    }
}