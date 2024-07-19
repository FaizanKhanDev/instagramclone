import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BottomNavigation = forwardRef(({ onOptionSelect }, ref) => {
    const [selectedOption, setSelectedOption] = useState('Public');
    const bottomSheet2 = useRef();

    useImperativeHandle(ref, () => ({
        open: () => bottomSheet2.current.show(),
    }));

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        onOptionSelect(option);
        bottomSheet2.current.close();
    };

    const getOptionStyle = (option) => {
        if (option === selectedOption) {
            return { color: '#cffa41' };
        }
        return { color: 'white' };
    };

    return (
        <BottomSheet
            ref={bottomSheet2}
            hasDraggableIcon
            height={450}
            sheetBackgroundColor="#262626"
        >
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                    Who can see this post?
                </Text>
            </View>
            <View style={styles.line} />

            <View style={{ marginLeft: 15, marginTop: 15 }}>
                <TouchableOpacity
                    style={styles.sheet2}
                    onPress={() => handleOptionSelect('Public')}
                >
                    <FontAwesome
                        name="globe"
                        size={24}
                        style={[{ marginRight: 10 }, getOptionStyle('Public')]}
                    />
                    <Text style={[styles.label, getOptionStyle('Public')]}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sheet2}
                    onPress={() => handleOptionSelect('Friends')}
                >
                    <FontAwesome
                        name="users"
                        size={24}
                        style={[{ marginRight: 10 }, getOptionStyle('Friends')]}
                    />
                    <Text style={[styles.label, getOptionStyle('Friends')]}>Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sheet2}
                    onPress={() => handleOptionSelect('Only Me')}
                >
                    <FontAwesome
                        name="lock"
                        size={24}
                        style={[{ marginRight: 10 }, getOptionStyle('Only Me')]}
                    />
                    <Text style={[styles.label, getOptionStyle('Only Me')]}>Only Me</Text>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
});

const styles = StyleSheet.create({
    line: {
        borderBottomWidth: 0.8,
        borderBottomColor: '#3a3a3a',
        marginTop: 10,
    },
    sheet2: {
        backgroundColor: '#262626',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        paddingLeft: 15,
    },
});

export default BottomNavigation;
