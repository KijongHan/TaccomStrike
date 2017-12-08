using System.Collections.Generic;

public class GameUserConnectionService {
    private readonly Dictionary<string, HashSet<string>> UserConnections;

    public GameUserConnectionService() {
        UserConnections = new Dictionary<string, HashSet<string>>();
    }

    public int Count {
        get {
            return UserConnections.Count;
        }
    }

    public void Add(string key, string connectionId) {
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

    public IEnumerable<string> GetConnections(string key) {
        HashSet<string> connections;
        if(UserConnections.TryGetValue(key, out connections)) {
            return connections;
        }

        return null;
    }

    public void Remove(string key, string connectionId) {
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