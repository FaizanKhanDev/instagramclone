import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  label: {
    color: '#232b2b',
    fontSize: 22,
    fontWeight: 'bold',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  topContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topComment: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'flex-end',
    width: '100%',
  },
  line: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#3a3a3a',
    marginTop: 10,
  },
  bottom: {
    backgroundColor: '#262626',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginLeft: 10,
  },
  comment: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  images: {
    width: 35,
    height: 35,
    borderRadius: 100,
    marginLeft: 10,
    marginBottom: 10,
  },
  answer: {
    color: '#aeaeae',
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 13,
  },
  input: {
    marginLeft: 15,
    width: '65%',
    color: 'white',
  },
  contentView: {
    flexGrow: 1,
    marginTop: 5,
    marginBottom: 50,
  
  },

  newMessage: {
    backgroundColor: '#FFD700',
    padding: 10,
 

  },
});
