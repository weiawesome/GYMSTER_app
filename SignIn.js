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
import storage from "./storage";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SignIn({navigation,route}) {
    const APIUrl='https://e199-140-136-151-161.jp.ngrok.io/';
    const [Email,setEmail]=useState('');
    const [Password,setPassword]=useState('');
    const LogIn=()=>{
        const data={
            'Email':Email,
            'Password':Password
        }
        fetch(APIUrl+'/Get/SignIn',{method:'POST',headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },body:JSON.stringify(data)})
            .then((response) => response.json())
            .then(async (responseJson) => {
                console.log('Data Get!');
                console.log('Data:',responseJson);
                console.log('Data Set!');
                if(responseJson.Status){
                    await storage.save({
                        key: 'LoginInfo',
                        data: {
                            Email:Email,
                            Password:Password
                        },
                        expires: null,
                    });
                    navigation.navigate('Home',responseJson)
                }
                else{
                    Alert.alert('非常抱歉','帳號或密碼錯誤!');
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('非常抱歉', '出現些許錯誤 請重試!');
            });
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.TopBar}>
                <Text style={styles.TopText}></Text>
            </View>
            <View style={styles.CenterView}>
                <View style={[styles.UpBar,{marginTop:'5%'}]}>
                    <TouchableOpacity style={{flex:1,marginLeft:'5%'}} onPress={()=>{navigation.goBack();}}>
                        <Image style={styles.BackImg} source={require('./icon/Back2.png')}></Image>
                    </TouchableOpacity>
                    <View style={{flex:1}}></View>
                    <Text style={[styles.TopText,{fontSize:25,color:'#000000',flex:3,textAlign:'right',marginRight:'5%'}]}>GYMSTER</Text>
                </View>
                <Text style={styles.LogInTitleText}>Log in</Text>
                <TextInput style={[styles.LogInInput,{marginTop:'10%'}]} autoComplete={'email'} onChangeText={setEmail} value={Email} placeholder={'E-mail'}></TextInput>
                <TextInput style={styles.LogInInput} autoComplete={'password'} onChangeText={setPassword} value={Password} placeholder={'Password'}></TextInput>
                <TouchableOpacity style={styles.LogInSubmitbtn} onPress={LogIn}>
                    <Text style={styles.LogInSubmitText}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.LogInTextView}>
                    <Text style={styles.LogInText}>Didn’t have an account?</Text>
                    <TouchableOpacity style={styles.LogInTextbtn} onPress={()=>{navigation.navigate('SignUp')}}>
                        <Text style={[styles.LogInText,{color:'#EA6537'}]}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
