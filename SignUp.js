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
import storage from "./storage";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SignUp({navigation,route}) {
    const APIUrl='https://e199-140-136-151-161.jp.ngrok.io/';
    const [Name,setName]=useState('');
    const [PhoneNumber,setPhoneNumber]=useState('');
    const [Email,setEmail]=useState('');
    const [Gender,setGender]=useState(true);
    const [Birthday,setBirthday]=useState('ex : 11/25/2002');
    const [Password,setPassword]=useState('');

    const Convert=(s)=>{
        let tmp=''
        if(s.length>10){
            tmp=String(s.substring(5)).split('/');
        }
        else{
            tmp=String(s).split('/');
        }
        return tmp[2]+'/'+tmp[0]+'/'+tmp[1];
    }

    useEffect(()=>{
        try{
            setBirthday(route.params.Date);
        }
        catch (e) {
            console.log(e);
        }
    },[route.params])

    const Register=()=>{
        if(Name.trim()===''){
            Alert.alert('非常抱歉','名字欄不得為空!');
            return;
        }
        else if(!(PhoneNumber.match(/09\d{8}$/))){
            Alert.alert('非常抱歉','電話號碼格式不符\n提示 : 09加上8位數字!');
            return;
        }
        else if(!(Email.match(/^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/))){
            Alert.alert('非常抱歉','電子信箱格式不符!');
            return;
        }
        else if(Birthday.length>10){
            Alert.alert('非常抱歉','必須選擇生日!');
            return;
        }
        else if(Password.trim()===''){
            Alert.alert('非常抱歉','密碼欄不得為空!');
            return;
        }

        const data={
            'Name':Name,
            'Phone_Number':PhoneNumber,
            'Email':Email,
            'Gender':Gender?'男':'女',
            'Birthday':Birthday,
            'Password':Password,
        };
        console.log('Data Sent!');
        console.log('Data:',data);
        fetch(APIUrl+'/Post/SignUp',{method:'POST',headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },body:JSON.stringify(data)})
            .then((response) => response.json())
            .then(async (responseJson) => {
                console.log('Data Get!');
                console.log('Data:',responseJson);
                console.log('Data Set!');
                if(responseJson.Status){
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
                    Alert.alert('非常抱歉','該組帳密已有人註冊 請重新輸入!')
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('大笨蛋', '出現些許錯誤 請重試!');
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
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1,width:'100%'}}>
                    <ScrollView style={styles.SignUpScView}>
                        <Text style={[styles.LogInTitleText,{marginTop: 0}]}>Sign up</Text>
                        <TextInput style={styles.SignUpInput} autoComplete={'name'} onChangeText={setName} value={Name} placeholder={'Username'}></TextInput>
                        <TextInput style={styles.SignUpInput} autoComplete={'tel'} maxLength={10} keyboardType={'numeric'} onChangeText={setPhoneNumber} value={PhoneNumber} placeholder={'Phone number'}></TextInput>
                        <TextInput style={styles.SignUpInput} autoComplete={'email'} onChangeText={setEmail} value={Email} placeholder={'Email'}></TextInput>
                        <View style={styles.SignUpView}>
                            <Text style={styles.SignUpText}>Gender</Text>
                            <TouchableOpacity style={styles.SignUpbtn} onPress={()=>{setGender(true);}}>
                                <Image style={styles.SignUpImg} source={Gender?require('./icon/SignUpSelect.png'):require('./icon/SignUpUnSelect.png')}></Image>
                            </TouchableOpacity>
                            <Text style={styles.SignUpText}>Male</Text>
                            <TouchableOpacity style={styles.SignUpbtn} onPress={()=>{setGender(false);}}>
                                <Image style={styles.SignUpImg} source={Gender?require('./icon/SignUpUnSelect.png'):require('./icon/SignUpSelect.png')}></Image>
                            </TouchableOpacity>
                            <Text style={styles.SignUpText}>Female</Text>
                        </View>
                        <View style={styles.SignUpView}>
                            <Text style={styles.SignUpText}>Date of birth</Text>
                            <TouchableOpacity style={styles.SignBirthbtn} onPress={()=>{navigation.navigate('Calendar',{Date:Convert(Birthday)})}}>
                                <Text style={[styles.SignUpText,{margin:'2%',marginLeft:'5%'}]}>{Birthday}</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput autoComplete={'password'} style={[styles.SignUpInput,{marginBottom:'35%'}]} onChangeText={setPassword} value={Password} placeholder={'Password'}></TextInput>
                    </ScrollView>
                    <TouchableOpacity style={[styles.LogInSubmitbtn,{marginBottom:'30%'}]} onPress={Register}>
                        <Text style={styles.LogInSubmitText}>Register</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}
