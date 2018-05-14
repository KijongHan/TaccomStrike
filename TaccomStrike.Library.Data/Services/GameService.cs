using System.Collections.Generic;

public class GameService {

    private Dictionary<string, GameLogicController> activeGames;

    public GameService() {
        activeGames = new Dictionary<string, GameLogicController>();
    }

}