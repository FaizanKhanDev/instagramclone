import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  keyboardView: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '35%',
  },
  logo: {
    height: 40,
    resizeMode: 'contain',
    marginBottom: 50,
  },
  textInput: {
    backgroundColor: '#3a3a3a',
    width: '84%',
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 8,
    paddingRight: 6,
    marginBottom: 20,
  },
  login: {
    borderColor: '#cffa41',
    backgroundColor: '#cffa41',
    width: '84%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
  },
  text: {
    flexDirection: 'row',
  },
  help: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
  },
  seperator: {
    borderBottomColor: '#3a3a3a',
    borderBottomWidth: 0.6,
    width: '37%',
    marginLeft: 5,
    marginRight: 5,
  },
  seperatorStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  facebook: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  faceText: {
    color: '#329CFA',
    paddingLeft: 5,
    fontWeight: 'bold',
  },
  bottom: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  line: {
    borderBottomColor: '#3a3a3a',
    borderBottomWidth: 0.6,
    width: '100%',
    marginTop: 10,
  },
  bottomContainer: {
    justifyContent: 'flex-start',
    height: '15%',
  },
  textcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },

  signUpBottomContainer: {
    marginTop: 10
  },
  signupButton: {
    width: '84%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#cffa41',
    backgroundColor: '#cffa41',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    fontWeight:800
  },
  signupText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
  },
  signUpLogo: {
    width: 200,
    height: 130,
    resizeMode: 'contain',
  },
});
