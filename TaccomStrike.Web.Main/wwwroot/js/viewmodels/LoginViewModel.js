function LoginViewModel() {
    var self = this;

    self.username = ko.observable(null);
    self.password = ko.observable(null);

    self.login = function() {
        fetch("http://localhost:50249/api/authentication/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                username: self.username(),
                password: self.password(),
            }),
        }).then(response => {
            response.json().then(function(data) {
                console.log(data);
            });
        });
    }
}