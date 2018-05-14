function AlertMessageViewModel() {
    var self = this;

    self.title = ko.observable();
    self.message = ko.observable();
    self.isVisible = ko.observable(false);

    self.cssDisplay = ko.computed(function() {
        if(self.isVisible() == true) {
            return "inline";
        }
        else {
            return "none";
        }
    });

    self.activateCard = ko.computed(function() {
        if(self.isVisible()) {
            return "card activate";
        }
        else {
            return "card";
        }
    });

    self.showLoginFailed = function() {
        self.title("Login Error");
        self.message("Incorrect username and/or password");
        self.isVisible(true);
    }

    self.showLoginMissingInput = function() {
        self.title("Login Error");
        self.message("Please fill out username and password fields");
        self.isVisible(true);
    }

    self.showRegisterMissingInput = function() {
        self.title("Registration Error");
        self.message("Please fill out username, email and password fields");
        self.isVisible(true);
    }

    self.showRegisterSuccessful = function() {
        self.title("Registration Successful");
        self.message("Registration has successfully completed");
        self.isVisible(true);
    }

    self.showRegisterUnsuccessful = function() {
        self.title("Registration Error");
        self.message("There already exists a user with the same username or email!");
        self.isVisible(true);
    }
    
    self.confirmMessage = function() {
        self.isVisible(false);
    }
}