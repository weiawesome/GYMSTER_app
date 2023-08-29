import {
    Alert, FlatList,
    Image,
    ImageBackground, KeyboardAvoidingView, LayoutAnimation, Modal, Platform, Pressable,
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

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Post({navigation,route}) {
    const APIUrl='https://e199-140-136-151-161.jp.ngrok.io/';
    const [Title,setTitle]=useState('');
    const [Content,setContent]=useState('');

    const Submit=()=>{
        const data={
            'Post_Title':Title,
            'Post_Content':Content,
            'Member_ID':route.params.Member_ID
        }
        fetch(APIUrl+'/Post/PostUpload',{method:'POST',headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },body:JSON.stringify(data)})
            .then((response) => response.json())
            .then(async (responseJson) => {
                console.log('Data Get!');
                console.log('Data:',responseJson);
                console.log('Data Set!');
                if(responseJson.Status){
                    navigation.navigate('Home')
                }
                else{
                    Alert.alert('非常抱歉','出現些許錯誤 請重試!');
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
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1,width:'100%'}}>
                    <ScrollView style={{flex:1,width:'100%'}}>
                        <Image style={{margTop:'20%',alignSelf:'center',justifyContent:'center'}} source={route.params.Gender==='男'?require('./icon/boy.png'):require('./icon/girl.png')}></Image>
                        <TextInput style={styles.SignUpInput} onChangeText={setTitle} value={Title} placeholder={'Title'}></TextInput>
                        <View style={[styles.PostInputView,{marginTop:'10%',marginBottom:'15%'}]}>
                            <TextInput blurOnSubmit={false} multiline={true} style={styles.PostInput} onChangeText={setContent} value={Content} placeholder={'Content......'}></TextInput>
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={[styles.LogInSubmitbtn,{marginBottom:'15%'}]} onPress={Submit}>
                        <Text style={styles.LogInSubmitText}>Submit</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>

        </SafeAreaView>
    );
}
