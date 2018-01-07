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
        gameState.Hand = gameUser.Hand;
        gameState.Claims = CurrentClaims.Select(item => item.Claims).ToList();
        return gameState;
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

        deck = shuffleDeck(deck);
        return deck;
    }

    private List<GameCardEntity> shuffleDeck(List<GameCardEntity> deck) {
        return deck;
    }
}