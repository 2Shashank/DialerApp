import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Linking, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons';

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]); // For search
  const [searchText, setSearchText] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({ fields: [Contacts.Fields.PhoneNumbers] });
        setContacts(data);
        setFilteredContacts(data);
      }
    }
    fetchContacts();
  }, []);

  const toggleContact = (id) => {
    setSelectedContact(selectedContact === id ? null : id);
  };

  const makeCall = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Alert.alert("No Phone Number", "This contact does not have a phone number.");
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  };

  const addNewContact = async () => {
    const contact = {
      [Contacts.Fields.FirstName]: 'New Contact',
      [Contacts.Fields.PhoneNumbers]: [{ label: 'mobile', number: '1234567890' }],
    };

    const contactId = await Contacts.addContactAsync(contact);
    if (contactId) {
      Alert.alert('Success', 'Contact added successfully!');
      fetchContacts(); // Refresh contacts
    } else {
      Alert.alert('Error', 'Failed to add contact.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Text style={styles.contactHeader}>Contacts</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Contacts..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* Add Contact Button */}
      <TouchableOpacity style={styles.addContactButton} onPress={addNewContact}>
        <Ionicons name="person-add" size={24} color="white" />
        <Text style={styles.addContactText}>Add Contact</Text>
      </TouchableOpacity>

      {/* Contacts List */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactItem}>
            <TouchableOpacity onPress={() => toggleContact(item.id)}>
              <Text style={styles.contactName}>{item.name}</Text>
            </TouchableOpacity>

            {selectedContact === item.id && item.phoneNumbers && (
              <View style={styles.contactDetails}>
                <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
                <TouchableOpacity onPress={() => makeCall(item.phoneNumbers[0].number)}>
                  <Ionicons name="call" size={24} color="green" style={styles.callIcon} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  searchBar: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addContactButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  addContactText: { color: 'white', fontSize: 16, marginLeft: 5 },
  contactItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  contactName: { fontSize: 18, color: '#333' },
  contactDetails: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 },
  contactNumber: { fontSize: 16, color: '#666' },
  callIcon: { marginLeft: 10 },
  contactHeader: { fontSize: 24, fontWeight: 'bold', marginTop: 40 ,marginBottom: 10 },
});

