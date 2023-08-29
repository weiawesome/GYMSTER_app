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
import {CommonActions} from "@react-navigation/native";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Transaction({navigation,route}) {
    const APIUrl='https://e199-140-136-151-161.jp.ngrok.io/';
    const [MyBalance,setMyBalance]=useState(0);
    const [MyCourses,setMyCourses]=useState([]);
    useEffect(()=>{
        console.log(route.params.Member_ID);
        const data={
            'Member_ID':route.params.Member_ID
        }
        fetch(APIUrl+'/Get/MyPlanDatas',{method:'POST',headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },body:JSON.stringify(data)})
            .then((response) => response.json())
            .then(async (responseJson) => {
                console.log('Data Get!');
                console.log('Data:',responseJson);
                console.log('Data Set!');
                setMyBalance(responseJson.Balance);
                setMyCourses(responseJson.Datas);
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('非常抱歉', '出現些許錯誤 請重試!');
            });
    },[])
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
                <Text style={styles.TransBalance}>Your balance is</Text>
                <View style={styles.TransBalanceView}>
                    <Text style={styles.TransBalanceText}>$. {MyBalance}</Text>
                </View>

                <View style={styles.TransLine}></View>
                <Text style={styles.TransTitle}>Transaction record</Text>
                <Text style={styles.TransTitle}>Recent</Text>
                <ScrollView style={[styles.CenterScView]}>
                    {MyCourses.map((item,index)=>{
                        if(item.Course!==null){
                            return(
                                <View style={styles.TransCards} key={index}>
                                    <View style={styles.TransCardsView}>
                                        <Text style={styles.TransText}>{item.Course}</Text>
                                        <Text style={styles.TransText}>-$ {item.Price}</Text>
                                    </View>
                                    <Text style={styles.TransTeacher}>老師 : {item.Teacher}</Text>
                                </View>
                            )
                        }
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
