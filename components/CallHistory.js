import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native';
import CallLogs from 'react-native-call-log';

export default function CallHistory() {
  const [callLogs, setCallLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedTab, setSelectedTab] = useState('recent'); // Set recent as default

  useEffect(() => {
    async function fetchCallLogs() {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CALL_LOG);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const logs = await CallLogs.loadAll();
          setCallLogs(logs);
          setFilteredLogs(logs); // Show all logs initially (Recent)
        } else {
          console.log('Call Log permission denied');
        }
      } catch (error) {
        console.error('Error fetching call logs:', error);
      }
    }

    fetchCallLogs();
  }, []);

  const filterLogs = (type) => {
    setSelectedTab(type);
    if (type === 'recent') {
      setFilteredLogs(callLogs);
    } else if (type === 'incoming') {
      setFilteredLogs(callLogs.filter((log) => log.type === 'INCOMING'));
    } else if (type === 'outgoing') {
      setFilteredLogs(callLogs.filter((log) => log.type === 'OUTGOING'));
    } else if (type === 'missed') {
      setFilteredLogs(callLogs.filter((log) => log.type === 'MISSED'));
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.historyHeader}>History</Text>
      {/* Tabs for filtering */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'recent' && styles.activeTab]}
          onPress={() => filterLogs('recent')}
        >
          <Text style={styles.tabText}>Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'incoming' && styles.activeTab]}
          onPress={() => filterLogs('incoming')}
        >
          <Text style={styles.tabText}>Incoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'outgoing' && styles.activeTab]}
          onPress={() => filterLogs('outgoing')}
        >
          <Text style={styles.tabText}>Outgoing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'missed' && styles.activeTab]}
          onPress={() => filterLogs('missed')}
        >
          <Text style={styles.tabText}>Missed</Text>
        </TouchableOpacity>
      </View>

      {/* Call History List */}
      <FlatList
        data={filteredLogs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.callItem}>
            <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
            <Text style={[styles.callType, getCallTypeStyle(item.type)]}>{item.type}</Text>
            <Text style={styles.callDate}>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Function to style call types
const getCallTypeStyle = (type) => {
  switch (type) {
    case 'INCOMING':
      return { color: 'green' };
    case 'OUTGOING':
      return { color: 'blue' };
    case 'MISSED':
      return { color: 'red' };
    default:
      return { color: 'gray' };
  }
};

const styles = StyleSheet.create({
  container: { flex: 0, padding: 10, backgroundColor: '#f5f5f5' ,marginTop: 35},
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  tab: { padding: 10, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: 'blue' },
  tabText: { fontSize: 16, fontWeight: 'bold' },
  callItem: {
    backgroundColor: 'black',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  phoneNumber: { fontSize: 18, fontWeight: 'bold' },
  callType: { fontSize: 16, marginVertical: 5 },
  callDate: { fontSize: 14, color: '#666' },
  historyHeader: { fontSize: 24, fontWeight: 'bold', marginTop: 5 },
});



