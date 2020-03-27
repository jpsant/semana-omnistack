import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    marginTop: 32
  },

  incidentProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold'
  },

  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380'
  },

  contact: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    marginTop: 8
  },

  contactTitle: {
    fontSize: 20,
    color: '#13131a',
    fontWeight: 'bold',
    lineHeight: 30,
  },

  contactDescription: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 12,
    marginTop: 12,
    color: '#737380'
  },

  actions: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  },

  action: {
    borderRadius: 8,
    height: 50,
    width: '48%',
    backgroundColor: '#e02041',
    alignItems: 'center',
    justifyContent: 'center'
  },

  actionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  }

})