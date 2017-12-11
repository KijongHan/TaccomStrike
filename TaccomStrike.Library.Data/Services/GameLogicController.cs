using System.Collections.Generic;
using TaccomStrike.Library.Data.ViewModel;
using TaccomStrike.Library.Data.Model;

public class GameLogicController {

    public string GameID {get;set;}

	public delegate void UntapPhase();
	public UntapPhase OnUntapPhase;

	public delegate void DrawPhase();
	public DrawPhase OnDrawPhase;
	
    public delegate void FirstMainPhase();
	public FirstMainPhase OnFirstMainPhase;
	
    public delegate void BeginCombatPhase();
	public BeginCombatPhase OnBeginCombatPhase;
	
    public delegate void EndCombatPhase();
	public EndCombatPhase OnEndCombatPhase;
	
    public delegate void SecondMainPhase();
	public SecondMainPhase OnSecondMainPhase;
	
    public delegate void EndPhase();
	public EndPhase OnEndPhase;
	
    public delegate void CleanupPhase();
	public CleanupPhase OnCleanupPhase;

    public GameState CurrentGameState {get;set;}
    public GameUser CurrentGameUserTurn {get;set;}
    public GameUser GameHost {get;set;}

    public List<GameUser> GameUsers {get;set;}

    public bool StartGame(GameUser gameUser) {
        if(gameUser.GameUserName != GameHost.GameUserName) {
            return false;
        }
        return true;
    }
}