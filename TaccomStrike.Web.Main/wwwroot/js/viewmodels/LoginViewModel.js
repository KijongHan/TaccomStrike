function LoginViewModel(alertMessageViewModel) {
    var self = this;

    self.alertMessageViewModel = alertMessageViewModel;
    self.username = ko.observable(null);
    self.password = ko.observable(null);

    self.login = function() {
        if(self.username()==null || self.password()==null) {
            alertMessageViewModel.showLoginMissingInput();
            return;
        }

        fetch("http://174.138.15.215:81/api/authentication/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                username: self.username(),
                password: self.password(),
            })
        }).then(response => {
            if(response.ok) {
                loginSuccessful();
            }
            else {
                alertMessageViewModel.showLoginFailed();
            }
        });
    }
}