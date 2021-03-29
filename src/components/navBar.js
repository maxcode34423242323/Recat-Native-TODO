import React from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native';
import { THEME } from '../theme';
import { AppTextBold } from './../appTextBold';

export const Navbar = (props) => {
    return (
        <View style={{...styles.navbar, ...Platform.select({
            ios: styles.navBarIos,
            android: styles.navBarAndroid
        })}}>
            <AppTextBold style={styles.text}>{props.title}</AppTextBold>
            
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    navBarAndroid: {
        backgroundColor: THEME.MAIN_COLOR,
    },
    navBarIos:{
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 1
    },
    text: {
        color: Platform.OS=== 'ios' ? THEME.MAIN_COLOR : '#fff' ,
        fontSize: 20
    }
})