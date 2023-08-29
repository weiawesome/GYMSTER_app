import {
    Alert, FlatList,
    Image,
    ImageBackground, LayoutAnimation, Modal, Platform, Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet, Switch,
    Text,
    TouchableOpacity, TouchableWithoutFeedback,
    UIManager,
    View
} from 'react-native';
import {useEffect, useState} from "react";
import styles from "./Styles";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Branch({navigation,route}) {
    const APIUrl='https://e199-140-136-151-161.jp.ngrok.io/';
    const [BranchDatas,setBranchDatas]=useState([])
    useEffect(()=>{
        fetch(APIUrl + '/Get/BranchDatas', {
            method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('Data Get!');
                console.log('Data:',responseJson);
                console.log('Data Set!');
                setBranchDatas(responseJson['Datas']);
            })
            .catch((error) => {
                console.log(error);
            })
    },[])
    return (
        <SafeAreaView style={[styles.container,{backgroundColor:'#FFFFFF'}]}>
            <View style={styles.UpBar}>
                <TouchableOpacity style={{flex:1,marginLeft:'5%'}} onPress={()=>{navigation.goBack();}}>
                    <Image style={styles.BackImg} source={require('./icon/Back.png')}></Image>
                </TouchableOpacity>
                <Text style={[styles.TopText,{flex:3,textAlign:'center'}]}>Branch</Text>
                <View style={{flex:1,marginRight:'5%'}}></View>
            </View>

            {BranchDatas.map((item,index)=>{
                return(
                    <View key={index} style={styles.BranchView}>
                        <Text style={styles.BranchUpText}>{item.Name}</Text>
                        <Text style={styles.BranchDownText}>{item.Address}</Text>
                        <Text style={[styles.BranchDownText,{marginBottom:'5%'}]}>{item.PhoneNumber}</Text>
                    </View>
                )
            })}
        </SafeAreaView>
    );
}
