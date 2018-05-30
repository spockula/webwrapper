import React, { Component } from 'react';
import { StyleSheet, Text, View, WebView, NetInfo, Platform } from 'react-native';
import { styles } from './styles';
import {InternetOverlay, LoadingOverlay} from '../../components/overlays';

export default class Webview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadingVIsible: true,
            internet: true            
        }
        this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this);
        this.onLoadWebviewIos = this.onLoadWebviewIos.bind(this);
        this.onLoadWebviewAndroid = this.onLoadWebviewAndroid.bind(this);             
        this.WEBVIEW_REF = 'webview';
        this.src = 'http://www.spockula.wordpress.com/';

        NetInfo.isConnected.fetch().then(isConnected => {
            (isConnected ? this.setState({ internet: true }) : this.setState({ internet: false }))
        });

        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange
        );
    }

    handleFirstConnectivityChange (isConnected) {    
        if(isConnected){
          this.setState({internet : true, isLoadingVIsible: true})
          this.refs[this.WEBVIEW_REF].reload();
        }else{
          this.setState({internet : false});
        }   
      }
      onLoadWebviewIos (navState) {      
        if(Platform.OS === 'ios'){
            this.setState({isLoadingVIsible: false})
        }        
      }
    
      onLoadWebviewAndroid (navState) {
        if(Platform.OS === 'android'){    
            if(navState.loading === false){
            this.setState({isLoadingVIsible: false});
            }           
        }
      }     
      

    render() {        
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    ref={this.WEBVIEW_REF}
                    source={{ uri: this.src }}
                    style={{ flex: 1 }}                    
                    onNavigationStateChange={this.onLoadWebviewAndroid}
                    onLoad={this.onLoadWebviewIos}
                />
                {this.state.isLoadingVIsible ? (
                    
                ) : null}                
                {this.state.internet == false ? (
                    <InternetOverlay />
                ) : null}
            </View>
        );
    }
}