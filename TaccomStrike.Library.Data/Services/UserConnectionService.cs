using System.Collections.Generic;

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

    public IEnumerable<string> GetConnections(int key) {
        HashSet<string> connections;
        if(UserConnections.TryGetValue(key, out connections)) {
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
}