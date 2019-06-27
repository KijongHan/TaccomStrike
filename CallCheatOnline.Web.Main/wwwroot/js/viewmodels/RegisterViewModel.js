function RegisterViewModel(alertMessageViewModel) {
    var self = this;

    self.alertMessageViewModel = alertMessageViewModel;
    self.username = ko.observable(null);
    self.password = ko.observable(null);
    self.email = ko.observable(null);

    self.register = function() {
        if(self.username()==null || self.username()=="" || self.password()==null || self.password()=="" || self.email() == null) {
            alertMessageViewModel.showRegisterMissingInput();
            return;
        }

        fetch(webAPIIPAddress + "/api/authentication", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                username: self.username(),
                password: self.password(),
                email: self.email()
            }),
        }).then(response => {
            if(response.ok) {
                alertMessageViewModel.showRegisterSuccessful();
                registerSuccessful();
            }
            else {
                alertMessageViewModel.showRegisterUnsuccessful();
            }
        });
    }
}