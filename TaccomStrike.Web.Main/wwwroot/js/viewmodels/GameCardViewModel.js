function GameCardViewModel(data) {
    var self = this;
    self.suit = ko.observable(data.Suit);
    self.rank = ko.observable(data.Rank);
    self.selected = ko.observable(false);
    console.log(self.suit() + ":" + self.rank());

}