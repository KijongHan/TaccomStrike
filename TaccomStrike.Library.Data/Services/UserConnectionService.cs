using System.Collections.Generic;
using System.Security.Claims;
using TaccomStrike.Library.Utility.Security;

public class UserConnectionService {
    private readonly Dictionary<int, HashSet<string>> UserConnections;

    public UserConnectionService() {
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
            }

            lock(connections) {
                connections.Add(connectionId);
            }
        }
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
                }
            }
        }
    }
}