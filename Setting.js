import {
    Alert, FlatList,
    Image,
    ImageBackground, LayoutAnimation, Modal, Platform, Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet, Switch,
    Text, TextInput,
    TouchableOpacity, TouchableWithoutFeedback,
    UIManager,
    View
} from 'react-native';
import {useEffect, useState} from "react";
import styles from "./Styles";
import {CommonActions} from "@react-navigation/native";
import storage from "./storage";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Setting({navigation,route}) {
    const APIUrl='https://e199-140-136-151-161.jp.ngrok.io/';
    const [Name,setName]=useState('');
    const [PhoneNumber,setPhoneNumber]=useState('');
    const [Email,setEmail]=useState('');
    const [Password,setPassword]=useState('');

    const Save=()=>{
        const data={
            'Member_ID': route.params.Member_ID,
            'Name' : Name,
            'Phone_Number':PhoneNumber,
            'Email':Email,
            'Password':Password
        }
        console.log('Data Sent!');
        console.log('Data:',data);
        fetch(APIUrl+'/Put/EditMyDatas',{method:'POST',headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },body:JSON.stringify(data)})
            .then((response) => response.json())
            .then(async (responseJson) => {
                console.log('Data Get!');
                console.log('Data:',responseJson);
                console.log('Data Set!');
                if(responseJson.Status){
                    Alert.alert('恭喜','個人資料已更新!')
                    fetch(APIUrl+'/Get/SignIn',{method:'POST',headers:{
                            'Accept': 'application/json',
                            'Content-Type':'application/json'
                        },body:JSON.stringify(data)})
                        .then((response) => response.json())
                        .then(async (responseJson) => {
                            console.log('Data Get!');
                            console.log('Data:',responseJson);
                            console.log('Data Set!');
                            await storage.save({
                                key: 'LoginInfo',
                                data: {
                                    Email:Email,
                                    Password:Password
                                },
                                expires: null,
                            });
                            navigation.navigate('Home',responseJson)
                        })
                        .catch((error) => {
                            console.error(error);
                            Alert.alert('非常抱歉', '出現些許錯誤 請重試!');
                        });
                }
                else{
                    Alert.alert('非常抱歉','帳號與密碼已有人使用!');
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('非常抱歉', '出現些許錯誤 請重試!');
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.CenterView,{backgoundColor:'#FFFFFF'}]}>
                <TouchableOpacity onPress={()=>{navigation.goBack();}}>
                    <Text style={styles.SettingCancel}>Cancel</Text>
                </TouchableOpacity>
                <Image style={{margTop:'20%',alignSelf:'center',justifyContent:'center'}} source={route.params.Gender==='男'?require('./icon/boy.png'):require('./icon/girl.png')}></Image>
                <TextInput style={styles.SignUpInput} autoComplete={'name'} onChangeText={setName} value={Name} placeholder={'Username'}></TextInput>
                <TextInput style={styles.SignUpInput} keyboardType={'numeric'} maxLength={10} autoComplete={'tel'} onChangeText={setPhoneNumber} value={PhoneNumber} placeholder={'Phone number'}></TextInput>
                <TextInput style={styles.SignUpInput} autoComplete={'email'} onChangeText={setEmail} value={Email} placeholder={'Email'}></TextInput>
                <TextInput style={styles.SignUpInput} autoComplete={'password'} onChangeText={setPassword} value={Password} placeholder={'Password'}></TextInput>
                <TouchableOpacity style={styles.LogInSubmitbtn} onPress={Save}>
                    <Text style={styles.LogInSubmitText}>Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
