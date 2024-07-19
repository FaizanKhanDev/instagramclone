import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 10,
        backgroundColor: '#212121',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 20,
    },
    backIcon: {
        width: 40,
        height: 20,
        borderRadius: 20,
        marginRight: 10,
    },
    headerText: {
        fontSize: 20,
        color: 'white',
    },
    imageContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: Dimensions.get('window').width,
        height: 400,
    },
    captionContainer: {
        width: '100%',
        backgroundColor: '#212121',
        paddingVertical: 10,
    },
    captionInput: {
        fontSize: 16,
        width: '100%',
        paddingHorizontal: 10,
        color: 'white',
    },
    privacyOptions: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginTop: 25,
        marginLeft: 30,
    },
    chip: {
        backgroundColor: '#333',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    selectedChip: {
        backgroundColor: '#cffa41',
    },
    chipText: {
        color: 'white',
    },
    selectedChipText: {
        color: '#000',
    },
    shareButton: {
        marginTop: 10,
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cffa41',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    shareButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
});

export default styles;
