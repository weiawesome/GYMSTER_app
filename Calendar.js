import DatePicker,{ getToday, getFormatedDate } from 'react-native-modern-datepicker';
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

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Calendar({navigation,route}) {
    const Today=route.params.Date;
    const [SelectDay,setSelectDay]=useState(route.params.Date);

    const Convert=(s)=>{
        let tmp=String(s).split('/')
        return tmp[1]+'/'+tmp[2]+'/'+tmp[0];
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
                <View style={[styles.CenterView,{backgoundColor:'#FFFFFF'}]}>
                    <DatePicker
                        mode={'calendar'}
                        selected={Today}
                        current={Today}
                        onDateChange={(day)=>{setSelectDay(day)}}
                        style={{ borderRadius: 10,width:'90%',alignSelf:'center',margin:'10%'}}
                    ></DatePicker>
                    <TouchableOpacity style={styles.LogInSubmitbtn} onPress={()=>{navigation.navigate('SignUp',{'Date':Convert(SelectDay)})}}>
                        <Text style={styles.LogInSubmitText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
