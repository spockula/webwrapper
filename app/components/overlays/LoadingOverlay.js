import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { styles } from './styles';

export default class LoadingOverlay extends Component {

    constructor(props) {
        super(props);
        this.loadingText = "Did you know: there's no better way to explore the mind than to write";
    }

    render() {
        return (
            <View style={styles.overlay}>
                <Text style={styles.text}>{this.loadingText}</Text>
                <ActivityIndicator
                    animating={this.props.animating}
                    style={styles.activityIndicator}
                    size="large"
                    color='#fff'
                />
            </View>
        );
    }
}