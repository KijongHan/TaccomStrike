using System.Collections.Generic;
using System.Security.Claims;
using TaccomStrike.Library.Utility.Security;

public class UserConnectionService {

    private readonly Dictionary<int, HashSet<string>> UserConnections;
    private readonly Dictionary<int, ClaimsPrincipal> Users;

    public UserConnectionService() {
        Users = new Dictionary<int, ClaimsPrincipal>();
        UserConnections = new Dictionary<int, HashSet<string>>();
    }

    public int Count {
        get {
            return UserConnections.Count;
        }
    }

    public void Add(int key, string connectionId) {
        lock (UserConnections) {
            HashSet<string> connections;
            if(!UserConnections.TryGetValue(key, out connections)) {
                connections = new HashSet<string>();
                UserConnections.Add(key, connections);
            }

            lock(connections) {
                connections.Add(connectionId);
            }
        }
    }

    public void Add(ClaimsPrincipal user, string connectionId) {
        lock (UserConnections) {
            HashSet<string> connections;
            if(!UserConnections.TryGetValue(user.GetUserLoginID(), out connections)) {
                connections = new HashSet<string>();
                UserConnections.Add(user.GetUserLoginID(), connections);
                Users.Add(user.GetUserLoginID(), user);
            }

            lock(connections) {
                connections.Add(connectionId);
            }
        }
    }

    public List<ClaimsPrincipal> GetUsers() {
        lock(Users) {
            var list = new List<ClaimsPrincipal>();
            foreach(var user in Users.Values) {
                list.Add(user);
            }
            return list;
        }
    }

    public List<string> GetConnections() {
        var list = new List<string>();
        lock(UserConnections) {
            foreach(var valuesCollection in UserConnections.Values) {
                foreach(var value in valuesCollection) {
                    list.Add(value);
                }
            }
        }
        return list;
    }

    public IEnumerable<string> GetConnections(int key) {
        HashSet<string> connections;
        if(UserConnections.TryGetValue(key, out connections)) {
            return connections;
        }

        return null;
    }

    public IEnumerable<string> GetConnections(ClaimsPrincipal user) {
        HashSet<string> connections;
        if(UserConnections.TryGetValue(user.GetUserLoginID(), out connections)) {
            return connections;
        }

        return null;
    }

    public void Remove(int key, string connectionId) {
        lock (UserConnections) {
            HashSet<string> connections;
            if(!UserConnections.TryGetValue(key, out connections)) {
                return;
            }

            lock (connections) {
                connections.Remove(connectionId);

                if (connections.Count == 0) {
                    UserConnections.Remove(key);
                }
            }
        }
    }

    public void Remove(ClaimsPrincipal user, string connectionId) {
        lock (UserConnections) {
            HashSet<string> connections;
            if(!UserConnections.TryGetValue(user.GetUserLoginID(), out connections)) {
                return;
            }

            lock (connections) {
                connections.Remove(connectionId);

                if (connections.Count == 0) {
                    UserConnections.Remove(user.GetUserLoginID());
                    Users.Remove(user.GetUserLoginID());
                }
            }
        }
    }
}