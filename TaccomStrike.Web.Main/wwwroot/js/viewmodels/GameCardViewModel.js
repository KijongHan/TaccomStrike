function GameCardViewModel(data) {
    var self = this;
    self.suit = ko.observable(data.Suit);
    self.rank = ko.observable(data.Rank);
    self.selected = ko.observable(false);

    self.cssClass = ko.computed(function() {
        if(self.selected()) {
            return "cardFront selected";
        }
        else {
            return "cardFront";
        }
    });

    self.select = function() {
        var isCurrentlySelected = self.selected();
        self.selected(!isCurrentlySelected);
    }
}