public class GameCardEntity 
{
    public GameCardEntity CardOwner {get;set;}

    public string CardName { get; set; }
	public string CardEffectDescription { get; set; }
	public string CardLoreDescription { get; set; }
	public string CardType { get; set; }

	public int CardHealth { get; set; }
	public int CardManaCost { get; set; }
	public int CardDamage { get; set; }

	public GameCardEntity ()
	{

	}

	public CardUntapPhase CardUntapPhaseHandler;
	public delegate void CardUntapPhase();

	public CardDrawPhase CardDrawPhaseHandler;
	public delegate void CardDrawPhase();

	public delegate void HandleFirstMainPhase();

	public delegate void HandleBeginCombatPhase();

	public void HandleUntapPhase() {
		CardUntapPhaseHandler ();
	}

	public void HandleDrawPhase() {
		CardDrawPhaseHandler ();
	}
}